'use client';

import React, { useEffect, useRef, useState } from 'react';
import AudioVisualizer from './components/AudioVisualizer';
import { useRouter } from 'next/navigation';

import NavBar from './components/NavBar';

export default function HomePage() {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [messages, setMessages] = useState<string[]>([]);
  const distressKeywords = ["help help", "emergency", "ambulance", "danger"];
  const router = useRouter();

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // function speak(text: string) {
  //   const utterance = new SpeechSynthesisUtterance(text);
  //   utterance.lang = "en-US"; // You can also try "en-GB", "fr-FR", etc.
  //   utterance.pitch = 1;
  //   utterance.rate = 1;
  //   speechSynthesis.speak(utterance);
  // }

  function speak(text: string) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; // or your preferred language
    synth.cancel(); // cancel ongoing
    synth.speak(utterance);

  }

  function containsDistressSignal(text: string) {
    const lowerText = text.toLowerCase();
    return distressKeywords.some((kw) => lowerText.includes(kw));
  }

  const startMic = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaStreamRef.current = stream;
    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    source.connect(analyser);
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    audioContextRef.current = audioContext;
    analyserRef.current = analyser;
    dataArrayRef.current = dataArray;

    const animate = () => {
      if (!analyserRef.current || !dataArrayRef.current) return;
      analyserRef.current.getByteFrequencyData(dataArrayRef.current);
      const avg = dataArrayRef.current.reduce((a, b) => a + b, 0) / dataArrayRef.current.length;
      setAudioLevel(avg / 256);
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animate();
  };

  const stopMic = () => {
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    audioContextRef.current?.close();
    mediaStreamRef.current?.getTracks().forEach(track => track.stop());
  };

  const startListening = () => {
    setIsListening(true);
    const recognition = new (window.SpeechRecognition || (window as any).webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => {
      startMic();
    };

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      const lowerText = text.toLowerCase();
 
      if (containsDistressSignal(lowerText)) {
        speak("I detected an emergency. Help is on the way. Stay calm.");
        stopMic();
        setIsListening(false);
        setIsProcessing(false);
        router.push("/Emergency");
        return;
      }
      
      // Navigation commands
      if (lowerText.includes("my appointments") || lowerText.includes("my appointment")) {
        speak("Opening your appointments.");
        stopMic();
        setIsListening(false);
        setIsProcessing(false);
        router.push("/Appointments");
        return;
      }
      
      if (lowerText.includes("my medication") || lowerText.includes("my medicine")) {
        speak("Opening your medications.");
        stopMic();
        setIsListening(false);
        setIsProcessing(false);
        router.push("/Medications");
        return;
      }
      
      if (lowerText.includes("my lab report") || lowerText.includes("my lab reports")) {
        speak("Opening your lab reports.");
        stopMic();
        setIsListening(false);
        setIsProcessing(false);
        router.push("/LabReports");
        return;
      }
      
      if (lowerText.includes("my profile") || lowerText.includes("my data")) {
        speak("Opening your profile.");
        stopMic();
        setIsListening(false);
        setIsProcessing(false);
        router.push("/Profile");
        return;
      }
      


      setMessages(prev => [...prev, `🧑: ${text}`]);
      setIsListening(false);
      setIsProcessing(true);
      stopMic();

      // Simulate processing
      (async () => {
        const reply = await generateResponse(text);
        setMessages(prev => [...prev, `🤖: ${reply}`]);
        speak(reply);
        setIsProcessing(false);
      })();
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {

      console.error('SpeechRecognition error:', event.error);
    
      if (event.error === 'not-allowed') {

        alert('Microphone access was denied. Please allow it in your browser settings.');

      } else if (event.error === 'no-speech') {

        alert('No speech detected. Try again.');

      } else {

        alert(`Speech recognition error: ${event.error}`);

      }
    
      setIsListening(false);

      setIsProcessing(false);

      stopMic();

    };

    recognition.onend = () => {
      if (!isProcessing) {
        setIsListening(false);
        stopMic();
      }
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const generateResponse = async (text: string): Promise<string> => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        console.error("❌ API Error:", data);
        //alert the error to the user
        alert(data.error || "An error occurred while processing your request.");

        return "Sorry, there was an error with the AI response.";
      }
  
      return data.reply || "No reply from the AI.";
    } catch (error) {
      console.error("❌ Fetch Error:", error);
      //alert the error to the user
      alert(error instanceof Error ? error.message : "An unexpected error occurred.");
      return "Something went wrong while contacting the AI.";
    }
  };

  return (
    // let's make a gradient of background color
    <>
      <NavBar />
    
    <main className="min-h-screen bg-gradient-to-br from-purple-800 via-indigo-900 to-blue-900 text-white flex flex-col items-center p-6 justify-center">
      <h1 className="text-3xl font-bold mb-4">🎙️ Talk to CareMate</h1>

      <AudioVisualizer
        audioLevel={audioLevel}
        isListening={isListening}
        isProcessing={isProcessing}
        onClick={startListening}
      />

      <div className="mt-6 w-full max-w-xl text-left space-y-2 flex flex-col">
        {messages.map((msg, idx) => (
          <div
                key={idx}
                className={`text-sm md:text-base max-w-[80%] p-3 rounded-lg shadow-md ${
                  idx % 2 === 0
                    ? 'bg-cyan-600 text-white self-start rounded-bl-none'
                    : 'bg-purple-500 text-white self-end ml-auto rounded-br-none'
                }`}
          >
                {msg}
          </div>
        ))}
      </div>

    </main>
    </>
  );
}

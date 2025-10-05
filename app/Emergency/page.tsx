"use client";
 
import { useEffect, useState } from "react";
 
export default function EmergencyPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [location, setLocation] = useState("Locating...");
 
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            setLocation(data.display_name || "Location found");
          } catch (error) {
            console.error("Reverse geocoding failed:", error);
            setLocation("Unable to retrieve address");
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLocation("Location access denied");
        }
      );
    } else {
      setLocation("Geolocation not supported");
    }
  }, []);
 
  const handleSend = () => {
    if (message.trim() !== "") {
      setMessages((prev) => [...prev, message]);
      setMessage("");
    }
  };
 
  return (
<main className="min-h-screen bg-gradient-to-br from-purple-800 via-indigo-900 to-blue-900 text-white px-4 py-8 flex flex-col items-center justify-center">
<div className="w-full max-w-2xl space-y-6 text-center">
<h1 className="text-4xl md:text-5xl font-bold">🚑 Help is on the Way</h1>
<p className="text-xl md:text-2xl">An ambulance has been dispatched.</p>
<p className="text-lg md:text-xl">
          Estimated Time of Arrival:{" "}
<span className="font-semibold text-cyan-300 animate-pulse">5 minutes</span>
</p>
 
        {/* 📍 Location Info */}
<div className="bg-black/30 p-4 rounded text-left text-sm md:text-base border border-white">
<strong>📍 Your Current Location:</strong><br />
          {location}
</div>
 
        {/* Map Image */}
<div className="w-full h-64 sm:h-80 rounded-lg overflow-hidden shadow-lg border border-white">
<img
            src="/locationMap.jpg"
            alt="Map showing your and ambulance location"
            className="w-full h-full object-cover"
          />
</div>
 
        {/* 📞 Call Button */}
<a
          href="tel:112"
          className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md transition"
>
          📞 Call in Ambulance
</a>
 
        {/* Messaging Section */}
<div className="bg-white text-black p-4 sm:p-6 rounded-lg shadow-md w-full text-left">
<h2 className="text-lg sm:text-xl font-semibold mb-2">Message the Ambulance</h2>
<input
            type="text"
            placeholder="Type a quick message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
<button
            onClick={handleSend}
            className="mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded w-full sm:w-auto"
>
            Send
</button>
 
          {/* Message list */}
<div className="mt-4 space-y-2 max-h-40 overflow-y-auto">
            {messages.map((msg, idx) => (
<div
                key={idx}
                className="bg-gray-200 text-black p-2 rounded max-w-[80%] text-sm"
>
                {msg}
</div>
            ))}
</div>
</div>
</div>
</main>
  );
}
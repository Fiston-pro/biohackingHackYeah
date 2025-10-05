// ✅ AudioVisualizer.tsx (updated with transparent background + black wireframe)
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface AudioVisualizerProps {
  audioLevel: number;
  isListening: boolean;
  isProcessing: boolean;
  onClick: () => void;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  audioLevel,
  isListening,
  isProcessing,
  onClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const frequencyRef = useRef<number>(0);

  // Update the frequency reference whenever audioLevel changes
  useEffect(() => {
    // Smooth the transitions for audioLevel
    const targetValue = isListening ? audioLevel : 0;
    const smoothingFactor = 0.4;
    
    frequencyRef.current = frequencyRef.current + 
      (targetValue - frequencyRef.current) * smoothingFactor;
  }, [audioLevel, isListening]);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = 400;
    const height = 400;

    // Create renderer with alpha transparency
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
    });
    
    // Configure renderer for transparency
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0); // Transparent background
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Append the canvas to our container
    containerRef.current.appendChild(renderer.domElement);
    
    // Ensure canvas is transparent
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.background = 'transparent';
    
    // Create scene
    const scene = new THREE.Scene();
    scene.background = null; // Transparent background
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 14);
    camera.lookAt(0, 0, 0);
    
    // Create a black wireframe sphere
    const geometry = new THREE.IcosahedronGeometry(4, 6);
    const material = new THREE.MeshBasicMaterial({
      color: 0x38bdf8, // cyan-400
      wireframe: true,
      transparent: true,
      opacity: 0.9, // Slightly transparent
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    
    // Add directional light for better visibility
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);
    
    // Animation loop
    const clock = new THREE.Clock();
    let animationId: number;
    
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      // Update rotation speed based on audio level
      const rotationSpeed = 0.002 + frequencyRef.current * 0.01;
      mesh.rotation.x += rotationSpeed;
      mesh.rotation.y += rotationSpeed * 1.3;
      
      // Pulsate mesh scale based on audio level
      const scale = 1 + frequencyRef.current * 0.2;
      mesh.scale.set(scale, scale, scale);
      
      // Camera movement based on audio level
      const cameraMovement = frequencyRef.current * 0.5;
      camera.position.x = Math.sin(clock.getElapsedTime() * 0.5) * cameraMovement;
      camera.position.y = Math.cos(clock.getElapsedTime() * 0.5) * cameraMovement;
      camera.lookAt(scene.position);
      
      // Render the scene
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      className="relative cursor-pointer"
      style={{ 
        width: 400, 
        height: 400,
        position: 'relative',
        backgroundColor: 'transparent',
      }}
    >
      {/* Remove loading ring and just keep the status text */}
      <div className="absolute bottom-5 left-0 right-0 text-center">

        <div className="inline-block bg-indigo-800/60 px-4 py-1 rounded-full text-white text-sm shadow-md backdrop-blur">
          {isListening ? "🎙️ Listening..." : isProcessing ? "🤖 Processing..." : "🎤 Tap to speak"}
        </div>
      </div>
    </div>
  );
};

export default AudioVisualizer;

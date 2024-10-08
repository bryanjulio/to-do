// src/components/HWO.js
import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import HostName from './HostName';
import Stars from './Stars';
import TutorialToast from './TutorialToast'; // Importando o componente TutorialToast

const HWO = () => {
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Defina os caminhos das texturas das estrelas
  const starTextures = [
    '/textures/star1.svg',
    '/textures/star2.svg',
    '/textures/star3.svg',
    '/textures/star4.svg',
  ];

  const tutorialSteps = [
    {
      message: "👋 Welcome to HWO! Let's get started with some basics:",
      image: null,
    },
    {
      message: "🔄 **Rotate:** Click and drag the mouse to rotate the view around the star.",
      image: null,
    },
    {
      message: "🔍 **Zoom:** Use the scroll wheel to zoom in and out.",
      image: null,
    },
    {
      message: "🪐 **Explore:** Click on any exoplanet to learn more.",
      image: null,
    },
    {
      message: "⭐ **Star Textures:** Different textures represent different types of stars.",
      image: null, // Exemplo com star1.svg
    },
    {
      message: "This color indicates a star with moderate temperature.",
      image: starTextures[1],
    },
    {
      message: "This color represents cooler stars compared to yellow.",
      image: starTextures[2],
    },
    {
      message: "This color denotes cooler stars than orange.",
      image: starTextures[3],
    },
    {
      message: "This color signifies very hot stars.",
      image: starTextures[0],
    },
    {
      message: "Explore the star system and discover fascinating exoplanets!",
      image: null,
    },
  ];

  useEffect(() => {
    const hasVisited = localStorage.getItem('hwoVisited');
    if (!hasVisited) {
      setIsTutorialOpen(true);
      
    }
  }, []);

  const handleNext = () => {
    setCurrentStep((prevStep) => {
      const nextStep = prevStep + 1;
      return nextStep;
    });
  };

  const handleClose = () => {
    localStorage.setItem('hwoVisited', 'true');
    setIsTutorialOpen(false);
  };

  return (
    <div className="relative">
      <Canvas
        camera={{ position: [0, 0, 0.001], fov: 60 }}
        style={{ background: 'black', width: '100vw', height: '100vh' }}
      >
        <ambientLight intensity={0.5} />
        <OrbitControls enableZoom={false} />

        <Stars />

        <HostName />
      </Canvas>

      {/* Tutorial Toast */}
      {isTutorialOpen && currentStep < tutorialSteps.length && (
        <TutorialToast
          step={currentStep}
          message={tutorialSteps[currentStep].message}
          image={tutorialSteps[currentStep].image}
          onNext={handleNext}
          onClose={handleClose}
          isLastStep={currentStep === tutorialSteps.length - 1}
        />
      )}

      
    </div>
  );
};

export default HWO;

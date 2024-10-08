// src/components/HWO.js
import React, { useState, useEffect,  } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import HostName from './HostName';
import Stars from './Stars';
import TutorialToast from './TutorialToast'; // Importando o componente TutorialToast
import { useNavigate } from 'react-router-dom';

const HWO = () => {
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate(); 

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

    // Função para lidar com o clique no botão "Início"
    const handleHomeClick = () => {
      navigate('/');  // Supondo que '/' seja a rota inicial
    };
  
    // Função para lidar com o clique no botão "About"
    const handleAboutClick = () => {
      navigate('/about');  // Supondo que '/about' seja a rota para a página "About"
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

   {/* Navigation Buttons */}
   <div className="absolute top-5 right-5 flex space-x-2">
        <button 
          className="bg-blue-700 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md"
          onClick={handleHomeClick}
        >
          Home
        </button>
        <button 
          className="hover:bg-[#333366] hover:rounded-lg bg-[#1a1a40] border border-white  text-white py-2 px-4 rounded-lg shadow-md"
          onClick={handleAboutClick}
        >
          About
        </button>
      </div>
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

// src/components/Modal.js
import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';
import astronautImage from '/sprites/talking/as-talking01.png'; // Certifiqu

const Modal = ({ isOpen, onClose, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 text-white rounded-lg shadow-lg max-w-3xl w-full mx-4 md:flex">
        {/* Imagem do Astronauta */}
        <div className="md:w-1/3 p-4 flex items-center justify-center">
          <img 
            src={astronautImage} 
            alt="Astronaut" 
            className="w-48 h-48 object-contain animate-pulse" 
          />
        </div>
        
        {/* Conteúdo do Modal */}
        <div className="md:w-2/3 p-6">
          {/* Cabeçalho do Modal */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">{title}</h2>
            <button 
              onClick={onClose} 
              className="text-white hover:text-gray-400"
              aria-label="Close Modal"
            >
              <FaTimes size={24} />
            </button>
          </div>
          
          {/* Corpo do Modal com TypeAnimation */}
          <div className="text-lg space-y-4">
            <TypeAnimation
              sequence={[
                "Welcome to the HWO (Hypothetical World Observatory) page! Here's how to navigate:\n",
                1000,
                "1. **Rotate:** Click and drag the mouse to rotate the view around the star.\n",
                1000,
                "2. **Zoom:** Use the scroll wheel to zoom in and out of the scene.\n",
                1000,
                "3. **Explore:** Click on any exoplanet to learn more about it.\n",
                1000,
                "Use the controls to explore the star system and discover fascinating exoplanets.",
                1000,
              ]}
              speed={50} // Velocidade da animação
              wrapper="p" // Tag de envolvimento
              cursor={true} // Mostra o cursor piscando
              repeat={0} // Não repete a animação
              style={{ whiteSpace: 'pre-wrap' }} // Preserva quebras de linha
            />
          </div>
          
          {/* Rodapé do Modal */}
          <div className="mt-6 flex justify-end">
            <button 
              onClick={onClose} 
              className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg transition duration-300"
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

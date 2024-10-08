// src/components/TutorialToast.js
import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { FaTimes } from 'react-icons/fa';

const TutorialToast = ({ step, message, onNext, onClose, isLastStep, image }) => {
  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white rounded-lg shadow-lg p-4 w-[700px] animate-slide-in flex">
      {/* Imagem do Astronauta */}
      <div className="flex-shrink-0 mr-4">
        <img 
          src="/sprites/talking/as-talking01.png" // Atualize o caminho conforme necessário
          alt="Astronaut"
          className="w-24 h-24 object-contain animate-pulse animate-rotate" 
        />
      </div>
      
      {/* Conteúdo do Toast */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Tutorial</h3>
          <button onClick={onClose} className="text-white hover:text-gray-400">
            <FaTimes size={18} />
          </button>
        </div>
        <div className="mb-4 flex">
          {/* Exibir a imagem da textura, se disponível */}
          {image && (
            <img 
              src={image} 
              alt="Star Texture" 
              className="w-16 h-16 object-contain mr-4" 
            />
          )}
          {/* Mensagem do Tutorial */}
          <TypeAnimation
            key={step} // Força a reinicialização da animação com base no passo atual
            sequence={[
              message,
              1000, // Pausa de 1 segundo após a conclusão
            ]}
            speed={50} // Velocidade da animação
            wrapper="div" // Tag de envolvimento
            cursor={true} // Mostra o cursor piscando
            repeat={0} // Não repete a animação
            style={{ whiteSpace: 'pre-wrap' }} // Preserva quebras de linha
          />
        </div>
        <div className="flex justify-end space-x-2">
          {!isLastStep && (
            <button
              onClick={onNext}
              className="bg-blue-600 hover:bg-blue-500 text-white py-1 px-3 rounded-lg transition duration-300"
            >
              Next
            </button>
          )}
          {isLastStep && (
            <button
              onClick={onClose}
              className="bg-green-600 hover:bg-green-500 text-white py-1 px-3 rounded-lg transition duration-300"
            >
              Finish
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorialToast;

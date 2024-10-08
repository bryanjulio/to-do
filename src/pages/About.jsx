// About.jsx
import { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import Scene from "../components/LandingScene";
import groupPhoto from '../assets/photos/photo.jpeg';
import { useNavigate } from 'react-router-dom';

const FocusOnSunWithZoom = () => {
  const { camera } = useThree();
  const targetPosition = { x: 0, y: 20, z: 50 }; // Posição final da câmera
  const speed = 0.05;  // Velocidade da animação

  useFrame(() => {
    camera.position.x += (targetPosition.x - camera.position.x) * speed;
    camera.position.y += (targetPosition.y - camera.position.y) * speed;
    camera.position.z += (targetPosition.z - camera.position.z) * speed;
    camera.lookAt(0, 0, 0); // Mantém a câmera focada no centro
  });

  return null;
};

const About = () => {
  const [startZoom, setStartZoom] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // Controla a etapa atual
  const navigate = useNavigate(); // Hook para navegação

  const accumulatedScrollRef = useRef(0); // Referência para acumular scroll fracionário
  const animationFrameIdRef = useRef(null); // Referência para o ID do requestAnimationFrame

  useEffect(() => {
    setStartZoom(true); // Inicia o zoom automaticamente ao carregar

    // Configurações do scroll automático
    const scrollSpeed = 0.3; // Velocidade do scroll (pixels por frame)

    const scroll = () => {
      const windowHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      const documentHeight = document.body.scrollHeight;

      // Acumula o valor fracionário
      accumulatedScrollRef.current += scrollSpeed;

      // Aplica o scroll se o acumulado for maior ou igual a 1
      if (accumulatedScrollRef.current >= 1) {
        window.scrollBy(0, Math.floor(accumulatedScrollRef.current)); // Scrolla a parte inteira acumulada
        accumulatedScrollRef.current -= Math.floor(accumulatedScrollRef.current); // Remove a parte inteira, mantendo o restante fracionário
      }

      // Verifica se ainda não chegou ao final da página
      if (scrollPosition + windowHeight < documentHeight - 1) {
        animationFrameIdRef.current = requestAnimationFrame(scroll); // Continua o scroll de forma suave
      } else {
        // Espera e verifica se o documentHeight aumentou devido a mudanças de conteúdo
        const checkHeight = () => {
          const newScrollPosition = window.scrollY;
          const newDocumentHeight = document.body.scrollHeight;
          if (newScrollPosition + window.innerHeight < newDocumentHeight - 1) {
            // Se o conteúdo aumentou, continua o scroll
            scroll();
          } else {
            // Continua verificando até que haja mais conteúdo
            animationFrameIdRef.current = requestAnimationFrame(checkHeight);
          }
        };
        animationFrameIdRef.current = requestAnimationFrame(checkHeight);
      }
    };

    // Inicia o scroll usando requestAnimationFrame para suavidade
    animationFrameIdRef.current = requestAnimationFrame(scroll);

    // Limpa o requestAnimationFrame ao desmontar o componente
    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []); // Executa apenas uma vez ao montar o componente

  const handleNextClick = () => {
    setCurrentStep(prevStep => prevStep + 1); // Avança para a próxima etapa
  };

  const handleBackClick = () => {
    setCurrentStep(prevStep => prevStep - 1); // Volta para a etapa anterior
  };

  const handleHomeClick = () => {
    navigate('/'); // Navega para a página inicial
  };

  return (
    <div className="min-h-screen w-screen overflow-y-auto overflow-x-hidden">
      {/* Canvas 3D */}
      <Canvas
        camera={{ position: [0, 50, 150], far: 200000 }}
        className="fixed top-0 left-0 w-full overflow-x-hidden h-full -z-10"
      >
        <color attach='background' args={['black']} />
        <ambientLight intensity={0.25} />

        {/* Animação de zoom automaticamente acionada */}
        {startZoom && <FocusOnSunWithZoom />}

        <Physics gravity={[0, 0, 0]}>
          <Scene />
        </Physics>
      </Canvas>

      {/* Seção de Informações */}
      <div className="bg-gray-800 bg-opacity-80 text-white p-10 rounded-lg overflow-x-hidden max-w-3xl mx-auto mb-[20px] font-sans text-base text-center shadow-lg">
        {currentStep === 1 && (
          <>
            <h2 className="mb-5 text-2xl">Zathura Team - NASA Hackathon 2024</h2>
            <p className="mb-4">
              We are the Zathura team, and we are participating in the <strong>2024 NASA Space Apps Challenge</strong>. Our theme is the <em>Navigator for the Habitable Worlds Observatory (HWO)</em>, which aims to map the characterizable exoplanets in our galaxy.
            </p>
            <p className="mb-4">
              The <strong>Habitable Worlds Observatory (HWO)</strong> is a future space observatory that NASA is developing with the goal of directly observing exoplanets in habitable zones around nearby stars. It will be a large telescope capable of expanding our knowledge of Earth-like planets by capturing direct images of exoplanets, something that has never been done on a large scale.
            </p>
            <p className="mb-4">
              Our challenge is to develop a 3D interactive application that allows users to visualize the observational paths to known exoplanets, highlighting those with potential to be characterized by the HWO. The goal is to identify the most promising exoplanets that could be studied in future missions, considering parameters such as the distance to planetary systems and the size of the telescope.
            </p>
            <p className="mb-4">
              The HWO mission is part of a continuous effort to expand our understanding of the universe and explore the mysteries of exoplanets, with a particular focus on finding and studying potentially habitable worlds. With our application, we hope to provide a tool that helps scientists and engineers better understand the impact of different telescope parameters and potentially optimize future missions.
            </p>
            <div className="flex justify-center gap-2 mt-5">
              <button 
                onClick={handleNextClick} 
                className="mt-2 px-6 py-3 bg-blue-500 text-white border-none rounded cursor-pointer text-base transition-colors duration-300 hover:bg-blue-700"
              >
                Next
              </button>
            </div>
          </>
        )}

        {currentStep === 2 && (
          <>
            <h2 className="mb-5 text-2xl">Adopted Methodology</h2>
            <p className="mb-4">
              Our team adopted an agile methodology, using short sprints and focusing on rapid prototyping to ensure efficient and collaborative development. After each sprint, we reviewed the features and adjusted based on the feedback from members and the project goals.
            </p>
            <p className="mb-4">
              We used <strong>Vite</strong> with <strong>React</strong> for the front-end, and <strong>Python</strong> for processing data from the NASA Exoplanet Archive. For audio generation, we used <strong>ElevenLabs</strong>, and some images were created with <strong>MidJourney</strong>.
            </p>
            <p className="mb-4">
              <strong>ChatGPT</strong> was used to assist with coding and technical decisions throughout the project. Additionally, we used a <strong>whiteboard</strong> for brainstorming and discussions.
            </p>
            <p className="mb-4">
              Tools like <strong>GitHub</strong> for version control, <strong>Trello</strong> for task management, and <strong>Slack</strong> for internal communication were essential to keeping everyone aligned with the project's objectives.
            </p>
            <div className="flex justify-center gap-2 mt-5">
              <button 
                onClick={handleBackClick} 
                className="mt-2 px-6 py-3 bg-blue-500 text-white border-none rounded cursor-pointer text-base transition-colors duration-300 hover:bg-blue-700"
              >
                Back
              </button>
              <button 
                onClick={handleNextClick} 
                className="mt-2 px-6 py-3 bg-blue-500 text-white border-none rounded cursor-pointer text-base transition-colors duration-300 hover:bg-blue-700"
              >
                Next
              </button>
            </div>
          </>
        )}

        {currentStep === 3 && (
          <>
            <h2 className="mb-5 text-2xl">Our Group</h2>
            <p className="mb-4">
              We are from <strong>Rio Claro, São Paulo</strong>, and we are friends with a shared background in technology. Our team name, <strong>Zathura</strong>, was inspired by the 2005 movie <em>Zathura: A Space Adventure</em>. In honor of the astronaut character from the movie, we named our project astronaut <strong>Wallter</strong>.
            </p>
            <p className="mb-4">
              Our project combines our passion for technology and space exploration, and we look forward to contributing to the NASA Space Apps Challenge with this interactive and innovative solution.
            </p>
            <p className="mb-4"><strong>Members:</strong></p>
            <ul className="text-left mx-auto mb-4 pl-5 list-disc max-w-md">
              <li>Bryan Julio</li>
              <li>Diogo Pereira</li>
              <li>Erick Gomes</li>
              <li>Lucas Ferreira</li>
              <li>Pedro Dias</li>
            </ul>

            <img src={groupPhoto} alt="Group Photo" className="mt-5 max-w-full h-auto rounded-lg shadow-lg" />
            <div className="flex justify-center gap-2 mt-5">
              <button 
                onClick={handleBackClick} 
                className="mt-2 px-6 py-3 bg-blue-500 text-white border-none rounded cursor-pointer text-base transition-colors duration-300 hover:bg-blue-700"
              >
                Back
              </button>
              <button 
                onClick={handleHomeClick} 
                className="mt-2 px-6 py-3 bg-blue-500 text-white border-none rounded cursor-pointer text-base transition-colors duration-300 hover:bg-blue-700"
              >
                Home
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default About;

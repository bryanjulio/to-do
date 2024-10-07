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
  const scrollContainerRef = useRef(null); // Referência ao contêiner de rolagem

  useEffect(() => {
    setStartZoom(true); // Aciona o zoom automaticamente ao carregar

    const scrollContainer = scrollContainerRef.current;
    let scrollSpeed = 1; // Pixels por frame
    let animationFrameId;

    const scrollStep = () => {
      if (scrollContainer) {
        // Verifica se chegou ao final da rolagem
        if (scrollContainer.scrollTop + scrollContainer.clientHeight < scrollContainer.scrollHeight) {
          scrollContainer.scrollTop += scrollSpeed;
          animationFrameId = requestAnimationFrame(scrollStep);
        } else {
          cancelAnimationFrame(animationFrameId); // Para a animação se chegar ao final
        }
      }
    };

    animationFrameId = requestAnimationFrame(scrollStep);

    // Limpa a animação ao desmontar o componente
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleNextClick = () => {
    setCurrentStep(prevStep => prevStep + 1); // Avança para a próxima etapa
  };

  const handleBackClick = () => {
    setCurrentStep(prevStep => prevStep - 1); // Volta para a etapa anterior
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div
     
      className="min-h-screen w-screen overflow-y-auto overflow-x-hidden"
    >
      <Canvas
        camera={{ position: [0, 50, 150], far: 200000 }}
        className="fixed top-0 left-0 w-full overflow-x-hidden h-full -z-10"
      >
        <color attach='background' args={['black']} />
        <ambientLight intensity={0.25} />

        {/* Animação de zoom acionada automaticamente */}
        {startZoom && <FocusOnSunWithZoom />}

        <Physics gravity={[0, 0, 0]}>
          <Scene />
        </Physics>
      </Canvas>

      {/* Seção de Informação */}
      <div  ref={scrollContainerRef} className="bg-gray-800 bg-opacity-80 text-white p-10 rounded-lg overflow-x-hidden max-w-3xl mx-auto mb-[20px] font-sans text-base text-center shadow-lg">
        {currentStep === 1 && (
          <>
            <h2 className="mb-5 text-2xl">Zathura Team - NASA Hackathon 2024</h2>
            <p className="mb-4">
              Nós somos a equipe Zathura e estamos participando do <strong>Desafio Space Apps da NASA 2024</strong>. Nosso tema é o <em>Navigator for the Habitable Worlds Observatory (HWO)</em>, que visa mapear os exoplanetas caracterizáveis em nossa galáxia.
            </p>
            <p className="mb-4">
              O <strong>Habitable Worlds Observatory (HWO)</strong> é um futuro observatório espacial que a NASA está desenvolvendo com o objetivo de observar diretamente exoplanetas em zonas habitáveis ao redor de estrelas próximas. Será um grande telescópio capaz de expandir nosso conhecimento sobre planetas semelhantes à Terra ao capturar imagens diretas de exoplanetas, algo que nunca foi feito em grande escala.
            </p>
            <p className="mb-4">
              Nosso desafio é desenvolver uma aplicação 3D interativa que permita aos usuários visualizar os caminhos observacionais para exoplanetas conhecidos, destacando aqueles com potencial para serem caracterizados pelo HWO. O objetivo é identificar os exoplanetas mais promissores que poderiam ser estudados em futuras missões, considerando parâmetros como a distância para sistemas planetários e o tamanho do telescópio.
            </p>
            <p className="mb-4">
              A missão HWO faz parte de um esforço contínuo para expandir nossa compreensão do universo e explorar os mistérios dos exoplanetas, com foco particular na descoberta e estudo de mundos potencialmente habitáveis. Com nossa aplicação, esperamos fornecer uma ferramenta que ajude cientistas e engenheiros a entender melhor o impacto de diferentes parâmetros de telescópio e potencialmente otimizar futuras missões.
            </p>
            <div className="flex justify-center gap-2 mt-5">
              <button
                onClick={handleNextClick}
                className="mt-2 px-6 py-3 bg-blue-500 text-white border-none rounded cursor-pointer text-base transition-colors duration-300 hover:bg-blue-700"
              >
                Próximo
              </button>
            </div>
          </>
        )}

        {currentStep === 2 && (
          <>
            <h2 className="mb-5 text-2xl">Metodologia Adotada</h2>
            <p className="mb-4">
              Nossa equipe adotou uma metodologia ágil, utilizando sprints curtos e focando em prototipagem rápida para garantir um desenvolvimento eficiente e colaborativo. Após cada sprint, revisamos as funcionalidades e ajustamos com base no feedback dos membros e nas metas do projeto.
            </p>
            <p className="mb-4">
              Utilizamos <strong>Vite</strong> com <strong>React</strong> para o front-end, e <strong>Python</strong> para processar dados do NASA Exoplanet Archive. Para geração de áudio, usamos <strong>ElevenLabs</strong>, e algumas imagens foram criadas com <strong>MidJourney</strong>.
            </p>
            <p className="mb-4">
              O <strong>ChatGPT</strong> foi utilizado para auxiliar com a codificação e decisões técnicas ao longo do projeto. Além disso, usamos um <strong>quadro branco</strong> para brainstorming e discussões.
            </p>
            <p className="mb-4">
              Ferramentas como <strong>GitHub</strong> para controle de versão, <strong>Trello</strong> para gerenciamento de tarefas e <strong>Slack</strong> para comunicação interna foram essenciais para manter todos alinhados com os objetivos do projeto.
            </p>
            <div className="flex justify-center gap-2 mt-5">
              <button
                onClick={handleBackClick}
                className="mt-2 px-6 py-3 bg-blue-500 text-white border-none rounded cursor-pointer text-base transition-colors duration-300 hover:bg-blue-700"
              >
                Voltar
              </button>
              <button
                onClick={handleNextClick}
                className="mt-2 px-6 py-3 bg-blue-500 text-white border-none rounded cursor-pointer text-base transition-colors duration-300 hover:bg-blue-700"
              >
                Próximo
              </button>
            </div>
          </>
        )}

        {currentStep === 3 && (
          <>
            <h2 className="mb-5 text-2xl">Nosso Grupo</h2>
            <p className="mb-4">
              Somos de <strong>Rio Claro, São Paulo</strong>, e somos amigos com um histórico compartilhado em tecnologia. Nosso nome de equipe, <strong>Zathura</strong>, foi inspirado no filme de 2005 <em>Zathura: A Space Adventure</em>. Em homenagem ao personagem astronauta do filme, nomeamos nosso projeto como astronauta <strong>Wallter</strong>.
            </p>
            <p className="mb-4">
              Nosso projeto combina nossa paixão por tecnologia e exploração espacial, e estamos ansiosos para contribuir para o Desafio Space Apps da NASA com esta solução interativa e inovadora.
            </p>
            <p className="mb-4"><strong>Membros:</strong></p>
            <ul className="text-left mx-auto mb-4 pl-5 list-disc max-w-md">
              <li>Bryan Julio</li>
              <li>Diogo Pereira</li>
              <li>Erick Gomes</li>
              <li>Lucas Ferreira</li>
              <li>Pedro Dias</li>
            </ul>

            <img src={groupPhoto} alt="Foto do Grupo" className="mt-5 max-w-full h-auto rounded-lg shadow-lg" />
            <div className="flex justify-center gap-2 mt-5">
              <button
                onClick={handleBackClick}
                className="mt-2 px-6 py-3 bg-blue-500 text-white border-none rounded cursor-pointer text-base transition-colors duration-300 hover:bg-blue-700"
              >
                Voltar
              </button>
              <button
                onClick={handleHomeClick}
                className="mt-2 px-6 py-3 bg-blue-500 text-white border-none rounded cursor-pointer text-base transition-colors duration-300 hover:bg-blue-700"
              >
                Início
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default About;

import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Physics } from "@react-three/rapier";
import Scene from "../components/Scene";

import "../assets/styles/Home.css";
import { Link } from "react-router-dom";
import AnimatedSpriteTalking from "../components/AnimatedSpriteTalking";
import { TypeAnimation } from "react-type-animation";
import HWO from "../components/HWO";

const FocusOnSunWithZoom = () => {
  const { camera } = useThree();
  const targetPosition = { x: 0, y: 20, z: 50 }; // Posição final da câmera (zoom próximo do Sol)
  const speed = 0.05; // Velocidade da animação (quanto menor, mais suave)

  useFrame(() => {
    camera.position.x += (targetPosition.x - camera.position.x) * speed;
    camera.position.y += (targetPosition.y - camera.position.y) * speed;
    camera.position.z += (targetPosition.z - camera.position.z) * speed;

    // Mantém a câmera olhando para o Sol (centro da cena)
    camera.lookAt(0, 0, 0);
  });

  return null;
};

const Home = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [showInfoCard, setShowInfoCard] = useState(false);
  const [canControlView, setCanControlView] = useState(false);
  const [startZoom, setStartZoom] = useState(false); // Controla quando iniciar o zoom
  const [overlayActive, setOverlayActive] = useState(true); // Controla a exibição do overlay
  const [fadeOut, setFadeOut] = useState(false); // Controla a transição de fade-out
  const [cardStep, setCardStep] = useState(-1); // Inicializa como -1 indicando que ainda não começou
  const [astronautReaction, setAstronautReaction] = useState("normal"); // Controla a reação do astronauta
  const [astronautVisible, setAstronautVisible] = useState(true); // Controla a visibilidade do astronauta

  // Ref para gerenciar o áudio atual
  const audioRef = useRef(null);

  // Mapeamento das etapas para os arquivos de áudio
  const audioMap = {
    0: "/audios/intro.mp3",
    1: "/audios/audio1.mp3",
    2: "/audios/audio2.mp3",
    3: "/audios/audio3.mp3",
  };

  // Função para tocar o áudio correspondente à etapa atual
  const playAudio = (step) => {
    console.log(`Reproduzindo áudio para o passo: ${step}`); // Log de depuração
    // Parar o áudio atual, se existir
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // Determinar o arquivo de áudio a ser tocado
    const audioSrc = audioMap[step];
    console.log(`Arquivo de áudio selecionado: ${audioSrc}`); // Log de depuração

    if (audioSrc) {
      const audio = new Audio(audioSrc);
      audioRef.current = audio;
      audio.play().catch((error) => {
        console.error(`Erro ao reproduzir o áudio: ${error}`);
      });
    } else {
      console.warn(`Nenhum áudio encontrado para o passo: ${step}`);
    }
  };

  // Efeito para tocar o áudio correspondente quando a etapa muda
  useEffect(() => {
    if (hasStarted && showInfoCard && cardStep >= 0) {
      playAudio(cardStep);
    }

    // Limpar o áudio quando a etapa muda ou o componente desmonta
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [cardStep, hasStarted, showInfoCard]);

  const startAction = () => {
    console.log("Tecla pressionada ou clique detectado");
    setHasStarted(true);
    setShowInfoCard(true);
    setCardStep(0); // Define para 0 para tocar 'intro'
    setFadeOut(true); // Inicia o fade-out do overlay

    // Parar o áudio atual, se estiver tocando
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    // Espera a transição terminar (4 segundos) para remover o overlay
    setTimeout(() => {
      setOverlayActive(false); // Remove o overlay após o fade-out completo
    }, 4000); // Tempo da transição de clareamento suave (ajustado para 4 segundos)
  };

  useEffect(() => {
    if (!hasStarted) {
      window.addEventListener("keydown", startAction);
      window.addEventListener("click", startAction); // Adiciona suporte para cliques do mouse
    }

    return () => {
      window.removeEventListener("keydown", startAction);
      window.removeEventListener("click", startAction); // Remove o evento de clique quando não necessário
    };
  }, [hasStarted]);

  // Função para lidar com o clique no botão Next e mudar o conteúdo do card
  const handleNextClick = () => {
    setCardStep((prevStep) => {
      const nextStep = prevStep + 1;
      console.log(`Avançando para o passo: ${nextStep}`); // Log de depuração

      if (nextStep === 1) {
        setAstronautReaction("pointing");
      } else if (nextStep === 2) {
        setAstronautReaction("thumbsUp");
      } else if (nextStep === 3) {
        // Implementa o fade-out do astronauta
        setAstronautVisible(false); // Inicia o fade-out do astronauta
        setTimeout(() => {
          setShowInfoCard(false); // Após o fade-out, esconde o card
          setStartZoom(true); // Ativa o zoom
          setTimeout(() => {
            setCanControlView(true); // Habilita o controle da câmera depois do zoom
          }, 3000); // Tempo para a animação de zoom
        }, 1000); // Tempo para a animação de fade-out do astronauta
      }

      return nextStep;
    });
  };

  return (
    <div className="app-container">
      <Link to="/about" className="about-btn">
        About
      </Link>
      <Canvas camera={{ position: [0, 50, 150], far: 200000 }}>
        <color attach="background" args={["black"]} />
        <ambientLight intensity={0.25} />

        {/* Animação de zoom, quando o usuário clica em "Next" */}
        {startZoom && <FocusOnSunWithZoom />}

        {/* OrbitControls são ativados apenas quando canControlView é true */}
        {canControlView && (
          <OrbitControls maxDistance={450} minDistance={10} makeDefault />
        )}

        <Physics gravity={[0, 0, 0]}>
          <Scene />
        </Physics>

        <EffectComposer>
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
        </EffectComposer>
      </Canvas>

      {overlayActive && (
        <div className={`overlay ${fadeOut ? "fade-out" : ""}`} />
      )}

      {!hasStarted && (
        <TypeAnimation
          className="start-text"
          key={"intro"} // Usar uma key estática para intro
          sequence={[
            "Press any key or click to start", // Texto a ser escrito
            1000, // Pausa de 1 segundo
          ]}
          speed={75}
          wrapper="span"
          cursor={true} // Mostra o cursor piscando
          repeat={0} // Não repete a animação
        />
      )}

      {showInfoCard && (
        <div className="info-card">
          {/* O conteúdo do card muda de acordo com o cardStep */}
          {cardStep === 0 && (
            <TypeAnimation
              key={cardStep}
              sequence={[
                "Hi there! I’m Walter, your guide on this space adventure. Today, we’re going to explore distant planets and discover new worlds through the HWO, NASA’s newest telescope. It’s designed to find Earth-like planets around nearby stars and search for signs of life. Ready to dive in?",
                1000,
              ]}
              speed={75}
              wrapper="span"
              cursor={true}
              repeat={0}
            />
          )}
          {cardStep === 1 && (
            <TypeAnimation
              key={cardStep}
              sequence={[
                "The HWO is positioned at Lagrange Point 2 (L2), 1.5 million km from Earth, where it has a perfect view of deep space.",
                1000,
              ]}
              speed={75}
              wrapper="span"
              cursor={true}
              repeat={0}
            />
          )}
          {cardStep === 2 && (
            <TypeAnimation
              key={cardStep}
              sequence={[
                "In this app, you’ll explore exoplanets through HWO’s eyes, learning about planets that might support life. Join me on a guided tour or explore freely!",
                1000,
              ]}
              speed={75}
              wrapper="span"
              cursor={true}
              repeat={0}
            />
          )}
          {cardStep === 3 && (
            <TypeAnimation
              key={cardStep}
              sequence={[
                "All steps are completed.",
                1000,
              ]}
              speed={75}
              wrapper="span"
              cursor={false}
              repeat={0}
            />
          )}
          {cardStep < 3 && (
            <button className="fixed-btn" onClick={handleNextClick}>
              Next
            </button>
          )}
        </div>
      )}

      {/* Exibe a animação do astronauta */}
      {showInfoCard && (
        <AnimatedSpriteTalking
          reacao={astronautReaction}
          visible={astronautVisible}
        />
      )}

      {canControlView && (
        <div className="controls">
          <Link className="btn">Guided Tour</Link>
          <Link to="/hwo" className="btn">
            Free Navigation
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;

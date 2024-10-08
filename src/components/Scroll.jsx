import { useEffect } from 'react';

const ScrollTest = () => {
  useEffect(() => {
    const scrollSpeed = 2; // Pixels por incremento

    console.log('Iniciando scroll automático'); // Log para início do efeito

    const scroll = () => {
      const windowHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      const documentHeight = document.body.scrollHeight;

      console.log(`Altura da janela: ${windowHeight}, Posição atual do scroll: ${scrollPosition}, Altura do documento: ${documentHeight}`);

      // Faz o scroll para baixo
      window.scrollBy(0, scrollSpeed);

      // Verifica se chegou ao final da página com tolerância
      if (scrollPosition + windowHeight < documentHeight - 1) {
        requestAnimationFrame(scroll); // Continua o scroll de forma suave
      } else {
        console.log('Final da página atingido, parando scroll'); // Log quando o final da página for atingido
      }
    };

    // Começa o scroll usando requestAnimationFrame para suavidade
    requestAnimationFrame(scroll);
  }, []);

  return (
    <div>
      {/* Aumenta a altura da página para garantir que haja espaço para scrollar */}
      <div style={{ height: '500vh', background: 'linear-gradient(white, lightblue)' }}>
        <h1 style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          Teste de Scroll Automático
        </h1>
      </div>
    </div>
  );
};

export default ScrollTest;

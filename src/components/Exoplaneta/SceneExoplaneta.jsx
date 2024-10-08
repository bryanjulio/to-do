// AppExoplanet.js
import { useParams, useNavigate } from 'react-router-dom';  // Importando useNavigate
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Exoplanet from './Exoplanet';
import Stars from '../Stars';
import exoplanetData from '@/data/dados_exoplanetas.json'; 
import { calculateRadius } from '../../utils/planetCalculations';

/**
 * Component that displays detailed information about the exoplanet.
 */
const ExoplanetInfo = ({ exoplanet }) => {
  return (
    <div className='bg-gradient-to-b from-blue-900 via-black to-black text-white p-6 rounded-xl shadow-lg max-w-md'>
      <h3 className="text-2xl font-semibold mb-4">Exoplanet Details</h3>
      <div className="space-y-4">
        <h2 className="text-3xl font-bold mb-4">{exoplanet.pl_name}</h2> 

        {/* Minimum Mass */}
        <div className="flex items-center mb-4 text-sm">
          <span className="mr-2">🌍</span>
          <strong>Minimum Mass:</strong> {exoplanet.pl_bmasse ? `${exoplanet.pl_bmasse} Earth masses` : 'Unknown'}
        </div>

        {/* Orbital Distance */}
        <div className="flex items-center mb-4 text-sm">
          <span className="mr-2">🌀</span>
          <strong>Orbital Distance:</strong> {exoplanet.pl_orbsmax ? `${exoplanet.pl_orbsmax} AU` : 'Unknown'} 
          <span className="ml-2">(Distance from the host star)</span>
        </div>

        {/* Equilibrium Temperature */}
        <div className="flex items-center mb-4 text-sm">
          <span className="mr-2">🔥</span>
          <strong>Equilibrium Temperature:</strong> {exoplanet.pl_eqt ? `${exoplanet.pl_eqt} K (~${(exoplanet.pl_eqt - 273.15).toFixed(2)} °C)` : 'Unknown'}
        </div>

        {/* Host Star */}
        <div className="flex items-center mb-4 text-sm">
          <span className="mr-2">⭐</span>
          <strong>Host Star:</strong> {exoplanet.hostname} 
          <span className="ml-2">({exoplanet.st_spectype || 'Unknown'}, an M-dwarf)</span>
        </div>

        {/* Distance to Earth */}
        <div className="flex items-center mb-4 text-sm">
          <span className="mr-2">🌌</span>
          <strong>Distance from Earth:</strong> {exoplanet.sy_dist ? `${exoplanet.sy_dist.toFixed(2)} parsecs (~${(exoplanet.sy_dist * 3.26).toFixed(2)} light-years)` : 'Unknown'}
        </div>

        {/* Star Radius */}
        <div className="flex items-center mb-4 text-sm">
          <span className="mr-2">🌞</span>
          <strong>Star Radius:</strong> {exoplanet.st_rad ? `${exoplanet.st_rad} Solar radii` : 'Unknown'}
        </div>

        {/* Star Luminosity */}
        <div className="flex items-center mb-4 text-sm">
          <span className="mr-2">💡</span>
          <strong>Star Luminosity:</strong> {exoplanet.st_lum ? `Log(Lum) = ${exoplanet.st_lum}` : 'Unknown'}
        </div>

        {/* Metallicity */}
        <div className="flex items-center mb-4 text-sm">
          <span className="mr-2">🧬</span>
          <strong>Star Metallicity:</strong> {exoplanet.st_met ? `${exoplanet.st_met}` : 'Unknown'}
        </div>

        {/* Habitability Zone */}
        <div className="flex items-center mb-4 text-sm">
          <span className="mr-2">🧬</span>
          <strong>In Habitable Zone:</strong> {exoplanet.inZh === 1 ? 'Yes' : 'No'}
        </div>

        <p className="text-xs italic mt-2">
          Note: The color of the exoplanet is illustrative and not representative of its actual appearance.
        </p>
      </div>
    </div>
  );
};

/**
 * Main component that renders the exoplanet and its information.
 */
function AppExoplanet() {
  const { id } = useParams();
  const navigate = useNavigate();  // Hook to navigate to specific path

  // Função para lidar com o clique no botão "Back"
  const handleBackClick = (name) => {
    navigate(`/hwo/${encodeURIComponent(name)}`);
  };

  // Função para lidar com o clique no botão "Início"
  const handleHomeClick = () => {
    navigate('/');  // Supondo que '/' seja a rota inicial
  };

  // Função para lidar com o clique no botão "About"
  const handleAboutClick = () => {
    navigate('/about');  // Supondo que '/about' seja a rota para a página "About"
  };

  // Find the exoplanet by its ID
  const exoplanet = exoplanetData.find((planet) => planet.id === Number(id));

  // Render error message if the exoplanet is not found
  if (!exoplanet) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center text-red-500 mt-10 leading-relaxed">
          Exoplanet not found.
        </div>
      </div>
    );
  }
  
  return (
    <div className="relative h-screen bg-black">
      {/* 3D Canvas to render the exoplanet */}
      <Canvas className="h-full w-full">
        <ambientLight intensity={0.6} />
        <spotLight position={[15, 20, 10]} angle={0.3} penumbra={1} intensity={0.8} />
        <Exoplanet data={exoplanet} />
        <Stars radius={100} depth={50} count={1000} factor={7} saturation={0.5} fade />
        <OrbitControls enableZoom={true} />
      </Canvas>

      {/* Exoplanet information */}
      <div className="absolute top-5 left-5">
        <ExoplanetInfo exoplanet={exoplanet} />
      </div>

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

      {/* Comparison with Earth */}
      <div className="absolute bottom-5 right-5 p-4 bg-gray-800 text-white rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-2">Comparison with Earth</h3>

       

        {/* Mass */}
        <div className="flex items-center space-x-2 mb-2">
          <span>🌍</span>
          <span>Mass:</span>
          <div className="w-32 bg-gray-600 rounded-full h-2">
            {/* Limit the width of the bar to a maximum of 100% */}
            <div className="bg-green-400 h-2 rounded-full" 
                 style={{ width: `${Math.min(exoplanet.pl_bmasse || 0, 100)}%` }}>
            </div>
          </div>
          {exoplanet.pl_bmasse > 100 && <span>(Exceeds Earth's mass)</span>}
        </div>

        {/* Radius */}
        <div className="flex items-center space-x-2 mb-2">
          <span>🌀</span>
          <span>Radius:</span>
          <div className="w-32 bg-gray-600 rounded-full h-2">
            {/* Limit the width of the bar to a maximum of 100% */}
            <div className="bg-blue-400 h-2 rounded-full" 
                 style={{ width: `${Math.min(calculateRadius(exoplanet.pl_bmasse) || 0, 100)}%` }}>
            </div>
          </div>
          {calculateRadius(exoplanet.pl_bmasse) > 100 && <span>(Exceeds Earth's radius)</span>}
        </div>
      </div>
      

      {/* Back button */}
      <div className="absolute bottom-5 left-5">
        <button 
          className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg"
          onClick={() => handleBackClick(exoplanet.hostname)}  // Navigate to the specific path
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default AppExoplanet;

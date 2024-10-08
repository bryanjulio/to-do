// ExoPlanet.js
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import starsData from '../data/dados_exoplanetas.json';
import { 
  FaTemperatureHigh, 
  FaWeightHanging, 
  FaRulerHorizontal, 
  FaMicroscope, 
  FaMapMarkerAlt, 
  FaStar, 
  FaArrowLeft 
} from 'react-icons/fa';

/**
 * Component that displays details of a star and its associated exoplanets.
 */
const ExoPlanet = () => {
  const { name } = useParams();
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Filter all entries that match the hostname
  const starEntries = starsData.filter(star => star.hostname === name);

  if (starEntries.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-red-500">
        <p>Star not found.</p>
      </div>
    );
  }

  // Get the star data (assuming they are identical across entries)
  const starData = starEntries[0];

  // Extract associated exoplanets
  const planets = starEntries.map(entry => ({
    id: entry.id, // Using 'id' as the unique identifier for the exoplanet
    name: entry.pl_name,
    mass: entry.pl_bmasse || 'Unknown', // Mass in Earth masses
    radius: entry.pl_rade || 'Unknown', // Radius in Earth radii
    orbitalPeriod: entry.pl_orbper || 'Unknown', // Orbital period in days
  }));

  // Function to handle "Back" button click
  const handleBack = () => {
    navigate('/hwo');
  };

  return (
    <div className="min-h-screen  text-white p-24">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Star Details: {name}</h1>
        {/* Back Button */}
        <button 
          className="flex items-center bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition duration-300"
          onClick={handleBack}
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>
      </header>

      {/* Star Details Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Star Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Effective Temperature */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md flex items-center">
            <FaTemperatureHigh className="text-blue-500 text-3xl mr-4" />
            <div>
              <h3 className="text-lg font-bold">Effective Temperature</h3>
              <p>{starData.st_teff ? `${starData.st_teff} K` : 'Unknown'}</p>
            </div>
          </div>

          {/* Mass */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md flex items-center">
            <FaWeightHanging className="text-green-500 text-3xl mr-4" />
            <div>
              <h3 className="text-lg font-bold">Mass</h3>
              <p>{starData.st_mass ? `${starData.st_mass} Solar Masses` : 'Unknown'}</p>
            </div>
          </div>

          {/* Radius */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md flex items-center">
            <FaRulerHorizontal className="text-yellow-500 text-3xl mr-4" />
            <div>
              <h3 className="text-lg font-bold">Radius</h3>
              <p>{starData.st_rad ? `${starData.st_rad} Solar Radii` : 'Unknown'}</p>
            </div>
          </div>

          {/* Metallicity */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md flex items-center">
            <FaMicroscope className="text-purple-500 text-3xl mr-4" />
            <div>
              <h3 className="text-lg font-bold">Metallicity</h3>
              <p>{starData.st_met !== null ? starData.st_met : 'Unknown'}</p>
            </div>
          </div>

          {/* Distance */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md flex items-center">
            <FaMapMarkerAlt className="text-red-500 text-3xl mr-4" />
            <div>
              <h3 className="text-lg font-bold">Distance</h3>
              <p>
                {starData.sy_dist 
                  ? `${starData.sy_dist} parsecs (~${(starData.sy_dist * 3.26).toFixed(2)} light-years)`
                  : 'Unknown'}
              </p>
            </div>
          </div>

          {/* Spectral Type */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md flex items-center">
            <FaStar className="text-indigo-500 text-3xl mr-4" />
            <div>
              <h3 className="text-lg font-bold">Spectral Type</h3>
              <p>{starData.st_spectype || 'Unknown'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Associated Exoplanets Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Associated Exoplanets</h2>
        {planets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {planets.map((planet) => (
              <div key={planet.id} className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col">
                <h3 className="text-xl font-bold mb-4">{planet.name}</h3>
                <div className="flex-1">
                  <p className="mb-2"><span className="font-semibold">Mass:</span> {planet.mass !== 'Unknown' ? `${planet.mass} Earth Masses` : 'Unknown'}</p>
                  <p className="mb-2"><span className="font-semibold">Radius:</span> {planet.radius !== 'Unknown' ? `${planet.radius} Earth Radii` : 'Unknown'}</p>
                  <p className="mb-2"><span className="font-semibold">Orbital Period:</span> {planet.orbitalPeriod} days</p>
                </div>
                <Link to={`/exoplanet/${planet.id}`} className="mt-4">
                  <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg transition duration-300">
                    Visit Exoplanet
                  </button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No associated exoplanets found.</p>
        )}
      </section>
    </div>
  );
};

export default ExoPlanet;

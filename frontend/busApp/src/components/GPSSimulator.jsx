import React, { useState, useEffect, useContext } from 'react';
import { SocketContext } from '../Context/SocketContext';

const GPSSimulator = ({ onLocationUpdate }) => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const [busRoute, setBusRoute] = useState([]);
  const [currentRouteIndex, setCurrentRouteIndex] = useState(0);
  const [simulationMode, setSimulationMode] = useState('manual'); // 'manual' or 'auto'
  const { socket } = useContext(SocketContext);

  // Predefined demo route (you can customize this)
  const demoRoute = [
    { lat: 28.6139, lng: 77.2090, name: "India Gate" },
    { lat: 28.6129, lng: 77.2295, name: "Khan Market" },
    { lat: 28.6304, lng: 77.2177, name: "Connaught Place" },
    { lat: 28.6562, lng: 77.2410, name: "Red Fort" },
    { lat: 28.6507, lng: 77.2334, name: "Chandni Chowk" },
    { lat: 28.6139, lng: 77.2090, name: "India Gate" } // Back to start
  ];

  useEffect(() => {
    setBusRoute(demoRoute);
    setCurrentLocation(demoRoute[0]);
  }, []);

  // Get user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setCurrentLocation(newLocation);
          if (onLocationUpdate) {
            onLocationUpdate(newLocation);
          }
          // Emit location to socket for real-time tracking
          if (socket) {
            socket.emit('busLocationUpdate', {
              busId: 'simulator-bus',
              location: newLocation,
              timestamp: new Date()
            });
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Using demo route instead.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  // Auto simulation along predefined route
  useEffect(() => {
    let interval;
    if (isSimulating && simulationMode === 'auto') {
      interval = setInterval(() => {
        setCurrentRouteIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % busRoute.length;
          const nextLocation = busRoute[nextIndex];
          setCurrentLocation(nextLocation);
          
          if (onLocationUpdate) {
            onLocationUpdate(nextLocation);
          }
          
          // Emit location to socket
          if (socket) {
            socket.emit('busLocationUpdate', {
              busId: 'simulator-bus',
              location: nextLocation,
              timestamp: new Date(),
              routeIndex: nextIndex,
              stationName: nextLocation.name
            });
          }
          
          return nextIndex;
        });
      }, 3000 / simulationSpeed); // Update every 3 seconds divided by speed
    }
    
    return () => clearInterval(interval);
  }, [isSimulating, simulationMode, simulationSpeed, busRoute, onLocationUpdate, socket]);

  const startSimulation = () => {
    setIsSimulating(true);
    if (simulationMode === 'manual') {
      getCurrentLocation();
    }
  };

  const stopSimulation = () => {
    setIsSimulating(false);
  };

  const moveToNextStation = () => {
    if (simulationMode === 'manual') {
      setCurrentRouteIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % busRoute.length;
        const nextLocation = busRoute[nextIndex];
        setCurrentLocation(nextLocation);
        
        if (onLocationUpdate) {
          onLocationUpdate(nextLocation);
        }
        
        if (socket) {
          socket.emit('busLocationUpdate', {
            busId: 'simulator-bus',
            location: nextLocation,
            timestamp: new Date(),
            routeIndex: nextIndex,
            stationName: nextLocation.name
          });
        }
        
        return nextIndex;
      });
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-white mb-4 text-center">GPS Bus Simulator</h3>
      <p className="text-gray-300 text-sm mb-4 text-center">
        Simulate bus movement for demonstration purposes
      </p>

      {/* Simulation Mode Selection */}
      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2">Simulation Mode:</label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="manual"
              checked={simulationMode === 'manual'}
              onChange={(e) => setSimulationMode(e.target.value)}
              className="mr-2"
            />
            <span className="text-white">Manual Control</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="auto"
              checked={simulationMode === 'auto'}
              onChange={(e) => setSimulationMode(e.target.value)}
              className="mr-2"
            />
            <span className="text-white">Auto Route</span>
          </label>
        </div>
      </div>

      {/* Speed Control for Auto Mode */}
      {simulationMode === 'auto' && (
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">
            Simulation Speed: {simulationSpeed}x
          </label>
          <input
            type="range"
            min="0.5"
            max="5"
            step="0.5"
            value={simulationSpeed}
            onChange={(e) => setSimulationSpeed(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
      )}

      {/* Current Location Display */}
      <div className="mb-4 p-3 bg-gray-800 rounded">
        <h4 className="text-white font-bold mb-2">Current Location:</h4>
        <p className="text-cyan-400">
          Lat: {currentLocation.lat.toFixed(6)}, Lng: {currentLocation.lng.toFixed(6)}
        </p>
        {currentLocation.name && (
          <p className="text-green-400">Station: {currentLocation.name}</p>
        )}
      </div>

      {/* Control Buttons */}
      <div className="flex space-x-2 mb-4">
        {!isSimulating ? (
          <button
            onClick={startSimulation}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
          >
            Start Simulation
          </button>
        ) : (
          <button
            onClick={stopSimulation}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
          >
            Stop Simulation
          </button>
        )}
        
        {simulationMode === 'manual' && isSimulating && (
          <button
            onClick={moveToNextStation}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
          >
            Next Station
          </button>
        )}
      </div>

      {/* Use Real GPS Button */}
      <button
        onClick={getCurrentLocation}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200 mb-4"
      >
        Use My Real GPS Location
      </button>

      {/* Route Preview */}
      <div className="bg-gray-800 p-3 rounded">
        <h4 className="text-white font-bold mb-2">Demo Route:</h4>
        <div className="space-y-1 max-h-32 overflow-y-auto">
          {busRoute.map((station, index) => (
            <div
              key={index}
              className={`text-sm p-2 rounded ${
                index === currentRouteIndex
                  ? 'bg-cyan-600 text-white'
                  : 'bg-gray-700 text-gray-300'
              }`}
            >
              {index + 1}. {station.name}
            </div>
          ))}
        </div>
      </div>

      {/* Status Indicator */}
      <div className="mt-4 text-center">
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
          isSimulating 
            ? 'bg-green-900 text-green-400' 
            : 'bg-red-900 text-red-400'
        }`}>
          <div className={`w-2 h-2 rounded-full mr-2 ${
            isSimulating ? 'bg-green-400' : 'bg-red-400'
          }`}></div>
          {isSimulating ? 'Simulation Active' : 'Simulation Stopped'}
        </div>
      </div>
    </div>
  );
};

export default GPSSimulator;

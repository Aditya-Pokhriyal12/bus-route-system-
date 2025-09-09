import React, { useState, useEffect } from 'react';
import Logo from '../components/Logo';
import { BusTrackingMap } from '../Components/OpenStreetMap';
import SeatDiagram from '../components/SeatDiagram';
import '../styles/theme.css';

const PassengerDashboard = () => {
  const [passengerData, setPassengerData] = useState({
    name: 'Jane Smith',
    mobile: '+91 9876543210',
    aadhaar: '****-****-1234'
  });

  const [nearbyBuses, setNearbyBuses] = useState([
    {
      id: 1,
      busNumber: 'UK-07-A-1234',
      route: 'Clock Tower → ISBT Dehradun',
      eta: '5 min',
      distance: '200m',
      occupancy: 75,
      location: { lat: 30.3165, lng: 78.0322 }
    },
    {
      id: 2,
      busNumber: 'UK-07-B-5678',
      route: 'Rajpur Road → Mussoorie',
      eta: '8 min',
      distance: '450m',
      occupancy: 60,
      location: { lat: 30.3255, lng: 78.0422 }
    },
    {
      id: 3,
      busNumber: 'UK-07-C-9012',
      route: 'Saharanpur Road → Rishikesh',
      eta: '12 min',
      distance: '800m',
      occupancy: 40,
      location: { lat: 30.3065, lng: 78.0222 }
    }
  ]);

  const [selectedBus, setSelectedBus] = useState(null);
  const [bookingModal, setBookingModal] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [showSeatSelection, setShowSeatSelection] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({ lat: 30.3165, lng: 78.0322 });
  const [locationError, setLocationError] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [tickets, setTickets] = useState([
    {
      id: 'TKT001',
      busNumber: 'UK-07-A-1234',
      route: 'Clock Tower → ISBT',
      date: '2024-01-15',
      status: 'active',
      fare: 25
    }
  ]);

  const bookBus = (bus) => {
    setSelectedBus(bus);
    setShowSeatSelection(true);
  };

  const handleSeatSelection = (seatNumber) => {
    setSelectedSeat(seatNumber);
  };

  const proceedToBooking = () => {
    if (selectedSeat) {
      setShowSeatSelection(false);
      setBookingModal(true);
    }
  };

  const confirmBooking = () => {
    const newTicket = {
      id: `TKT${String(tickets.length + 1).padStart(3, '0')}`,
      busNumber: selectedBus.busNumber,
      route: selectedBus.route,
      date: new Date().toISOString().split('T')[0],
      status: 'active',
      fare: 25
    };
    setTickets([...tickets, newTicket]);
    setBookingModal(false);
    setSelectedBus(null);
  };

  const getOccupancyColor = (occupancy) => {
    if (occupancy < 50) return 'text-green-400';
    if (occupancy < 80) return 'text-yellow-400';
    return 'text-red-400';
  };

  const handleBookTicket = (bus) => {
    setSelectedBus(bus);
    setShowSeatSelection(true);
  };

  const getCurrentLocation = () => {
    setIsLocating(true);
    setLocationError(null);
    
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser.');
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
        setIsLocating(false);
        
        // Update nearby buses based on new location (simulate)
        updateNearbyBuses(latitude, longitude);
      },
      (error) => {
        let errorMessage = 'Unable to retrieve your location.';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied by user.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.';
            break;
        }
        setLocationError(errorMessage);
        setIsLocating(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const updateNearbyBuses = (lat, lng) => {
    // Simulate updating bus distances based on user location
    const updatedBuses = nearbyBuses.map(bus => {
      const distance = calculateDistance(lat, lng, bus.location.lat, bus.location.lng);
      return {
        ...bus,
        distance: `${Math.round(distance * 1000)}m`
      };
    });
    setNearbyBuses(updatedBuses);
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Navigation */}
      <nav className="navbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Logo size="medium" />
            <div className="flex items-center space-x-4">
              <a href="#/" className="text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800" title="Home">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </a>
              <span className="text-white text-sm">Welcome, {passengerData.name}</span>
              <button className="text-gray-300 hover:text-white transition-colors">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Passenger Dashboard</h1>
          <p className="text-gray-400">Find and book your next journey</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Nearby Buses</p>
                <p className="text-2xl font-bold text-white">{nearbyBuses.length}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2z"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Tickets</p>
                <p className="text-2xl font-bold text-white">{tickets.filter(t => t.status === 'active').length}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">This Month</p>
                <p className="text-2xl font-bold text-white">₹{tickets.reduce((sum, t) => sum + t.fare, 0)}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Trips Completed</p>
                <p className="text-2xl font-bold text-white">{tickets.filter(t => t.status === 'completed').length}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Nearby Buses */}
          <div className="lg:col-span-1">
            <div className="card mb-6">
              <h3 className="text-xl font-bold text-white mb-4">Nearby Buses</h3>
              <div className="space-y-4">
                {nearbyBuses.map((bus) => (
                  <div key={bus.id} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-white font-semibold">{bus.busNumber}</h4>
                        <p className="text-gray-400 text-sm">{bus.route}</p>
                      </div>
                      <span className="text-green-400 text-sm font-medium">{bus.eta}</span>
                    </div>
                    
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-gray-400 text-sm">{bus.distance} away</span>
                      <span className={`text-sm ${getOccupancyColor(bus.occupancy)}`}>
                        {bus.occupancy}% full
                      </span>
                    </div>
                    
                    <button 
                      onClick={() => handleBookTicket(bus)}
                      className="btn-secondary w-full text-sm py-2"
                    >
                      Book Ticket
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* My Tickets */}
            <div className="card">
              <h3 className="text-xl font-bold text-white mb-4">My Tickets</h3>
              <div className="space-y-3">
                {tickets.map((ticket) => (
                  <div key={ticket.id} className="bg-gray-800 rounded-lg p-3 border-l-4 border-blue-400">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white font-medium">{ticket.id}</p>
                        <p className="text-gray-400 text-sm">{ticket.route}</p>
                        <p className="text-gray-500 text-xs">{ticket.date}</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-2 py-1 rounded text-xs ${
                          ticket.status === 'active' ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-300'
                        }`}>
                          {ticket.status}
                        </span>
                        <p className="text-white text-sm mt-1">₹{ticket.fare}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Live Map */}
          <div className="lg:col-span-2">
            <div className="card">
              <h3 className="text-xl font-bold text-white mb-4">Live Bus Locations</h3>
              <BusTrackingMap
                busLocation={currentLocation}
                route={nearbyBuses.map(bus => ({
                  lat: bus.location.lat,
                  lng: bus.location.lng,
                  name: bus.busNumber
                }))}
                className="map-container"
                style={{ height: '500px', width: '100%' }}
              />
              
              {/* Map Controls */}
              <div className="mt-4 flex justify-between items-center">
                <button 
                  onClick={getCurrentLocation}
                  disabled={isLocating}
                  className={`btn-secondary text-sm flex items-center ${isLocating ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isLocating ? (
                    <>
                      <svg className="animate-spin w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Locating...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      My Location
                    </>
                  )}
                </button>
                <button className="btn-secondary text-sm">
                  Change View
                </button>
              </div>
              
              {/* Location Error Display */}
              {locationError && (
                <div className="mt-2 p-3 bg-red-900 bg-opacity-50 border border-red-500 rounded-lg">
                  <p className="text-red-300 text-sm">{locationError}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Safety & Offline Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Safety Section */}
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Safety Features</h3>
                <p className="text-gray-400">Emergency assistance and safety tools</p>
              </div>
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors">
                Emergency SOS
              </button>
            </div>
          </div>

          {/* Offline Mode */}
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Offline Mode</h3>
                <p className="text-gray-400">Access saved routes and tickets offline</p>
              </div>
              <button className="btn-secondary">
                Enable Offline
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Seat Selection Modal */}
      {showSeatSelection && selectedBus && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Select Your Seat - {selectedBus.busNumber}</h3>
              <button 
                onClick={() => setShowSeatSelection(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-gray-300">Route: {selectedBus.route}</p>
              <p className="text-gray-300">ETA: {selectedBus.eta} • Occupancy: {selectedBus.occupancy}%</p>
            </div>
            
            <SeatDiagram 
              busId={selectedBus.id} 
              onSeatSelect={handleSeatSelection}
            />
            
            <div className="flex space-x-3 mt-6">
              <button 
                onClick={() => setShowSeatSelection(false)}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
              <button 
                onClick={proceedToBooking}
                disabled={!selectedSeat}
                className={`flex-1 font-bold py-2 px-4 rounded-lg transition-colors duration-200 ${
                  selectedSeat 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                {selectedSeat ? `Book Seat #${selectedSeat}` : 'Select a Seat'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Confirmation Modal */}
      {bookingModal && selectedBus && selectedSeat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold text-white mb-4">Confirm Booking</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-400">Bus Number:</span>
                <span className="text-white">{selectedBus.busNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Route:</span>
                <span className="text-white">{selectedBus.route}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Seat Number:</span>
                <span className="text-cyan-400">#{selectedSeat}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">ETA:</span>
                <span className="text-green-400">{selectedBus.eta}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Fare:</span>
                <span className="text-white">₹25</span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button 
                onClick={() => {
                  setBookingModal(false);
                  setSelectedSeat(null);
                }}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
              <button 
                onClick={confirmBooking}
                className="btn-primary flex-1"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PassengerDashboard;

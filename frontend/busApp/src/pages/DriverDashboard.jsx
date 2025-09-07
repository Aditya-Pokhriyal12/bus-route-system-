import React, { useState, useEffect } from 'react';
import Logo from '../components/Logo';
import { BusTrackingMap } from '../Components/OpenStreetMap';
import '../styles/theme.css';

const DriverDashboard = () => {
  const [driverData, setDriverData] = useState({
    name: 'John Doe',
    busNumber: 'DL-1PC-1234',
    licenseNumber: 'DL-1420110012345',
    status: 'active'
  });

  const [routeData, setRouteData] = useState({
    startLocation: '',
    endLocation: '',
    currentRoute: null,
    isActive: false
  });

  const [liveData, setLiveData] = useState({
    passengerCount: 12,
    maxCapacity: 50,
    currentLocation: { lat: 28.6139, lng: 77.2090 },
    bookingAlerts: [
      { id: 1, passenger: 'Alice Smith', pickup: 'Connaught Place', time: '2 min ago' },
      { id: 2, passenger: 'Bob Johnson', pickup: 'India Gate', time: '5 min ago' }
    ]
  });

  const [routeStops, setRouteStops] = useState([
    { lat: 28.6139, lng: 77.2090, name: 'Connaught Place' },
    { lat: 28.6129, lng: 77.2295, name: 'India Gate' },
    { lat: 28.5355, lng: 77.3910, name: 'Noida Sector 18' }
  ]);

  const handleStartRoute = () => {
    if (routeData.startLocation && routeData.endLocation) {
      setRouteData({ ...routeData, isActive: true });
    }
  };

  const handleEndRoute = () => {
    setRouteData({ ...routeData, isActive: false });
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
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${driverData.status === 'active' ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
                <span className="text-white text-sm">Welcome, {driverData.name}</span>
              </div>
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
          <h1 className="text-3xl font-bold text-white mb-2">Driver Dashboard</h1>
          <p className="text-gray-400">Welcome back, {driverData.name}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Passengers</p>
                <p className="text-2xl font-bold text-white">{liveData.passengerCount}/{liveData.maxCapacity}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.5 7H16c-.8 0-1.5.7-1.5 1.5v6c0 .8.7 1.5 1.5 1.5h1v6h2z"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Route Status</p>
                <p className="text-lg font-bold text-white">{routeData.isActive ? 'Active' : 'Inactive'}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${routeData.isActive ? 'bg-gradient-to-r from-green-500 to-blue-600' : 'bg-gray-600'}`}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Bus Number</p>
                <p className="text-lg font-bold text-white">{driverData.busNumber}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6z"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">New Bookings</p>
                <p className="text-2xl font-bold text-white">{liveData.bookingAlerts.length}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h6v-2H4v2zM4 15h8v-2H4v2zM4 11h8V9H4v2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Route Management */}
          <div className="lg:col-span-1">
            <div className="card mb-6">
              <h3 className="text-xl font-bold text-white mb-4">Route Management</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Start Location</label>
                  <input
                    type="text"
                    value={routeData.startLocation}
                    onChange={(e) => setRouteData({...routeData, startLocation: e.target.value})}
                    placeholder="Enter start location"
                    className="input-field"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">End Location</label>
                  <input
                    type="text"
                    value={routeData.endLocation}
                    onChange={(e) => setRouteData({...routeData, endLocation: e.target.value})}
                    placeholder="Enter end location"
                    className="input-field"
                  />
                </div>

                <div className="flex space-x-2">
                  {!routeData.isActive ? (
                    <button onClick={handleStartRoute} className="btn-primary flex-1">
                      Start Route
                    </button>
                  ) : (
                    <button onClick={handleEndRoute} className="btn-secondary flex-1">
                      End Route
                    </button>
                  )}
                  <button className="btn-secondary">
                    New Trip
                  </button>
                </div>
              </div>
            </div>

            {/* Booking Alerts */}
            <div className="card">
              <h3 className="text-xl font-bold text-white mb-4">Booking Alerts</h3>
              <div className="space-y-3">
                {liveData.bookingAlerts.map((alert) => (
                  <div key={alert.id} className="bg-gray-800 rounded-lg p-3 border-l-4 border-green-400">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white font-medium">{alert.passenger}</p>
                        <p className="text-gray-400 text-sm">{alert.pickup}</p>
                      </div>
                      <span className="text-xs text-gray-500">{alert.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Live Map */}
          <div className="lg:col-span-2">
            <div className="card">
              <h3 className="text-xl font-bold text-white mb-4">Live Bus Tracking</h3>
              <BusTrackingMap
                busLocation={liveData.currentLocation}
                route={routeStops}
                className="map-container"
                style={{ height: '500px', width: '100%' }}
              />
            </div>
          </div>
        </div>

        {/* Safety Section Placeholder */}
        <div className="mt-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Safety Features</h3>
                <p className="text-gray-400">Emergency alerts and safety monitoring</p>
              </div>
              <div className="flex space-x-4">
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors">
                  SOS Alert
                </button>
                <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg transition-colors">
                  Report Issue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;

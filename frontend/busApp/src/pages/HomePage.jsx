import React, { useState, useEffect } from 'react';
import Logo from '../components/Logo';
import '../styles/theme.css';

const HomePage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-green-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-1/3 w-1 h-1 bg-orange-400 rounded-full animate-pulse delay-3000"></div>
      </div>

      {/* Navigation */}
      <nav className="navbar relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Logo size="medium" />
            <div className="flex space-x-4">
              <button className="text-gray-300 hover:text-white transition-colors">
                About
              </button>
              <button className="text-gray-300 hover:text-white transition-colors">
                Contact
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 -mt-20">
        {/* Hero Section */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent">
              Bus Route
            </span>
            <br />
            <span className="text-white">
              Handling System
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience the future of public transportation with real-time tracking, 
            smart routing, and seamless booking - all in one futuristic platform.
          </p>
          <div className="text-sm text-gray-500 mb-12">
            Powered by <span className="text-blue-400 font-semibold">Bug Busters</span>
          </div>
        </div>

        {/* Login Options */}
        <div className={`grid md:grid-cols-2 gap-8 w-full max-w-4xl transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Driver Login Card */}
          <div className="card group cursor-pointer transform transition-all duration-300 hover:scale-105">
            <div className="text-center">
              {/* Driver Icon */}
              <div className="w-24 h-24 mx-auto mb-6 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <svg className="w-full h-full text-blue-400 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 6.5V7.5C15 8.1 14.6 8.5 14 8.5S13 8.1 13 7.5V6.5L9 7V9C9 10.1 9.9 11 11 11V12.5C9.8 12.8 9 13.8 9 15V16H7V18H9V22H11V18H13V22H15V18H17V16H15V15C15 13.8 14.2 12.8 13 12.5V11C14.1 11 15 10.1 15 9Z"/>
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">Driver Portal</h3>
              <p className="text-gray-400 mb-6">
                Manage routes, track passengers, and handle daily operations with our advanced driver dashboard.
              </p>
              
              <a href="#/driver/auth">
                <button className="btn-primary w-full group-hover:shadow-lg group-hover:shadow-blue-500/25">
                  <span className="flex items-center justify-center">
                    Login as Driver
                    <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
              </a>
              
              <div className="mt-4 text-xs text-gray-500">
                • Route Management • Real-time Tracking • Passenger Alerts
              </div>
            </div>
          </div>

          {/* Passenger Login Card */}
          <div className="card group cursor-pointer transform transition-all duration-300 hover:scale-105">
            <div className="text-center">
              {/* Passenger Icon */}
              <div className="w-24 h-24 mx-auto mb-6 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-600 rounded-full opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <svg className="w-full h-full text-green-400 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"/>
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">Passenger Portal</h3>
              <p className="text-gray-400 mb-6">
                Find buses, book tickets, and track your journey in real-time with our smart passenger system.
              </p>
              
              <a href="#/passenger/auth">
                <button className="btn-secondary w-full group-hover:shadow-lg group-hover:shadow-green-500/25">
                  <span className="flex items-center justify-center">
                    Login as Passenger
                    <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
              </a>
              
              <div className="mt-4 text-xs text-gray-500">
                • Live Bus Tracking • Ticket Booking • Route Planning
              </div>
            </div>
          </div>
        </div>

        {/* Features Preview */}
        <div className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="text-sm text-gray-400">Real-time Tracking</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </div>
            <p className="text-sm text-gray-400">Smart Booking</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <p className="text-sm text-gray-400">Safety Features</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
              </svg>
            </div>
            <p className="text-sm text-gray-400">Offline Mode</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-gray-500 text-sm">
        <p>&copy; 2024 Bug Busters Team. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;

import React from 'react';

const Logo = ({ size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Modern Bus Route Logo */}
      <div className={`${sizeClasses[size]} relative`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Map Pin Outline */}
          <path
            d="M50 10C35 10 23 22 23 37C23 52 50 85 50 85S77 52 77 37C77 22 65 10 50 10Z"
            stroke="url(#gradient1)"
            strokeWidth="3"
            fill="rgba(0, 212, 255, 0.1)"
          />
          
          {/* Bus Icon Inside Pin */}
          <rect
            x="35"
            y="28"
            width="30"
            height="18"
            rx="3"
            fill="url(#gradient2)"
          />
          
          {/* Bus Windows */}
          <rect x="38" y="31" width="6" height="4" rx="1" fill="#0a0a0a" />
          <rect x="46" y="31" width="6" height="4" rx="1" fill="#0a0a0a" />
          <rect x="54" y="31" width="6" height="4" rx="1" fill="#0a0a0a" />
          
          {/* Bus Wheels */}
          <circle cx="40" cy="46" r="3" fill="url(#gradient3)" />
          <circle cx="60" cy="46" r="3" fill="url(#gradient3)" />
          
          {/* Route Lines */}
          <path
            d="M20 20 Q30 15 40 25 Q50 35 60 25 Q70 15 80 20"
            stroke="url(#gradient4)"
            strokeWidth="2"
            fill="none"
            opacity="0.7"
          />
          
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00d4ff" />
              <stop offset="100%" stopColor="#b347d9" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00ff88" />
              <stop offset="100%" stopColor="#00d4ff" />
            </linearGradient>
            <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff6b35" />
              <stop offset="100%" stopColor="#00d4ff" />
            </linearGradient>
            <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00ff88" />
              <stop offset="50%" stopColor="#00d4ff" />
              <stop offset="100%" stopColor="#b347d9" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Brand Text */}
      <div className="flex flex-col">
        <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent">
          BusRoute
        </span>
        <span className="text-xs text-gray-400 -mt-1">Bug Busters</span>
      </div>
    </div>
  );
};

export default Logo;

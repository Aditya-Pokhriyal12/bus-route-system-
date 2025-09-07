import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import '../styles/theme.css';

const DriverAuth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    aadhaar: '',
    mobile: '',
    busNumber: '',
    licenseNumber: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Test authentication - accepts any values
    if (isLogin) {
      // Login validation
      if (formData.aadhaar && formData.mobile && formData.busNumber && formData.licenseNumber) {
        console.log('Driver login successful:', formData);
        navigate('/driver/dashboard');
      } else {
        alert('Please fill all fields');
      }
    } else {
      // Registration validation
      if (formData.aadhaar && formData.mobile && formData.busNumber && formData.licenseNumber && formData.password && formData.confirmPassword) {
        if (formData.password === formData.confirmPassword) {
          console.log('Driver registration successful:', formData);
          navigate('/driver/dashboard');
        } else {
          alert('Passwords do not match');
        }
      } else {
        alert('Please fill all fields');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-green-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className="navbar relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Logo size="medium" />
            <div className="absolute top-4 left-4">
              <button 
                onClick={() => navigate('/')} 
                className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Back to Home</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 -mt-20">
        <div className="w-full max-w-md">
          {/* Auth Toggle */}
          <div className="flex mb-8 bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-md transition-all ${
                isLogin 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-md transition-all ${
                !isLogin 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Register
            </button>
          </div>

          {/* Auth Card */}
          <div className="card">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 6.5V7.5C15 8.1 14.6 8.5 14 8.5S13 8.1 13 7.5V6.5L9 7V9C9 10.1 9.9 11 11 11V12.5C9.8 12.8 9 13.8 9 15V16H7V18H9V22H11V18H13V22H15V18H17V16H15V15C15 13.8 14.2 12.8 13 12.5V11C14.1 11 15 10.1 15 9Z"/>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Driver {isLogin ? 'Login' : 'Registration'}
              </h2>
              <p className="text-gray-400">
                {isLogin 
                  ? 'Access your driver dashboard' 
                  : 'Join our driver network today'
                }
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Aadhaar Number */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Aadhaar Number
                </label>
                <input
                  type="text"
                  name="aadhaar"
                  value={formData.aadhaar}
                  onChange={handleInputChange}
                  placeholder="Enter 12-digit Aadhaar number"
                  className="input-field"
                  maxLength="12"
                  required
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="Enter mobile number"
                  className="input-field"
                  maxLength="10"
                  required
                />
              </div>

              {/* Bus Number */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Bus Number
                </label>
                <input
                  type="text"
                  name="busNumber"
                  value={formData.busNumber}
                  onChange={handleInputChange}
                  placeholder="Enter bus registration number"
                  className="input-field"
                  required
                />
              </div>

              {/* License Number */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Driving License Number
                </label>
                <input
                  type="text"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleInputChange}
                  placeholder="Enter driving license number"
                  className="input-field"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter password"
                  className="input-field"
                  required
                />
              </div>

              {/* Confirm Password (Register only) */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm password"
                    className="input-field"
                    required
                  />
                </div>
              )}

              {/* Submit Button */}
              <button type="submit" className="btn-primary w-full">
                {isLogin ? 'Login to Dashboard' : 'Register as Driver'}
              </button>
            </form>

            {/* Additional Options */}
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {isLogin ? 'Register here' : 'Login here'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverAuth;

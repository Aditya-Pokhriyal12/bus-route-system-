import React, { useState, useEffect, useContext } from 'react';
import { SocketContext } from '../Context/SocketContext';
import SeatDiagram from '../components/SeatDiagram';
import GPSSimulator from '../components/GPSSimulator';

const DemoPage = () => {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [currentBusLocation, setCurrentBusLocation] = useState(null);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    if (socket) {
      // Listen for real-time seat updates
      socket.on('seatStatusUpdate', (data) => {
        console.log('Seat status updated:', data);
      });

      // Listen for bus location updates
      socket.on('busLocationUpdate', (data) => {
        setCurrentBusLocation(data);
      });

      return () => {
        socket.off('seatStatusUpdate');
        socket.off('busLocationUpdate');
      };
    }
  }, [socket]);

  const handleSeatSelection = (seatNumber) => {
    setSelectedSeat(seatNumber);
    setIsBookingConfirmed(false);
  };

  const handleLocationUpdate = (location) => {
    setCurrentBusLocation(location);
  };

  const confirmBooking = () => {
    if (selectedSeat) {
      const booking = {
        id: Date.now(),
        seatNumber: selectedSeat,
        timestamp: new Date().toLocaleString(),
        busLocation: currentBusLocation,
        status: 'confirmed'
      };
      
      setBookingHistory([...bookingHistory, booking]);
      setIsBookingConfirmed(true);
      
      // Emit booking to socket for real-time updates
      if (socket) {
        socket.emit('seatBooked', {
          busId: 'simulator-bus',
          seatNumber: selectedSeat,
          timestamp: new Date(),
          passengerInfo: { id: 'demo-passenger' }
        });
      }
    }
  };

  const cancelBooking = () => {
    if (selectedSeat) {
      // Remove from booking history
      setBookingHistory(bookingHistory.filter(booking => booking.seatNumber !== selectedSeat));
      setIsBookingConfirmed(false);
      setSelectedSeat(null);
      
      // Emit cancellation to socket
      if (socket) {
        socket.emit('seatCancelled', {
          busId: 'simulator-bus',
          seatNumber: selectedSeat,
          timestamp: new Date()
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            🚌 Bus Tracking System Demo
          </h1>
          <p className="text-gray-300 text-lg">
            Interactive demonstration of seat booking and GPS simulation features
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Seat Diagram Section */}
          <div className="space-y-4">
            <SeatDiagram 
              busId="simulator-bus" 
              onSeatSelect={handleSeatSelection}
            />
            
            {/* Booking Controls */}
            {selectedSeat && (
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="text-white font-bold mb-3">Booking Controls</h4>
                <div className="flex space-x-2">
                  {!isBookingConfirmed ? (
                    <button
                      onClick={confirmBooking}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
                    >
                      Confirm Booking - Seat #{selectedSeat}
                    </button>
                  ) : (
                    <button
                      onClick={cancelBooking}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
                    >
                      Cancel Booking - Seat #{selectedSeat}
                    </button>
                  )}
                </div>
                
                {isBookingConfirmed && (
                  <div className="mt-3 p-2 bg-green-900 rounded">
                    <p className="text-green-400 text-sm">
                      ✅ Seat #{selectedSeat} successfully booked!
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* GPS Simulator Section */}
          <div>
            <GPSSimulator onLocationUpdate={handleLocationUpdate} />
          </div>
        </div>

        {/* Real-time Information Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Current Bus Status */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <h4 className="text-white font-bold mb-3">Real-time Bus Status</h4>
            {currentBusLocation ? (
              <div className="space-y-2">
                <p className="text-cyan-400">
                  <span className="font-semibold">Location:</span> {currentBusLocation.lat?.toFixed(6)}, {currentBusLocation.lng?.toFixed(6)}
                </p>
                {currentBusLocation.stationName && (
                  <p className="text-green-400">
                    <span className="font-semibold">Current Station:</span> {currentBusLocation.stationName}
                  </p>
                )}
                <p className="text-gray-300 text-sm">
                  Last Updated: {new Date().toLocaleTimeString()}
                </p>
              </div>
            ) : (
              <p className="text-gray-400">No bus location data available</p>
            )}
          </div>

          {/* Booking History */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <h4 className="text-white font-bold mb-3">Booking History</h4>
            {bookingHistory.length > 0 ? (
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {bookingHistory.map((booking) => (
                  <div key={booking.id} className="bg-gray-700 p-2 rounded text-sm">
                    <p className="text-white">
                      Seat #{booking.seatNumber} - {booking.timestamp}
                    </p>
                    <p className="text-green-400">Status: {booking.status}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No bookings yet</p>
            )}
          </div>
        </div>

        {/* Instructions Panel */}
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-white mb-4">How to Use This Demo</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-cyan-400 font-semibold mb-2">🪑 Seat Booking Feature:</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Click on any green (available) seat to select it</li>
                <li>• Red seats are already occupied</li>
                <li>• Blue seats are your selected seats</li>
                <li>• Confirm booking to reserve the seat</li>
                <li>• View occupancy statistics in real-time</li>
              </ul>
            </div>
            <div>
              <h4 className="text-cyan-400 font-semibold mb-2">📍 GPS Simulation Feature:</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Choose between Manual Control or Auto Route</li>
                <li>• Use "My Real GPS" to act as a real bus</li>
                <li>• Auto mode follows a predefined Delhi route</li>
                <li>• Adjust simulation speed for demonstrations</li>
                <li>• Real-time location updates for tracking</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            This demo showcases the real-time bus tracking system with seat management capabilities.
            Perfect for demonstrating to judges and stakeholders.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;

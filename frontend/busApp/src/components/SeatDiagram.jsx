import React, { useState, useEffect } from 'react';

const SeatDiagram = ({ busId, totalSeats = 40, onSeatSelect }) => {
  const [seatStatus, setSeatStatus] = useState({});
  const [selectedSeat, setSelectedSeat] = useState(null);

  // Initialize seats (40 seats in a typical bus layout)
  useEffect(() => {
    const initialSeats = {};
    for (let i = 1; i <= totalSeats; i++) {
      // Randomly assign some seats as occupied for demo
      initialSeats[i] = Math.random() > 0.7 ? 'occupied' : 'available';
    }
    setSeatStatus(initialSeats);
  }, [totalSeats]);

  const handleSeatClick = (seatNumber) => {
    if (seatStatus[seatNumber] === 'occupied') return;
    
    setSelectedSeat(seatNumber);
    if (onSeatSelect) {
      onSeatSelect(seatNumber);
    }
  };

  const getSeatColor = (seatNumber) => {
    if (seatStatus[seatNumber] === 'occupied') return 'bg-red-500';
    if (selectedSeat === seatNumber) return 'bg-blue-500';
    return 'bg-green-500 hover:bg-green-400';
  };

  const renderSeatRow = (startSeat, endSeat, isDriverSide = false) => {
    const seats = [];
    for (let i = startSeat; i <= endSeat; i++) {
      seats.push(
        <div
          key={i}
          className={`w-8 h-8 m-1 rounded cursor-pointer transition-colors duration-200 flex items-center justify-center text-white text-xs font-bold ${getSeatColor(i)} ${
            seatStatus[i] === 'occupied' ? 'cursor-not-allowed' : ''
          }`}
          onClick={() => handleSeatClick(i)}
          title={`Seat ${i} - ${seatStatus[i]}`}
        >
          {i}
        </div>
      );
    }
    return seats;
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-white mb-4 text-center">Bus Seat Layout</h3>
      
      {/* Legend */}
      <div className="flex justify-center space-x-4 mb-6">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
          <span className="text-white text-sm">Available</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
          <span className="text-white text-sm">Occupied</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
          <span className="text-white text-sm">Selected</span>
        </div>
      </div>

      {/* Bus Layout */}
      <div className="bg-gray-800 p-4 rounded-lg border-2 border-cyan-400">
        {/* Driver Section */}
        <div className="flex justify-between items-center mb-4">
          <div className="bg-yellow-600 w-12 h-8 rounded flex items-center justify-center">
            <span className="text-xs text-white font-bold">DRIVER</span>
          </div>
          <div className="bg-gray-700 w-16 h-8 rounded flex items-center justify-center">
            <span className="text-xs text-white">DOOR</span>
          </div>
        </div>

        {/* Seat Rows */}
        <div className="space-y-2">
          {/* Front rows (2+2 seating) */}
          {[1, 5, 9, 13, 17, 21, 25, 29, 33, 37].map((startSeat, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="flex">
                {renderSeatRow(startSeat, startSeat + 1)}
              </div>
              <div className="w-8"></div> {/* Aisle */}
              <div className="flex">
                {renderSeatRow(startSeat + 2, startSeat + 3)}
              </div>
            </div>
          ))}
        </div>

        {/* Back Emergency Exit */}
        <div className="flex justify-center mt-4">
          <div className="bg-gray-700 w-20 h-6 rounded flex items-center justify-center">
            <span className="text-xs text-white">EMERGENCY EXIT</span>
          </div>
        </div>
      </div>

      {/* Seat Selection Info */}
      {selectedSeat && (
        <div className="mt-4 p-3 bg-blue-900 rounded-lg">
          <p className="text-white text-center">
            Selected Seat: <span className="font-bold text-cyan-400">#{selectedSeat}</span>
          </p>
        </div>
      )}

      {/* Occupancy Stats */}
      <div className="mt-4 text-center">
        <p className="text-white">
          Occupancy: {Object.values(seatStatus).filter(status => status === 'occupied').length}/{totalSeats} seats
        </p>
        <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
          <div 
            className="bg-gradient-to-r from-green-400 to-red-500 h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${(Object.values(seatStatus).filter(status => status === 'occupied').length / totalSeats) * 100}%` 
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SeatDiagram;

import React, { createContext, useContext, useState } from 'react';
import { io } from 'socket.io-client';
import {SERVER_URL} from "../Constants/config.js";

export const SocketContext = createContext();

// Initialize socket as null to prevent immediate connection
let socket = null;

const SocketProvider = ({ children }) => {
  const [busId,setBusId]=useState("")
  
  // Function to connect socket when needed
  const connectSocket = () => {
    if (!socket) {
      socket = io(SERVER_URL, {
        extraHeaders: {
          'ngrok-skip-browser-warning': 10,
        },
        autoConnect: false
      });
    }
    return socket;
  };
  
  return (
    <SocketContext.Provider value={{socket: connectSocket(), busId, setBusId}}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
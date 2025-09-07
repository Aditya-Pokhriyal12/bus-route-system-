#!/bin/bash

# Bug Busters Bus Route Handling System - Quick Start Script

echo "🚌 Starting Bug Busters Bus Route Handling System..."

# Kill any existing processes
echo "🛑 Cleaning up previous processes..."
pkill -f nodemon 2>/dev/null
pkill -f vite 2>/dev/null
pkill -f "node.*server.js" 2>/dev/null

# Wait a moment for processes to close
sleep 2

echo "🔧 Starting Backend Server..."
cd backend
npm start &
BACKEND_PID=$!

# Wait for backend to start
sleep 5

echo "🎨 Starting Frontend Server..."
cd ../frontend/busApp
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Bug Busters System Started!"
echo "📱 Frontend: http://localhost:5173/#/"
echo "🔧 Backend: http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user to stop
wait

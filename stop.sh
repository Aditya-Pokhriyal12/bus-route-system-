#!/bin/bash

# Bug Busters Bus Route Handling System - Stop Script

echo "🛑 Stopping Bug Busters Bus Route Handling System..."

# Kill all related processes
pkill -f nodemon
pkill -f vite
pkill -f "node.*server.js"

echo "✅ All processes stopped!"

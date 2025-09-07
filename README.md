# Bus Route Handling System - Bug Busters 

<div align="center">
  <h2>🚌 Real-Time Bus Tracking System</h2>
  <p><em>Powered by Bug Busters Team</em></p>
</div>

---

This repository contains the source code and documentation for the Bus Route Handling System developed by Team Bug Busters. Built with modern technologies including Tailwind CSS, ReactJS, Express, MongoDB, Socket.io, and OpenStreetMap integration. Features a sleek dark theme with futuristic design, real-time bus tracking, driver and passenger authentication, and ticket booking system.

---

## Table of Contents

1. [Overview](#overview)
2. [Technologies Used](#technologies-used)
3. [Getting Started](#getting-started)
4. [Project Structure](#project-structure)
5. [Deployment](#deployment)
6. [Chatbot](#chatbot)

## Overview

The Bus Route Handling System provides a modern, user-friendly, and real-time bus tracking solution that allows users to track the location of buses on a map. This system enhances the public transportation experience by providing accurate bus locations and estimated arrival times. OpenStreetMap integration is used to display and interact with maps.

The project features separate portals for drivers and passengers, with comprehensive authentication systems, real-time tracking, ticket booking capabilities, and a futuristic dark theme with neon accents.

## Technologies Used

- **Tailwind CSS**: Used for designing and styling the user interface.
- **React**: Developed the front-end interface and real-time map tracking.
- **Express**: Built the backend server for handling API requests and managing data.
- **MongoDB**: Used for storing and managing bus route data.
- **Socket.io**: Enabled real-time communication between the server and clients.
- **OpenStreetMap**: Integrated for displaying and interacting with maps (free alternative to Google Maps).
- **Vite**: Modern build tool for fast development and optimized production builds.
- **React Router**: Client-side routing for seamless navigation between pages.

## Getting Started

To get a copy of this project up and running on your local machine for development and testing purposes, follow these steps:

1. Clone the repository to your local machine:

   ```shell
   git clone https://github.com/BugBusters/Bus-Route-Handling-System.git
   ```

2. Install backend dependencies:

   ```shell
   cd Bus-Route-Handling-System/backend
   npm install
   ```

3. Install frontend dependencies:

   ```shell
   cd ../frontend/busApp
   npm install
   ```

4. Set up environment variables in backend/.env:

   ```shell
   PORT=3000
   MONGODB_URL=your_mongodb_connection_string
   ```

5. Start the backend server:

   ```shell
   cd backend
   npm start
   ```

6. Start the frontend development server:

   ```shell
   cd frontend/busApp
   npm run dev
   ```

7. Access the application by navigating to `http://localhost:5173/#/` in your web browser.

## Project Structure

The project structure is organized as follows:
```
Bus-Route-Handling-System/
├── backend/                 # Express.js backend server
│   ├── controllers/         # API endpoint controllers
│   ├── Database/           # MongoDB connection setup
│   ├── middlewares/        # Custom middleware functions
│   ├── Cache/              # Caching logic
│   └── server.js           # Main server file
├── frontend/busApp/        # React frontend application
│   ├── src/
│   │   ├── pages/          # Main application pages
│   │   ├── components/     # Reusable React components
│   │   ├── styles/         # CSS and theme files
│   │   ├── Context/        # React context providers
│   │   └── Constants/      # Configuration constants
│   └── vite.config.js      # Vite build configuration
└── README.md               # Project documentation
```

## Features

### 🚌 Driver Portal
- **Authentication**: Aadhaar, mobile, bus number, and license verification
- **Dashboard**: Route management and real-time passenger tracking
- **Live Updates**: Real-time passenger count and booking alerts
- **Interactive Maps**: OpenStreetMap integration for route visualization

### 👥 Passenger Portal
- **Authentication**: Mobile, Aadhaar, name, and email verification
- **Nearby Buses**: Real-time bus locations with ETA and occupancy
- **Ticket Booking**: Interactive booking system with confirmation
- **Trip Management**: Personal ticket history and spending tracking

### 🎨 Design Features
- **Dark Theme**: Futuristic design with neon blue, green, and orange accents
- **Responsive**: Optimized for both desktop and mobile devices
- **Animations**: Smooth transitions and glowing button effects
- **Modern UI**: Clean, intuitive interface with excellent UX

## Deployment

This project is deployed on Azure, providing a scalable and reliable platform for real-time bus tracking. 

## Chatbot

The chatbot integrated into this project uses NLP and ML to provide intelligent responses to user queries. It can handle questions about bus routes, estimated arrival times, and other relevant information. 

## Development

### Prerequisites
- Node.js (v14 or higher)
- MongoDB database
- Modern web browser

### Testing
The application includes test authentication that accepts any values for development purposes. Simply fill all required fields with any text/numbers to access the dashboards.

---

**Developed by Bug Busters Team** 🚀

For questions or contributions, please contact the Bug Busters development team.

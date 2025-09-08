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

### Frontend
- **React 18**: Modern JavaScript library for building user interfaces
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for styling
- **React Router DOM**: Client-side routing for single-page application navigation
- **Socket.io Client**: Real-time bidirectional event-based communication
- **Axios**: HTTP client for API requests
- **React Leaflet**: React components for Leaflet maps
- **Leaflet**: Open-source JavaScript library for interactive maps
- **@react-google-maps/api**: Google Maps integration (optional)
- **React Toastify**: Toast notifications for user feedback

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework for Node.js
- **Socket.io**: Real-time communication between server and clients
- **MongoDB**: NoSQL database for data storage
- **Mongoose**: MongoDB object modeling for Node.js
- **Nodemon**: Development tool for automatic server restarts
- **Bcrypt**: Password hashing library
- **CORS**: Cross-Origin Resource Sharing middleware
- **Multer**: Middleware for handling multipart/form-data
- **Cloudinary**: Cloud-based image and video management (optional)
- **Cookie Parser**: Parse HTTP request cookies
- **Express File Upload**: Simple express middleware for uploading files

### Development Tools
- **ESLint**: JavaScript linting utility
- **PostCSS**: CSS post-processor
- **Autoprefixer**: CSS vendor prefixing
- **dotenv**: Environment variable management

## Getting Started

To get a copy of this project up and running on your local machine for development and testing purposes, follow these steps:

1. Clone the repository to your local machine:

   ```shell
   git clone https://github.com/Dhruv-Bhandarii/bus-route-system-.git
   cd Real-Time-Bus-Tracking-System
   ```

2. Install backend dependencies:

   ```shell
   cd backend
   npm install
   ```

3. Install frontend dependencies:

   ```shell
   cd ../frontend/busApp
   npm install
   ```

4. Set up environment variables:

   **Backend (.env)**:
   ```shell
   PORT=3001
   MONGODB_URL=mongodb://localhost:27017/bus-tracking-system
   # Or use MongoDB Atlas:
   # MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/bus-tracking-system
   ```

   **Frontend (.env)** (Optional for Google Maps):
   ```shell
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

5. Start the application:

   **Option 1: Use the start script**
   ```shell
   ./start.sh
   ```

   **Option 2: Manual start**
   ```shell
   # Terminal 1 - Backend
   cd backend
   npm start

   # Terminal 2 - Frontend
   cd frontend/busApp
   npm run dev
   ```

6. Access the application:
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:3001`

## Project Structure

The project structure is organized as follows:
```
Real-Time-Bus-Tracking-System/
├── backend/                 # Express.js backend server
│   ├── controllers/         # API endpoint controllers
│   │   └── busController.js # Bus-related API logic
│   ├── Database/           # MongoDB connection setup
│   │   └── db.js           # Database configuration
│   ├── middlewares/        # Custom middleware functions
│   │   └── multer.middleware.js # File upload middleware
│   ├── Cache/              # Caching logic
│   │   └── cache.js        # Cache implementation
│   ├── models/             # Mongoose data models
│   ├── routes/             # API route definitions
│   ├── server.js           # Main server file
│   ├── package.json        # Backend dependencies
│   └── .env.example        # Environment variables template
├── frontend/busApp/        # React frontend application
│   ├── src/
│   │   ├── pages/          # Main application pages
│   │   ├── components/     # Reusable React components
│   │   ├── Context/        # React context providers
│   │   │   └── SocketContext.jsx # Socket.io context
│   │   ├── Constants/      # Configuration constants
│   │   │   └── keys.js     # API keys and constants
│   │   ├── App.jsx         # Main application component
│   │   └── main.jsx        # Application entry point
│   ├── public/             # Static assets
│   ├── vite.config.js      # Vite build configuration
│   ├── tailwind.config.js  # Tailwind CSS configuration
│   ├── package.json        # Frontend dependencies
│   └── .env.example        # Environment variables template
├── start.sh                # Script to start both servers
├── stop.sh                 # Script to stop both servers
├── SETUP_REQUIREMENTS.md   # Detailed setup instructions
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

This project can be deployed on various platforms:

- **Frontend**: Netlify, Vercel, or any static hosting service
- **Backend**: Heroku, Railway, DigitalOcean, or any Node.js hosting platform
- **Database**: MongoDB Atlas (cloud) or self-hosted MongoDB

For detailed deployment instructions, refer to the `SETUP_REQUIREMENTS.md` file. 

## Chatbot

The chatbot integrated into this project uses NLP and ML to provide intelligent responses to user queries. It can handle questions about bus routes, estimated arrival times, and other relevant information. 

## Development

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** (comes with Node.js)
- **MongoDB** (local installation or MongoDB Atlas account)
- **Modern web browser** (Chrome, Firefox, Safari, Edge)
- **Git** (for cloning the repository)

### Testing
The application includes test authentication that accepts any values for development purposes. Simply fill all required fields with any text/numbers to access the dashboards.

### API Endpoints
- `GET /api/buses` - Get all buses
- `POST /api/buses` - Create a new bus
- `PUT /api/buses/:id` - Update bus information
- `DELETE /api/buses/:id` - Delete a bus
- Socket.io events for real-time tracking

### Environment Configuration
- The project uses OpenStreetMap by default (no API key required)
- Google Maps integration is optional and requires an API key
- MongoDB connection can be local or cloud-based (Atlas)
- All sensitive data is stored in environment variables

---

**Developed by Bug Busters Team** 🚀

For questions or contributions, please contact the Bug Busters development team.

# Setup Requirements for Real-Time Bus Tracking System

## API Keys and Configuration Removed

The following API keys and configurations have been removed from the codebase for security reasons. Your friend will need to obtain and configure these to run the project:

## Required API Keys & Services

### 1. Google Maps API Key
- **File**: `frontend/busApp/.env`
- **Variable**: `VITE_GOOGLE_MAPS_API_KEY`
- **How to get**: 
  1. Go to [Google Cloud Console](https://console.cloud.google.com/)
  2. Create a new project or select existing one
  3. Enable the following APIs:
     - Maps JavaScript API
     - Directions API
     - Distance Matrix API
  4. Create credentials (API Key)
  5. Add the key to `.env` file

### 2. MongoDB Database
- **File**: `backend/.env`
- **Variable**: `MONGODB_URL`
- **Options**:
  - Local MongoDB: `mongodb://localhost:27017/bus-tracking-system`
  - MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/bus-tracking-system`

### 3. Optional: Cloudinary (for image uploads)
- **File**: `backend/.env`
- **Variables**:
  - `CLOUDINARY_CLOUD_NAME`
  - `CLOUDINARY_API_KEY`
  - `CLOUDINARY_API_SECRET`

## Environment Files to Create

### Backend (.env)
```
PORT=3001
MONGODB_URL=your_mongodb_connection_string
```

### Frontend (.env)
```
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## Installation Steps

1. **Clone the repository**
2. **Install backend dependencies**:
   ```bash
   cd backend
   npm install
   ```
3. **Install frontend dependencies**:
   ```bash
   cd frontend/busApp
   npm install
   ```
4. **Create environment files** with the keys above
5. **Start the application**:
   ```bash
   # Use the provided start script
   ./start.sh
   
   # Or manually:
   # Terminal 1 - Backend
   cd backend && npm start
   
   # Terminal 2 - Frontend
   cd frontend/busApp && npm run dev
   ```

## Notes
- The project uses OpenStreetMap as a fallback for maps if Google Maps API is not configured
- All authentication is currently set to test mode (accepts any values)
- Make sure MongoDB is running before starting the backend server

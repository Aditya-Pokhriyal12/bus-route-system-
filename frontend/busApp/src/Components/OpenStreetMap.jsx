import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to handle map center updates
function MapUpdater({ center, zoom }) {
  const map = useMap();
  
  useEffect(() => {
    if (center && center.lat && center.lng) {
      map.setView([center.lat, center.lng], zoom || 10);
    }
  }, [center, zoom, map]);
  
  return null;
}

// Main OpenStreetMap component
export function OpenStreetMap({ 
  center = { lat: 30.3165, lng: 78.0322 }, // Default to Dehradun Clock Tower
  zoom = 10,
  markers = [],
  className = "map-container",
  style = { height: '400px', width: '100%' }
}) {
  return (
    <div className={className} style={style}>
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapUpdater center={center} zoom={zoom} />
        
        {markers.map((marker, index) => (
          <Marker key={index} position={[marker.lat, marker.lng]}>
            {marker.popup && <Popup>{marker.popup}</Popup>}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

// Bus tracking specific component
export function BusTrackingMap({ 
  busLocation,
  route = [],
  className = "map-container",
  style = { height: '400px', width: '100%' }
}) {
  const markers = [];
  
  // Add bus location marker
  if (busLocation && busLocation.lat && busLocation.lng) {
    markers.push({
      lat: busLocation.lat,
      lng: busLocation.lng,
      popup: "Bus Location"
    });
  }
  
  // Add route markers
  route.forEach((stop, index) => {
    if (stop.lat && stop.lng) {
      markers.push({
        lat: stop.lat,
        lng: stop.lng,
        popup: `Stop ${index + 1}: ${stop.name || 'Bus Stop'}`
      });
    }
  });
  
  const center = busLocation || (route.length > 0 ? route[0] : { lat: 30.3165, lng: 78.0322 });
  
  return (
    <OpenStreetMap
      center={center}
      zoom={13}
      markers={markers}
      className={className}
      style={style}
    />
  );
}

export default OpenStreetMap;

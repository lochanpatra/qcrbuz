import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Import the marker icon and shadow
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix the default icon issue in Leaflet when using bundlers like Vite
L.Icon.Default.mergeOptions({
  iconUrl,
  shadowUrl: iconShadow,
});

const LeafletMap: React.FC = () => {
  const position: [number, number] = [51.505, -0.09]; // Default center: London

  return (
    <div style={{ height: '400px', width: '100%', borderRadius: '8px', overflow: 'hidden', marginTop: '1rem' }}>
      <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>A Leaflet marker in London.</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default LeafletMap;

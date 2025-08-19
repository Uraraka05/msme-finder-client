// client/src/components/Map.js

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon issue with webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


const Map = ({ msmes }) => {
    // Set the initial map position (e.g., center of Bengaluru)
    const position = [12.9716, 77.5946]; 

    return (
        <MapContainer center={position} zoom={12} style={{ height: '80vh', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {/* Loop through the msmes data and create a marker for each one */}
            {msmes.map(msme => (
                <Marker key={msme.id} position={[msme.latitude, msme.longitude]}>
                    <Popup>
                        <b>{msme.name}</b><br />
                        Category: {msme.category}<br />
                        Address: {msme.address}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;
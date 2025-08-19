// client/src/components/Map.js

import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

// Fix for default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


const Map = ({ msmes }) => {
    const position = [12.9716, 77.5946];
    const [route, setRoute] = useState(null);

    const handleGetDirections = (msme) => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
            return;
        }

        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const startPoint = [longitude, latitude];
            const endPoint = [msme.longitude, msme.latitude];
            
            const osrmUrl = `http://router.project-osrm.org/route/v1/driving/${startPoint.join(',')};${endPoint.join(',')}?geometries=geojson`;

            try {
                const response = await axios.get(osrmUrl);
                const routeCoordinates = response.data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
                setRoute(routeCoordinates);
            } catch (error) {
                console.error("Error fetching route:", error);
                alert("Could not fetch directions.");
            }
        }, () => {
            alert('Unable to retrieve your location');
        });
    };

    return (
        <div>
            {route && (
              <button 
                onClick={() => setRoute(null)} 
                style={{ position: 'absolute', top: '120px', right: '10px', zIndex: 1000, padding: '10px', cursor: 'pointer' }}
              >
                Clear Route
              </button>
            )}
            <MapContainer center={position} zoom={12} style={{ height: '80vh', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                
                {msmes.map(msme => (
                    <Marker key={msme.id} position={[msme.latitude, msme.longitude]}>
                        <Popup>
                            <b>{msme.name}</b><br />
                            Category: {msme.category}<br />
                            Address: {msme.address}<br />
                            <button onClick={() => handleGetDirections(msme)} style={{ marginTop: '10px' }}>
                                Get Directions
                            </button>
                        </Popup>
                    </Marker>
                ))}
                
                {route && <Polyline positions={route} color="blue" />}
            </MapContainer>
        </div>
    );
};

export default Map;
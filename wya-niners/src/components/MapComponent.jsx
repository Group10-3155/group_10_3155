import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from "leaflet";
import locationData from '../data/building_locations.json'
import { useEffect, useState } from 'react';
const MapComponent = () => {
  const [locations, setLocations] = useState([]);
  useEffect(() => {setLocations(locationData.buildings)},[])
  return (
    <MapContainer center={[35.308767382976846, -80.7337804153427]} zoom={17} style={{ height: '100%', width: '100%' }} maxBounds={[[-90, -180],[90, 180],]} maxBoundsViscosity={1.0} maxZoom={18} minZoom={2}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((location, i) => (
        <Marker key={i} position={[location.latitude, location.longitude]}>
          <Popup>{location.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;

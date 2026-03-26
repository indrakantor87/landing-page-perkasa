'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Component to handle map clicks and marker updates
function LocationMarker({ position, setPosition, icon }: { position: [number, number]; setPosition: (pos: [number, number]) => void; icon: L.Icon }) {
  const map = useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return (
    <Marker position={position} icon={icon} draggable={true} eventHandlers={{
      dragend: (e) => {
        const marker = e.target as L.Marker;
        const pos = marker.getLatLng();
        setPosition([pos.lat, pos.lng]);
      },
    }}>
    </Marker>
  );
}

export default function ClientMap({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) {
  const [position, setPosition] = useState<[number, number]>([-6.7490, 111.0400]);
  const onSelectRef = useRef(onLocationSelect);
  const icon = useMemo(
    () =>
      L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      }),
    []
  );

  useEffect(() => {
    onSelectRef.current = onLocationSelect;
  }, [onLocationSelect]);

  useEffect(() => {
    onSelectRef.current(position[0], position[1]);
  }, [position]);

  const handlePositionChange = (pos: [number, number]) => {
    setPosition(pos);
  };

  return (
    <div className="h-full w-full relative z-0">
      <MapContainer 
        center={position} 
        zoom={13} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker position={position} setPosition={handlePositionChange} icon={icon} />
      </MapContainer>
    </div>
  );
}

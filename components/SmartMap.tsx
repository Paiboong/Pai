
import React from 'react';
import { MapPinIcon } from './icons';

interface SmartMapProps {
  userLocation: { lat: number; lon: number } | null;
}

export const SmartMap: React.FC<SmartMapProps> = ({ userLocation }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-3xl font-bold text-dark mb-4">Smart Map</h2>
      <p className="text-gray-600 mb-6 text-center">
        This is where the interactive map will be displayed, showing real-time crowd density and points of interest.
      </p>
      <div className="w-full max-w-md h-64 bg-gray-200 rounded-md flex items-center justify-center relative overflow-hidden">
        <img src="https://picsum.photos/seed/map/800/600" alt="Map placeholder" className="w-full h-full object-cover opacity-50"/>
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 text-white p-4">
          <MapPinIcon className="h-12 w-12 text-red-500 drop-shadow-lg" />
           <p className="font-semibold mt-2">Map View Placeholder</p>
        </div>
      </div>
      {userLocation && (
        <div className="mt-6 text-center bg-light p-4 rounded-lg">
          <p className="font-semibold text-secondary">Your Current Location:</p>
          <p className="text-sm text-dark">
            Latitude: {userLocation.lat.toFixed(4)}, Longitude: {userLocation.lon.toFixed(4)}
          </p>
        </div>
      )}
    </div>
  );
};

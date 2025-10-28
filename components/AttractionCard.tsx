
import React from 'react';
import type { Attraction } from '../types';
import { StarIcon, PencilSquareIcon } from './icons';

interface AttractionCardProps {
  attraction: Attraction;
}

export const AttractionCard: React.FC<AttractionCardProps> = ({ attraction }) => {
  const crowdColor = {
    Low: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    High: 'bg-red-100 text-red-800',
  };

  const typeColor = {
    'Hidden Gem': 'border-accent text-accent',
    'Popular Spot': 'border-primary text-primary',
    'Local Eatery': 'border-blue-500 text-blue-500',
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col">
      <img src={attraction.imageUrl} alt={attraction.name} className="w-full h-40 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-dark">{attraction.name}</h3>
            <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${typeColor[attraction.type]}`}>
            {attraction.type}
            </span>
        </div>
        <p className="text-sm text-gray-600 flex-grow">{attraction.description}</p>
        <div className="mt-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${crowdColor[attraction.crowdLevel]}`}>
                Crowd: {attraction.crowdLevel}
              </span>
              <div className="flex items-center gap-1 font-bold text-accent text-xs">
                <StarIcon className="h-4 w-4" />
                <span>Earn {attraction.points} Pts</span>
              </div>
            </div>
            <div className="flex justify-between items-center border-t border-gray-100 pt-3">
               <button className="text-sm font-semibold text-primary hover:text-orange-600">
                Details →
              </button>
               <button className="text-xs font-semibold text-gray-500 hover:text-secondary flex items-center gap-1">
                <PencilSquareIcon className="h-4 w-4" />
                Add Review
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};
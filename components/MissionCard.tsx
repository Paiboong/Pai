
import React from 'react';
import type { Mission } from '../types';
import { FlagIcon, CheckCircleIcon, StarIcon } from './icons';

interface MissionCardProps {
  mission: Mission;
}

export const MissionCard: React.FC<MissionCardProps> = ({ mission }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-5 flex items-start gap-4 transition-all ${mission.isCompleted ? 'opacity-60' : ''}`}>
        <div className={`p-3 rounded-full ${mission.isCompleted ? 'bg-green-100' : 'bg-orange-100'}`}>
            {mission.isCompleted 
                ? <CheckCircleIcon className="h-6 w-6 text-green-500"/> 
                : <FlagIcon className="h-6 w-6 text-primary" />
            }
        </div>
        <div className="flex-1">
            <h3 className="text-lg font-bold text-dark">{mission.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{mission.description}</p>
             <div className="mt-2 flex items-center gap-4 text-sm">
                <p className="font-semibold text-accent">Reward: {mission.reward}</p>
                <div className="flex items-center gap-1 font-bold text-amber-500">
                    <StarIcon className="h-4 w-4" />
                    <span>{mission.points} Points</span>
                </div>
            </div>
        </div>
        {!mission.isCompleted && (
            <button className="self-center bg-secondary text-white font-bold py-2 px-4 rounded-lg hover:bg-dark transition-colors text-sm">
                View
            </button>
        )}
    </div>
  );
};
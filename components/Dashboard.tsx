
import React from 'react';
import type { Attraction, Mission } from '../types';
import { AttractionCard } from './AttractionCard';
import { MissionCard } from './MissionCard';
import { SparklesIcon, FlagIcon, UserPlusIcon, GiftIcon } from './icons';

const mockAttractions: Attraction[] = [
  { id: 1, name: 'Wat Pha Lat', type: 'Hidden Gem', description: 'A serene temple hidden in the jungle on the way to Doi Suthep.', imageUrl: 'https://picsum.photos/seed/watphalat/400/300', crowdLevel: 'Low', points: 150 },
  { id: 2, name: 'Jay Fai Street Food', type: 'Popular Spot', description: 'Michelin-starred street food in Bangkok, famous for its crab omelette.', imageUrl: 'https://picsum.photos/seed/jayfai/400/300', crowdLevel: 'High', points: 50 },
  { id: 3, name: 'Khao Soi Mae Sai', type: 'Local Eatery', description: 'Beloved by locals for its authentic and rich Khao Soi noodles.', imageUrl: 'https://picsum.photos/seed/khaosoi/400/300', crowdLevel: 'Medium', points: 120 },
  { id: 4, name: 'The Grand Palace', type: 'Popular Spot', description: 'A complex of stunning buildings in the heart of Bangkok.', imageUrl: 'https://picsum.photos/seed/grandpalace/400/300', crowdLevel: 'High', points: 50 },
];

const mockMissions: Mission[] = [
  { id: 1, title: 'Explore Old Town Phuket', description: 'Visit 3 local cafes in the historic Old Town district.', reward: 'A free coffee voucher', points: 150, isCompleted: false },
  { id: 2, title: 'Chiang Rai Temple Run', description: 'Visit the White Temple, Blue Temple, and Black House.', reward: 'Exclusive temple guide', points: 300, isCompleted: true },
];


const ReferralCard: React.FC = () => (
    <div className="bg-gradient-to-br from-secondary to-dark rounded-lg shadow-lg p-6 text-white flex flex-col items-center text-center">
        <div className="p-3 rounded-full bg-accent/20 mb-3">
            <GiftIcon className="h-8 w-8 text-accent" />
        </div>
        <h3 className="text-xl font-bold">Refer a Friend, Get Rewards!</h3>
        <p className="text-sm text-gray-300 mt-2 mb-4">Invite your friends to TripSuk. You'll both get 200 bonus points when they complete their first mission.</p>
        <button className="w-full bg-accent text-dark font-bold py-2 px-4 rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-2">
            <UserPlusIcon className="h-5 w-5" />
            Invite Friends
        </button>
    </div>
);

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-4">
            <SparklesIcon className="h-7 w-7 text-accent" />
            <h2 className="text-2xl font-bold text-dark">Recommended For You</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockAttractions.map(attraction => (
            <AttractionCard key={attraction.id} attraction={attraction} />
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
                <FlagIcon className="h-7 w-7 text-primary" />
                <h2 className="text-2xl font-bold text-dark">Your Active Missions</h2>
            </div>
            <div className="space-y-4">
              {mockMissions.map(mission => (
                <MissionCard key={mission.id} mission={mission} />
              ))}
            </div>
        </div>
        <div className="space-y-6">
            <ReferralCard />
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { LogoIcon, BellIcon, StarIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="bg-light shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LogoIcon className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-secondary">TripSuk</h1>
        </div>
        <div className="flex items-center gap-4">
           <button className="relative text-gray-500 hover:text-secondary">
              <BellIcon className="h-6 w-6" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
           </button>
           <div className="flex items-center gap-2 bg-orange-100 text-primary font-bold px-3 py-1.5 rounded-full text-sm">
              <StarIcon className="h-5 w-5" />
              <span>1,250</span>
           </div>
           <img src="https://picsum.photos/id/237/40/40" alt="User Avatar" className="h-10 w-10 rounded-full border-2 border-primary" />
        </div>
      </div>
    </header>
  );
};
import React from 'react';
import type { View } from '../types';
import { DashboardIcon, PlannerIcon, MapIcon, BusinessIcon } from './icons';

interface FooterProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

export const Footer: React.FC<FooterProps> = ({ currentView, setCurrentView }) => {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: DashboardIcon },
    { id: 'planner', label: 'AI Planner', icon: PlannerIcon },
    { id: 'map', label: 'Smart Map', icon: MapIcon },
    { id: 'business', label: 'Business', icon: BusinessIcon },
  ] as const;

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-50">
      <div className="container mx-auto px-4 h-20 flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`flex flex-col items-center justify-center w-24 transition-all duration-300 ease-in-out transform ${isActive ? 'text-primary scale-110' : 'text-gray-500 hover:text-secondary'}`}
            >
              <Icon className="h-7 w-7 mb-1" />
              <span className={`text-xs font-semibold ${isActive ? 'font-bold' : ''}`}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </footer>
  );
};
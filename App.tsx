import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Dashboard } from './components/Dashboard';
import { TripPlanner } from './components/TripPlanner';
import { SmartMap } from './components/SmartMap';
import { AIChatbot } from './components/AIChatbot';
import { BusinessDashboard } from './components/BusinessDashboard';
import type { View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        console.log('Location access granted.');
      },
      (error) => {
        console.error("Error getting user location:", error);
        // Fallback location (Bangkok) if permission is denied
        setUserLocation({ lat: 13.7563, lon: 100.5018 });
      }
    );
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'planner':
        return <TripPlanner userLocation={userLocation} />;
      case 'map':
        return <SmartMap userLocation={userLocation} />;
      case 'business':
        return <BusinessDashboard />;
      case 'dashboard':
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="bg-light min-h-screen font-sans flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6 mb-20">
        {renderView()}
      </main>
      <AIChatbot />
      <Footer currentView={currentView} setCurrentView={setCurrentView} />
    </div>
  );
};

export default App;

import React, { useState } from 'react';
import { generateTripPlan } from '../services/geminiService';
import type { TripPlan } from '../types';
import { CalendarIcon, CurrencyDollarIcon, SparklesIcon, MapPinIcon } from './icons';

interface TripPlannerProps {
  userLocation: { lat: number; lon: number } | null;
}

export const TripPlanner: React.FC<TripPlannerProps> = ({ userLocation }) => {
  const [preferences, setPreferences] = useState<string[]>([]);
  const [duration, setDuration] = useState<number>(5);
  const [budget, setBudget] = useState<string>('Mid-range');
  const [plan, setPlan] = useState<TripPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePreferenceChange = (pref: string) => {
    setPreferences(prev =>
      prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]
    );
  };

  const buildPrompt = () => {
    let prompt = `Create a personalized travel itinerary for a trip in Thailand.
    - Duration: ${duration} days.
    - Budget: ${budget}.
    - Interests: ${preferences.length > 0 ? preferences.join(', ') : 'a mix of everything'}.
    - Key instruction: The itinerary MUST include a mix of popular tourist spots and lesser-known, underrated local gems (like local markets, quiet temples, unique cafes, etc.). The goal is to help tourists discover authentic experiences and support smaller businesses.
    - Structure: Provide a day-by-day plan. For each day, suggest activities for the morning, afternoon, and evening, including dining options at local restaurants.
    - Location context: The user is currently around latitude ${userLocation?.lat} and longitude ${userLocation?.lon}. Use this as a potential starting point, but feel free to suggest itineraries in any part of Thailand that fits the preferences.
    Please return the response in the specified JSON format.`;
    return prompt;
  };

  const handleGeneratePlan = async () => {
    if (duration <= 0) {
      setError("Please enter a valid trip duration.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setPlan(null);

    const prompt = buildPrompt();
    const result = await generateTripPlan(prompt);

    if (result) {
      setPlan(result);
    } else {
      setError("Sorry, we couldn't create a plan for you at this moment. Please try again.");
    }

    setIsLoading(false);
  };

  const preferenceOptions = ['Culture', 'Food', 'Adventure', 'Nature', 'Relaxation'];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-dark text-center mb-2">AI Trip Planner</h2>
      <p className="text-center text-gray-600 mb-8">Let our AI craft your perfect Thai adventure, blending famous sights with hidden treasures.</p>

      {!plan && (
        <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
          {/* Form Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Trip Duration (days)</label>
              <div className="relative">
                <CalendarIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"/>
                <input
                  type="number"
                  value={duration}
                  onChange={e => setDuration(parseInt(e.target.value, 10))}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  min="1"
                  max="30"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
              <div className="relative">
                <CurrencyDollarIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"/>
                <select
                  value={budget}
                  onChange={e => setBudget(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary appearance-none"
                >
                  <option>Budget</option>
                  <option>Mid-range</option>
                  <option>Luxury</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Interests</label>
            <div className="flex flex-wrap gap-2">
              {preferenceOptions.map(pref => (
                <button
                  key={pref}
                  onClick={() => handlePreferenceChange(pref)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    preferences.includes(pref)
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {pref}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGeneratePlan}
            disabled={isLoading}
            className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Crafting Your Adventure...
              </>
            ) : (
                <>
                <SparklesIcon className="h-5 w-5" />
                Generate My Trip
                </>
            )}
          </button>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </div>
      )}

      {plan && (
        <div className="bg-white p-6 rounded-lg shadow-lg mt-8 animate-fade-in">
          <h3 className="text-2xl font-bold text-dark text-center">{plan.tripTitle}</h3>
          <div className="text-center text-gray-500 my-2 flex justify-center gap-4">
              <span>{plan.duration}</span> &bull; <span>{plan.budget}</span>
          </div>

          <div className="mt-6 space-y-6">
            {plan.dailyItinerary.map(day => (
              <div key={day.day} className="border-l-4 border-accent pl-4">
                <h4 className="text-xl font-bold text-secondary">Day {day.day}: {day.title}</h4>
                <div className="mt-2 space-y-3">
                  {day.activities.map((activity, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="font-semibold text-gray-600 w-20 shrink-0">{activity.time}</div>
                      <div className="text-gray-700">{activity.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button onClick={() => setPlan(null)} className="mt-8 w-full bg-secondary text-white font-bold py-3 px-4 rounded-lg hover:bg-dark transition-colors">
            Create a New Plan
          </button>
        </div>
      )}
    </div>
  );
};

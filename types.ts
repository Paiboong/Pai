export type View = 'dashboard' | 'planner' | 'map' | 'business';

export interface Attraction {
  id: number;
  name: string;
  type: 'Hidden Gem' | 'Popular Spot' | 'Local Eatery';
  description: string;
  imageUrl: string;
  crowdLevel: 'Low' | 'Medium' | 'High';
  points: number;
}

export interface Mission {
  id: number;
  title: string;
  description: string;
  reward: string;
  points: number;
  isCompleted: boolean;
}

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}

export interface ItineraryDay {
    day: number;
    title:string;
    activities: {
        time: string;
        description: string;
        type: 'Dining' | 'Activity' | 'Accommodation' | 'Travel';
    }[];
}

export interface TripPlan {
    tripTitle: string;
    duration: string;
    budget: string;
    dailyItinerary: ItineraryDay[];
}
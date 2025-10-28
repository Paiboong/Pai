
import { GoogleGenAI, Type, GenerateContentResponse, Chat } from "@google/genai";
import type { ChatMessage, TripPlan } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const tripPlanSchema = {
    type: Type.OBJECT,
    properties: {
        tripTitle: {
            type: Type.STRING,
            description: "A creative and catchy title for the trip plan. e.g., 'Chiang Mai's Cultural Charms & Hidden Eats'."
        },
        duration: {
            type: Type.STRING,
            description: "The total duration of the trip as requested by the user. e.g., '5 Days'"
        },
        budget: {
            type: Type.STRING,
            description: "The budget category for the trip. e.g., 'Mid-range'"
        },
        dailyItinerary: {
            type: Type.ARRAY,
            description: "An array of daily plans.",
            items: {
                type: Type.OBJECT,
                properties: {
                    day: { type: Type.INTEGER, description: "The day number, starting from 1." },
                    title: { type: Type.STRING, description: "A short, engaging title for the day's theme. e.g., 'Temple Hopping & Riverside Dining'." },
                    activities: {
                        type: Type.ARRAY,
                        description: "A list of activities for the day.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                time: { type: Type.STRING, description: "Suggested time for the activity. e.g., '09:00 AM' or 'Evening'." },
                                description: { type: Type.STRING, description: "A detailed description of the activity, including the name of the place and what to do." },
                                type: { type: Type.STRING, description: "The type of activity. Options: 'Dining', 'Activity', 'Accommodation', 'Travel'." }
                            },
                            required: ["time", "description", "type"]
                        }
                    }
                },
                required: ["day", "title", "activities"]
            }
        }
    },
    required: ["tripTitle", "duration", "budget", "dailyItinerary"]
};


export const generateTripPlan = async (prompt: string): Promise<TripPlan | null> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: tripPlanSchema
        }
    });
    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as TripPlan;
  } catch (error) {
    console.error("Error generating trip plan:", error);
    return null;
  }
};


let chat: Chat | null = null;
const initializeChat = () => {
    if (!chat) {
        chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: `You are "Sukjai", a friendly and helpful AI travel assistant for the TripSuk app in Thailand. Your goal is to help tourists with their questions about travel in Thailand. Be concise, friendly, and focus on providing useful, actionable information. If you don't know an answer, say so. You can also give tips about using the app.`,
            }
        });
    }
};


export const getChatbotResponse = async (history: ChatMessage[], message: string): Promise<string> => {
    initializeChat();
    if (!chat) {
        return "Chat could not be initialized.";
    }

    try {
        // Note: The current @google/genai chat doesn't directly take history in each call, it maintains it internally.
        // For a stateless implementation, you'd build the history into the prompt each time.
        // Here we rely on the stateful `chat` object.
        const response: GenerateContentResponse = await chat.sendMessage({ message });
        return response.text;
    } catch (error) {
        console.error("Error getting chatbot response:", error);
        return "I'm sorry, I'm having a little trouble right now. Please try again later.";
    }
};

import { GoogleGenAI } from "@google/genai";
import { Artwork } from '../types';
import { MOCK_ARTWORKS } from '../constants';

// Initialize Gemini
// Note: In a real production app, this should be proxied through a backend to protect the key.
// The prompt instructions explicitly say to use process.env.API_KEY directly here.
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

export const getArtRecommendation = async (userQuery: string): Promise<string> => {
  if (!apiKey) {
    return "AI Service Unavailable: API Key missing.";
  }

  try {
    const context = `You are a sophisticated art curator for 'Muraqqa', a high-end gallery specializing in Pakistani art. 
    You have the following artworks in your catalog: ${MOCK_ARTWORKS.map(a => `${a.title} by ${a.artistName} (${a.category})`).join(', ')}.
    
    The user is asking: "${userQuery}".
    
    Provide a brief, elegant recommendation. Suggest one of our artworks if it fits, or discuss Pakistani art history relevant to their query. Keep the tone ambient, sophisticated, and warm.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: context,
      config: {
        systemInstruction: "You are an expert art curator.",
        temperature: 0.7,
      }
    });

    return response.text || "I apologize, I am unable to curate a response at this moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I am currently meditating on the artwork. Please ask again in a moment.";
  }
};

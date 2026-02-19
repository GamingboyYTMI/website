
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_INSTRUCTION = `
You are "Hoora Assistant", the AI detailing consultant for Hoora Ranchi. 
Hoora is a premium on-demand car and bike wash service operating exclusively in Ranchi, Jharkhand.

Vibe: Energetic, modern, tech-savvy, professional, and very helpful. 
Location: Only Ranchi. Mention localities like Lalpur, Kanke Road, Argora, Doranda, or Bariatu if appropriate.
Currency: Quote all prices in INR (₹).

Hoora Service Packages (Doorstep Ranchi):
- Express Shine: Eco exterior wash + vacuum (₹299 Bikes / ₹599 Cars).
- Premium Deep Clean: Exterior + Interior Detailing + Polish (₹699 Bikes / ₹1499 Cars).
- Ultimate Ceramic Shield: Full restoration + Ceramic Coating protection (₹4999+).

Guidelines:
1. Promote the "Eco-friendly" and "Waterless" aspects of the wash.
2. Emphasize that we save the customer's time by coming to their home/office.
3. If users ask about tough stains or monsoon mud, suggest the Premium Deep Clean.
4. If they ask about long-term shine for a new car, suggest the Ultimate package.
5. Be concise. Use emojis for a modern feel. ✨🚗🏍️
`;

export const getGeminiResponse = async (history: ChatMessage[]) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: history.map(h => ({
        role: h.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: h.content }]
      })),
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I'm having a small engine trouble. How can I help with your car wash in Ranchi?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Our detailing pro is currently working on a muddy bike in Argora! Please try again in a second! ✨";
  }
};

import { GoogleGenAI } from "@google/genai";
import { resumeSchema } from './schemas';
import dotenv from 'dotenv';

dotenv.config();

// FIX: Per coding guidelines, API key must be from process.env.API_KEY
const apiKey = process.env.API_KEY;
if (!apiKey) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey });

export async function processResumeWithGemini(resumeText: string) {
    const prompt = `Analyze the resume text provided. Extract the user's information into the 'parsedData' object. Provide actionable suggestions for improvement in the 'suggestions' array. Identify any key missing information in the 'missingInfo' array. Be as accurate as possible with the parsing. If the document is not a resume, state that in the suggestions and leave parsedData empty.

Resume Text:
---
${resumeText}
---`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: { responseMimeType: "application/json", responseSchema: resumeSchema }
        });

        let jsonText = response.text.trim();
        
        // Clean the response if it's wrapped in markdown
        if (jsonText.startsWith('```json')) {
            jsonText = jsonText.slice(7, -3).trim();
        } else if (jsonText.startsWith('```')) {
            jsonText = jsonText.slice(3, -3).trim();
        }
        
        return JSON.parse(jsonText);
    } catch (error: any) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get a valid response from the AI service.");
    }
}

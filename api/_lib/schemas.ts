import { Type } from "@google/genai";

// FIX: Removed non-standard 'nullable: true' property from schema properties.
export const resumeSchema = {
    type: Type.OBJECT,
    properties: {
        suggestions: { 
            type: Type.ARRAY, 
            description: "Actionable suggestions to improve the resume. Focus on quantifiable achievements, action verbs, and clarity.", 
            items: { type: Type.STRING } 
        },
        missingInfo: { 
            type: Type.ARRAY, 
            description: "Key information missing from the resume, such as a portfolio link, specific skills, or contact details.", 
            items: { type: Type.STRING } 
        },
        parsedData: {
            type: Type.OBJECT, 
            description: "The parsed resume content. Fields should be null if not found.",
            properties: {
                name: { type: Type.STRING }, 
                jobTitle: { type: Type.STRING }, 
                email: { type: Type.STRING }, 
                phone: { type: Type.STRING }, 
                location: { type: Type.STRING }, 
                linkedin: { type: Type.STRING }, 
                portfolio: { type: Type.STRING }, 
                summary: { type: Type.STRING },
                skills: { type: Type.ARRAY, items: { type: Type.STRING } },
                experiences: { 
                    type: Type.ARRAY, 
                    items: { 
                        type: Type.OBJECT, 
                        properties: { 
                            title: { type: Type.STRING }, 
                            company: { type: Type.STRING }, 
                            location: { type: Type.STRING }, 
                            startDate: { type: Type.STRING }, 
                            endDate: { type: Type.STRING }, 
                            description: { type: Type.ARRAY, items: { type: Type.STRING } } 
                        } 
                    }
                },
                educations: { 
                    type: Type.ARRAY, 
                    items: { 
                        type: Type.OBJECT, 
                        properties: { 
                            institution: { type: Type.STRING }, 
                            degree: { type: Type.STRING }, 
                            location: { type: Type.STRING }, 
                            startDate: { type: Type.STRING }, 
                            endDate: { type: Type.STRING } 
                        } 
                    }
                },
                projects: { 
                    type: Type.ARRAY, 
                    items: { 
                        type: Type.OBJECT, 
                        properties: { 
                            name: { type: Type.STRING }, 
                            description: { type: Type.STRING }, 
                            technologies: { type: Type.ARRAY, items: { type: Type.STRING } }, 
                            link: { type: Type.STRING } 
                        } 
                    }
                }
            }
        }
    }
};

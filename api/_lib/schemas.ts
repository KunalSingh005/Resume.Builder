import { Type } from "@google/genai";

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
                name: { type: Type.STRING, nullable: true }, 
                jobTitle: { type: Type.STRING, nullable: true }, 
                email: { type: Type.STRING, nullable: true }, 
                phone: { type: Type.STRING, nullable: true }, 
                location: { type: Type.STRING, nullable: true }, 
                linkedin: { type: Type.STRING, nullable: true }, 
                portfolio: { type: Type.STRING, nullable: true }, 
                summary: { type: Type.STRING, nullable: true },
                skills: { type: Type.ARRAY, items: { type: Type.STRING }, nullable: true },
                experiences: { 
                    type: Type.ARRAY, 
                    items: { 
                        type: Type.OBJECT, 
                        properties: { 
                            title: { type: Type.STRING, nullable: true }, 
                            company: { type: Type.STRING, nullable: true }, 
                            location: { type: Type.STRING, nullable: true }, 
                            startDate: { type: Type.STRING, nullable: true }, 
                            endDate: { type: Type.STRING, nullable: true }, 
                            description: { type: Type.ARRAY, items: { type: Type.STRING }, nullable: true } 
                        } 
                    },
                    nullable: true 
                },
                educations: { 
                    type: Type.ARRAY, 
                    items: { 
                        type: Type.OBJECT, 
                        properties: { 
                            institution: { type: Type.STRING, nullable: true }, 
                            degree: { type: Type.STRING, nullable: true }, 
                            location: { type: Type.STRING, nullable: true }, 
                            startDate: { type: Type.STRING, nullable: true }, 
                            endDate: { type: Type.STRING, nullable: true } 
                        } 
                    },
                    nullable: true 
                },
                projects: { 
                    type: Type.ARRAY, 
                    items: { 
                        type: Type.OBJECT, 
                        properties: { 
                            name: { type: Type.STRING, nullable: true }, 
                            description: { type: Type.STRING, nullable: true }, 
                            technologies: { type: Type.ARRAY, items: { type: Type.STRING }, nullable: true }, 
                            link: { type: Type.STRING, nullable: true } 
                        } 
                    },
                    nullable: true
                }
            }
        }
    }
};

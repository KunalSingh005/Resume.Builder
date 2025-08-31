import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { extractText } from './_lib/textExtractor';
import { processResumeWithGemini } from './_lib/gemini';

// Disable Vercel's default body parser to use multer
export const config = {
  api: {
    bodyParser: false,
  },
};

const app = express();
app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ 
    storage,
    fileFilter: (req, file, cb) => {
        const allowedMimes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword', 'text/plain', 'application/rtf'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only PDF, DOC, DOCX, TXT, and RTF are allowed.'));
        }
    }
});

// Fix: Use 'any' for req and res types to resolve type conflicts between Express, Multer, and Vercel.
app.post('/api/analyze-resume', upload.single('resume'), async (req: any, res: any) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded.' });
    }

    try {
        const text = await extractText(req.file);
        if (!text) {
             return res.status(400).json({ success: false, message: 'Could not extract text from the file. It might be empty or corrupted.' });
        }

        const analysisResult = await processResumeWithGemini(text);
        
        return res.status(200).json({ success: true, data: analysisResult });

    } catch (error: any) {
        console.error('Error processing resume:', error);
        // Distinguish between different error types if possible
        if (error.message.includes('GEMINI_API_KEY')) {
             return res.status(500).json({ success: false, message: 'Server configuration error: Gemini API key is not set.' });
        }
        if (error.message.includes('Invalid file type')) {
            return res.status(400).json({ success: false, message: error.message });
        }
        return res.status(500).json({ success: false, message: 'An unexpected error occurred on the server.' });
    }
});

// Vercel exports the handler
// Fix: Cast req and res to 'any' to make them compatible with the Express app handler.
export default (req: VercelRequest, res: VercelResponse) => {
    return app(req as any, res as any);
};

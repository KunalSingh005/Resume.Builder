import pdf from 'pdf-parse';
import mammoth from 'mammoth';
import textract from 'textract';
import { promisify } from 'util';

const textractFromBuffer = promisify(textract.fromBufferWithMime);

export async function extractText(file: Express.Multer.File): Promise<string> {
    const { buffer, mimetype } = file;

    try {
        switch (mimetype) {
            case 'application/pdf':
                const data = await pdf(buffer);
                return data.text;

            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                const docxResult = await mammoth.extractRawText({ buffer });
                return docxResult.value;

            case 'application/msword': // .doc
            case 'application/rtf': // .rtf
                return await textractFromBuffer(mimetype, buffer, { preserveLineBreaks: true });

            case 'text/plain':
                return buffer.toString('utf8');

            default:
                // As a fallback for other text-based formats, try textract
                if (mimetype.startsWith('text/')) {
                    return buffer.toString('utf8');
                }
                 // Attempt textract for unknown mimetypes as a last resort
                try {
                    return await textractFromBuffer(mimetype, buffer);
                } catch (textractErr) {
                    console.error(`Fallback textract failed for ${mimetype}:`, textractErr);
                    throw new Error(`Unsupported file type: ${mimetype}`);
                }
        }
    } catch (error: any) {
        console.error(`Failed to extract text from ${file.originalname} (type: ${mimetype}):`, error);
        throw new Error(`Error processing file. It may be corrupted or in an unsupported format.`);
    }
}

import { GoogleGenAI, Modality } from "@google/genai";
import type { GeminiResponse } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

// Helper to resize image to prevent overly large payloads
const resizeImage = (base64Str: string, maxWidth: number, maxHeight: number): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = base64Str;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;
  
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }
  
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return reject(new Error('Could not get canvas context'));
        }
        ctx.drawImage(img, 0, 0, width, height);
        // Use JPEG for smaller file size, which is better for API calls
        resolve(canvas.toDataURL('image/jpeg', 0.9)); 
      };
      img.onerror = (error) => {
        console.error("Image loading failed for resizing:", error);
        reject(new Error(`Image loading failed`));
      };
    });
};

const fileToGenerativePart = (base64DataUrl: string) => {
  const match = base64DataUrl.match(/^data:(.*);base64,(.*)$/);
  if (!match) {
    throw new Error("Invalid base64 data URL format");
  }
  const mimeType = match[1];
  const data = match[2];

  return {
    inlineData: {
      mimeType,
      data,
    },
  };
};

const MAX_RETRIES = 3;
const INITIAL_DELAY_MS = 1000;

/**
 * Executes an async function with a retry mechanism.
 * @param apiCall The async function to execute.
 * @returns The result of the successful API call.
 */
async function executeWithRetry<T>(apiCall: () => Promise<T>): Promise<T> {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await apiCall();
    } catch (error) {
      const isLastAttempt = attempt === MAX_RETRIES;
      
      const isRetryableError = error instanceof Error && (
        error.message.includes('500') ||
        error.message.toLowerCase().includes('xhr error') ||
        error.message.toLowerCase().includes('rpc failed') ||
        error.message.toLowerCase().includes('network error') ||
        error.message.toLowerCase().includes('unavailable')
      );

      if (isRetryableError && !isLastAttempt) {
        const delay = INITIAL_DELAY_MS * Math.pow(2, attempt - 1);
        console.warn(`API call failed (attempt ${attempt}/${MAX_RETRIES}). Retrying in ${delay}ms...`, error);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        // For non-retryable errors or the final attempt, re-throw the error.
        throw error;
      }
    }
  }
  // This line is technically unreachable due to the throw in the loop but satisfies TypeScript.
  throw new Error('API call failed after all retries.');
}


export async function editImageWithGemini(
  base64Image: string,
  prompt: string
): Promise<GeminiResponse> {
  try {
    return await executeWithRetry(async () => {
      const resizedImage = await resizeImage(base64Image, 1024, 1024);
      
      const imagePart = fileToGenerativePart(resizedImage);
      const textPart = { text: prompt };

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image-preview',
        contents: {
          parts: [imagePart, textPart],
        },
        config: {
          responseModalities: [Modality.IMAGE, Modality.TEXT],
        },
      });
      
      if (!response.candidates || response.candidates.length === 0) {
        if (response.promptFeedback?.blockReason) {
          throw new Error(`Request was blocked due to: ${response.promptFeedback.blockReason}. Please adjust your prompt.`);
        }
        throw new Error("API returned no content. This might be due to a safety policy violation or an issue with the prompt.");
      }
      
      let imageUrl: string | null = null;
      let text: string | null = null;

      if (response.candidates[0].content && response.candidates[0].content.parts) {
          for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
              const { mimeType, data } = part.inlineData;
              imageUrl = `data:${mimeType};base64,${data}`;
            } else if (part.text) {
              text = part.text;
            }
          }
      }
      
      if (!imageUrl) {
          const finishReason = response.candidates[0]?.finishReason;
          const safetyFinishReasons = ['SAFETY', 'RECITATION', 'PROHIBITED_CONTENT'];

          if (finishReason && safetyFinishReasons.includes(finishReason)) {
               throw new Error("Generation stopped due to safety or content policies. The model could not produce an image for this prompt. Please try a different style or a more general prompt.");
          }

          throw new Error(`API did not return an image (Finish reason: ${finishReason || 'Unknown'}). This can happen if the prompt is too complex or another issue occurred.`);
      }

      return { imageUrl, text };
    });
  } catch (error) {
    console.error("Error calling Gemini API for image editing:", error);
    if (error instanceof Error) {
        throw error;
    }
    throw new Error("An unexpected error occurred while processing the image.");
  }
}

export async function generateImageWithImagen(
  prompt: string
): Promise<GeminiResponse> {
  try {
    return await executeWithRetry(async () => {
      const response = await ai.models.generateImages({
          model: 'imagen-4.0-generate-001',
          prompt: prompt,
          config: {
            numberOfImages: 1,
            outputMimeType: 'image/png',
            aspectRatio: '1:1',
          },
      });
      
      // FIX: Property 'promptFeedback' does not exist on type 'GenerateImagesResponse'.
      // The error handling for `generateImages` must be different from `generateContent` as
      // it does not provide a top-level `promptFeedback` object.
      if (!response.generatedImages || response.generatedImages.length === 0) {
          throw new Error("API returned no images. This could be due to safety policies or an invalid prompt.");
      }

      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      const imageUrl = `data:image/png;base64,${base64ImageBytes}`;

      return { imageUrl, text: null };
    });
  } catch (error) {
    console.error("Error calling Imagen API for image generation:", error);
     if (error instanceof Error) {
        throw error;
    }
    throw new Error("An unexpected error occurred while generating the image.");
  }
}
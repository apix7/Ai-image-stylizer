import { useState, useEffect, useCallback } from 'react';
import type { HistoryItem, GalleryItem, GeminiResponse } from '../types';

const HISTORY_KEY = 'ai_stylizer_history';
const MAX_HISTORY_ITEMS = 12;

type NewHistoryData = Omit<HistoryItem, 'id' | 'timestamp'>;

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
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      };
      img.onerror = (error) => {
        reject(new Error(`Image loading failed: ${error}`));
      };
    });
  };

export const useHistory = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem(HISTORY_KEY);
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error("Failed to load history from localStorage:", error);
      setHistory([]);
    }
  }, []);

  const saveHistory = (newHistory: HistoryItem[]) => {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
      setHistory(newHistory);
    } catch (error) {
      console.error("Failed to save history to localStorage:", error);
    }
  };

  const addHistoryItem = useCallback(async (itemData: NewHistoryData) => {
    if (!itemData.generatedContent.imageUrl) return;

    try {
        const originalImagePromise = itemData.originalImage
          ? resizeImage(itemData.originalImage, 400, 400)
          : Promise.resolve(null);
        
        const generatedImagePromise = resizeImage(itemData.generatedContent.imageUrl, 400, 400);

        const [originalImageThumbnail, generatedImageThumbnail] = await Promise.all([
            originalImagePromise,
            generatedImagePromise
        ]);

        const newItem: HistoryItem = {
          ...itemData,
          id: Date.now().toString(),
          timestamp: Date.now(),
          originalImage: originalImageThumbnail,
          generatedContent: {
            ...itemData.generatedContent,
            imageUrl: generatedImageThumbnail,
          },
        };

        setHistory(prevHistory => {
          const updatedHistory = [newItem, ...prevHistory].slice(0, MAX_HISTORY_ITEMS);
          saveHistory(updatedHistory);
          return updatedHistory;
        });
    } catch (error) {
        console.error("Could not add item to history due to image processing error:", error);
    }
  }, []);

  const clearHistory = useCallback(() => {
    saveHistory([]);
  }, []);

  return { history, addHistoryItem, clearHistory };
};
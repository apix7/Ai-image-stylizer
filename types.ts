export interface GalleryItem {
  id: number;
  imageUrl: string;
  prompt: string;
  name: string;
  category: string;
}

export interface GeminiResponse {
  imageUrl: string | null;
  text: string | null;
}

export interface HistoryItem {
  id: string;
  originalImage: string | null;
  generatedContent: GeminiResponse;
  style: GalleryItem;
  timestamp: number;
}
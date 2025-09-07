import React from 'react';
import type { GeminiResponse, GalleryItem } from '../types';

interface GeneratedImageDisplayProps {
  originalImage: string | null;
  generatedContent: GeminiResponse | null;
  selectedStyle: GalleryItem;
}

const GeneratedImageDisplay: React.FC<GeneratedImageDisplayProps> = ({ originalImage, generatedContent, selectedStyle }) => {
  // Case 1: Displaying a generated image without an original (text-to-image)
  if (!originalImage && generatedContent?.imageUrl) {
    return (
      <div className="flex flex-col items-center w-full h-full justify-center p-4">
        <div className="flex flex-col items-center relative animate-zoom-in w-full h-full">
          <h3 className="text-lg font-semibold mb-3 text-cyan-300">
            {selectedStyle.name || 'Generated Image'}
          </h3>
          <div className="relative group w-full h-full min-h-[200px] bg-gray-800 rounded-xl overflow-hidden shadow-lg">
            <img src={generatedContent.imageUrl} alt="Generated" className="w-full h-full object-contain" />
          </div>
        </div>
         {generatedContent?.text && (
            <div className="mt-4 w-full max-w-4xl p-4 bg-gray-800/50 rounded-lg border border-gray-700 animate-fade-in">
                <h4 className="font-semibold text-cyan-400">AI Note:</h4>
                <p className="text-gray-300 italic">{generatedContent.text}</p>
            </div>
        )}
      </div>
    );
  }

  // Case 2: Displaying original and generated (image-to-image) or just original
  return (
    <div className="flex flex-col items-center w-full h-full justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 w-full h-full p-4">
            <div className="flex flex-col items-center animate-zoom-in">
                <h3 className="text-lg font-semibold mb-3 text-gray-300">Original</h3>
                <div className="relative group w-full h-full min-h-[200px] bg-gray-800 rounded-xl overflow-hidden shadow-lg">
                    <img src={originalImage!} alt="Original" className="w-full h-full object-contain" />
                </div>
            </div>
            <div className="flex flex-col items-center relative animate-zoom-in" style={{ animationDelay: '0.2s'}}>
                <h3 className="text-lg font-semibold mb-3 text-cyan-300">
                  {generatedContent?.imageUrl ? `Stylized (${selectedStyle.name})` : 'Stylized'}
                </h3>
                 {generatedContent?.imageUrl ? (
                    <div className="relative group w-full h-full min-h-[200px] bg-gray-800 rounded-xl overflow-hidden shadow-lg">
                      <img src={generatedContent.imageUrl} alt="Generated" className="w-full h-full object-contain" />
                    </div>
                ) : (
                    <div className="w-full h-full min-h-[200px] flex items-center justify-center bg-gray-800/50 border-2 border-dashed border-gray-600 rounded-xl shadow-lg">
                        <p className="text-gray-400 text-center p-4">Your generated image will appear here.</p>
                    </div>
                )}
            </div>
        </div>
        {generatedContent?.text && (
            <div className="mt-4 w-full max-w-4xl p-4 bg-gray-800/50 rounded-lg border border-gray-700 animate-fade-in" style={{ animationDelay: '0.4s'}}>
                <h4 className="font-semibold text-cyan-400">AI Note:</h4>
                <p className="text-gray-300 italic">{generatedContent.text}</p>
            </div>
        )}
    </div>
  );
};

export default GeneratedImageDisplay;
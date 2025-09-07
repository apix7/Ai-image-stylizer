import React, { useState, useEffect } from 'react';

const LOADING_MESSAGES = [
  'Consulting the digital muses...',
  'Painting with pixels...',
  'Brewing creativity...',
  'Adding a touch of magic...',
  'Warming up the AI brushes...',
  'Generating artistic flair...',
];

interface LoadingDisplayProps {
  originalImage: string | null;
}

const LoadingDisplay: React.FC<LoadingDisplayProps> = ({ originalImage }) => {
  const [message, setMessage] = useState(LOADING_MESSAGES[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMessage(prevMessage => {
        const currentIndex = LOADING_MESSAGES.indexOf(prevMessage);
        const nextIndex = (currentIndex + 1) % LOADING_MESSAGES.length;
        return LOADING_MESSAGES[nextIndex];
      });
    }, 2500);

    return () => clearInterval(intervalId);
  }, []);

  const title = originalImage ? 'Stylizing Your Image...' : 'Generating Your Image...';

  return (
    <div className="mt-12 flex flex-col items-center animate-fade-in w-full max-w-4xl">
      <h2 className="text-3xl font-bold text-center text-cyan-400 mb-8">{title}</h2>
      {originalImage ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-3 text-gray-300">Original</h3>
            <div className="w-full aspect-square bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <img src={originalImage} alt="Original" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-3 text-cyan-300">Generating...</h3>
            <div className="w-full aspect-square bg-gray-800 rounded-xl shadow-lg flex items-center justify-center overflow-hidden relative">
               <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-cyan-900/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
               <p className="z-10 text-gray-500 text-lg font-semibold">Creating Art...</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center w-full max-w-md">
            <h3 className="text-xl font-semibold mb-3 text-cyan-300">Generating...</h3>
            <div className="w-full aspect-square bg-gray-800 rounded-xl shadow-lg flex items-center justify-center overflow-hidden relative">
               <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-cyan-900/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
               <p className="z-10 text-gray-500 text-lg font-semibold">Creating Art...</p>
            </div>
        </div>
      )}
      <p className="text-gray-400 mt-8 text-lg text-center h-6 transition-opacity duration-500">{message}</p>
    </div>
  );
};

export default LoadingDisplay;
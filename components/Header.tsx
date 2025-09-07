import React from 'react';

interface HeaderProps {
  onHistoryClick: () => void;
  historyCount: number;
}

const Header: React.FC<HeaderProps> = ({ onHistoryClick, historyCount }) => {
  return (
    <header className="bg-gray-900/30 backdrop-blur-sm sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm3.5 13.5l-3-3-3 3-1.5-1.5 3-3-3-3 1.5-1.5 3 3 3-3 1.5 1.5-3 3 3 3-1.5 1.5z"/>
                 </svg>
                <h1 className="text-2xl font-bold text-white tracking-tight">AI Image Stylizer</h1>
            </div>
            <button
                onClick={onHistoryClick}
                className="relative flex items-center gap-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-white font-semibold rounded-lg transition-colors duration-300"
                aria-label={`View creation history, ${historyCount} items`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.5-11.5a.5.5 0 00-1 0v5.793l-2.146 2.147a.5.5 0 00.708.708L10 12.207V6.5z" clipRule="evenodd" />
                </svg>
                <span>History</span>
                {historyCount > 0 && (
                    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500 text-xs font-bold text-white">
                        {historyCount}
                    </span>
                )}
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
import React from 'react';
import type { HistoryItem } from '../types';

interface HistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onClear: () => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ isOpen, onClose, history, onSelect, onClear }) => {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 z-20 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      {/* Panel */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-gray-900/90 backdrop-blur-lg shadow-2xl z-30 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="history-panel-title"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
            <h2 id="history-panel-title" className="text-xl font-bold text-cyan-400">Creation History</h2>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-700 transition-colors" aria-label="Close history panel">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {history.length > 0 ? (
            <>
              <div className="flex-grow p-4 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-2 gap-4">
                  {history.map(item => (
                    <div
                      key={item.id}
                      className="relative rounded-lg overflow-hidden group cursor-pointer transform transition-transform hover:scale-105"
                      onClick={() => onSelect(item)}
                    >
                      <img
                        src={item.generatedContent.imageUrl ?? ''}
                        alt={`Stylized as ${item.style.name}`}
                        className="w-full h-full object-cover aspect-square"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                      <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-white text-sm font-semibold truncate">{item.style.name}</p>
                        <p className="text-gray-400 text-xs">{new Date(item.timestamp).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 border-t border-gray-700/50">
                <button
                  onClick={onClear}
                  className="w-full px-4 py-2 bg-red-600/80 text-white font-semibold rounded-lg hover:bg-red-500/80 transition-colors"
                >
                  Clear History
                </button>
              </div>
            </>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-300">No creations yet</h3>
              <p className="text-gray-500 mt-1">Your stylized images will appear here after you create them.</p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default HistoryPanel;

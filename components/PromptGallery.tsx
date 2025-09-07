import React, { useState, useMemo } from 'react';
import { GALLERY_ITEMS } from '../constants';
import type { GalleryItem } from '../types';

interface PromptGalleryProps {
  onStyleSelect: (item: GalleryItem) => void;
  selectedStyle: GalleryItem | null;
}

const PromptGallery: React.FC<PromptGalleryProps> = ({ onStyleSelect, selectedStyle }) => {
  const categories = useMemo(() => ['All', ...Array.from(new Set(GALLERY_ITEMS.map(item => item.category)))], []);
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') {
      return GALLERY_ITEMS;
    }
    return GALLERY_ITEMS.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Category Filters */}
      <div className="flex-shrink-0">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar -mx-1 px-1">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-1 text-sm font-medium rounded-full transition-colors duration-200 whitespace-nowrap ${
                activeCategory === category
                  ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
                  : 'bg-gray-700/50 hover:bg-gray-600/50 text-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 gap-4 flex-grow pr-1 overflow-y-auto custom-scrollbar">
        {filteredItems.map((item: GalleryItem) => (
            <div
              key={item.id}
              onClick={() => onStyleSelect(item)}
              className={`relative rounded-lg overflow-hidden transform transition-all duration-300 ease-in-out group aspect-square cursor-pointer animate-fade-in ${
                selectedStyle?.id === item.id ? 'ring-4 ring-cyan-400 scale-105 shadow-2xl shadow-cyan-500/20' : 'ring-2 ring-transparent hover:ring-cyan-500/50 hover:scale-105'
              }`}
              aria-label={`Select style: ${item.name}`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onStyleSelect(item) }}
              style={{ animationDelay: `${(item.id % 10) * 50}ms`}}
            >
              <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>
              <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white text-sm font-semibold truncate">{item.name}</p>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default PromptGallery;

import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import PromptGallery from './components/PromptGallery';
import GeneratedImageDisplay from './components/GeneratedImageDisplay';
import LoadingDisplay from './components/LoadingDisplay';
import HistoryPanel from './components/HistoryPanel';
import PromptEditor from './components/PromptEditor';
import ErrorBoundary from './components/ErrorBoundary';
import { editImageWithGemini, generateImageWithImagen } from './services/geminiService';
import { useHistory } from './hooks/useHistory';
import type { GeminiResponse, GalleryItem, HistoryItem } from './types';

const App: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<GalleryItem | null>(null);
  const [currentPrompt, setCurrentPrompt] = useState<string>('');
  const [generatedContent, setGeneratedContent] = useState<GeminiResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { history, addHistoryItem, clearHistory } = useHistory();
  const [isHistoryPanelOpen, setIsHistoryPanelOpen] = useState(false);
  const [viewingHistoryItem, setViewingHistoryItem] = useState<HistoryItem | null>(null);

  const handleImageUpload = (imageDataUrl: string | null) => {
    setUploadedImage(imageDataUrl);
    setGeneratedContent(null); // Clear previous generation on new upload
    setError(null);
    if (!imageDataUrl) {
      setSelectedStyle(null);
    }
  };

  const handleStyleSelect = (item: GalleryItem) => {
    setSelectedStyle(item);
    setCurrentPrompt(item.prompt);
    if (viewingHistoryItem) {
      setViewingHistoryItem(null);
      setGeneratedContent(null);
    }
  };
  
  const handleGenerateClick = useCallback(async () => {
    if (!currentPrompt) {
      setError("Please provide a prompt.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedContent(null);
    setViewingHistoryItem(null);

    try {
      let result: GeminiResponse;
      // If an image is uploaded, use the image editing model
      if (uploadedImage) {
        result = await editImageWithGemini(uploadedImage, currentPrompt);
      } else {
        // Otherwise, use the text-to-image generation model
        result = await generateImageWithImagen(currentPrompt);
      }
      
      setGeneratedContent(result);

      if (result.imageUrl) {
        const styleForHistory: GalleryItem = selectedStyle && selectedStyle.prompt === currentPrompt
          ? selectedStyle
          : {
              id: Date.now(),
              imageUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iY3VycmVudENvbG9yIj4KICA8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik05Ljc1IDkuMjVhMS41IDEuNSAwIDAgMCAwLTMgMS41IDEuNSAwIDAgMCAwIDNabTMuNzUgNi41YTEuNSAxLjUgMCAxIDEtMyAwIDEuNSAxLjUgMCAwIDEgMyAwWm0xLjUgMS41YTEuNSAxLjUgMCAxIDAgMC0zIDEuNSAxLjUgMCAwIDAgMCAzWm0zLTEuNWExLjUgMS41IDAgMSAxLTMgMCAxLjUgMS41IDAgMCAxIDMgMFptMS41LTEuNWExLjUgMS41IDAgMSAwIDAtMyAxLjUgMS41IDAgMCAwIDAgM1ptLTMuNDQ1LTUuNTU1YTMuNzUgMy43NSAwIDAgMSA1LjMwMyA1LjMwMyAzLjc1IDMuNzUgMCAwIDEtNS4zMDMtNS4zMDNaTTEyIDMuNzVhOC4yNSA4LjI1IDAgMSAwIDAgMTYuNSA4LjI1IDguMjUgMCAwIDAgMC0xNi41Wk00LjI1IDEyYTcuNzUgNy43NSAwIDEgMCAxNS41IDAgNy43NSA3Ljc1IDAgMCAwLTE1LjUgMFoiIGNsaXAtcnVsZT0iZXZlbm9kZCIgLz4KPC9zdmc+',
              name: uploadedImage ? 'Custom Edit' : 'Text-to-Image',
              prompt: currentPrompt,
              category: 'Custom',
            };
            
        await addHistoryItem({
          originalImage: uploadedImage,
          generatedContent: result,
          style: styleForHistory,
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(`Generation failed: ${errorMessage}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [uploadedImage, selectedStyle, currentPrompt, addHistoryItem]);
  
  const handleStartOver = () => {
    setUploadedImage(null);
    setSelectedStyle(null);
    setCurrentPrompt('');
    setGeneratedContent(null);
    setError(null);
    setIsLoading(false);
    setViewingHistoryItem(null);
  };

  const handleViewHistoryItem = (item: HistoryItem) => {
    setViewingHistoryItem(item);
    setUploadedImage(item.originalImage);
    setGeneratedContent(item.generatedContent);
    setSelectedStyle(item.style);
    setCurrentPrompt(item.style.prompt);
    setIsHistoryPanelOpen(false);
    setError(null);
    setIsLoading(false);
  };

  const handleDownload = () => {
    const content = viewingHistoryItem ? viewingHistoryItem.generatedContent : generatedContent;
    const style = viewingHistoryItem ? viewingHistoryItem.style : (selectedStyle || { name: 'generated-image' });
    if (!content?.imageUrl || !style) return;
    const link = document.createElement('a');
    link.href = content.imageUrl;
    const filename = `stylized-${style.name.toLowerCase().replace(/\s+/g, '-')}.png`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const canGenerate = currentPrompt.trim().length > 0 && !isLoading;
  const isResultView = (generatedContent || viewingHistoryItem) && !isLoading;
  
  const displayedContent = viewingHistoryItem ?? {
    originalImage: uploadedImage,
    generatedContent: generatedContent,
    style: selectedStyle,
  };
  
  const renderCentralPanel = () => {
    if (isLoading) {
      return <LoadingDisplay originalImage={uploadedImage} />;
    }
    if (isResultView) {
      return (
        <GeneratedImageDisplay
          originalImage={displayedContent.originalImage}
          generatedContent={displayedContent.generatedContent}
          selectedStyle={displayedContent.style!}
        />
      );
    }
     // if image is uploaded (but not yet generated), show split view immediately
    if (uploadedImage) {
        return (
            <GeneratedImageDisplay
              originalImage={uploadedImage}
              generatedContent={null}
              selectedStyle={{ name: 'Stylized' } as GalleryItem}
            />
        );
    }
    // default: no image uploaded, no result
    return <ImageUploader onImageUpload={handleImageUpload} />;
  };

  return (
    <div className="min-h-screen bg-transparent text-gray-100 font-sans flex flex-col">
      <Header onHistoryClick={() => setIsHistoryPanelOpen(true)} historyCount={history.length} />
      <HistoryPanel
        isOpen={isHistoryPanelOpen}
        onClose={() => setIsHistoryPanelOpen(false)}
        history={history}
        onSelect={handleViewHistoryItem}
        onClear={clearHistory}
      />

      <div className="app-grid p-4 md:p-8 gap-4 md:gap-8 flex-grow">
        {/* Left Panel: Style Gallery */}
        <aside className="panel-glass p-4 flex flex-col gap-4 animate-fade-in custom-scrollbar overflow-y-auto">
           <h2 className="text-xl font-bold text-cyan-400 border-b-2 border-cyan-400/20 pb-2 px-2 shrink-0">1. Choose a Style (Optional)</h2>
           <div className="flex-grow">
             <PromptGallery onStyleSelect={handleStyleSelect} selectedStyle={selectedStyle} />
           </div>
        </aside>

        {/* Center Panel: Canvas */}
        <main className="flex items-center justify-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <ErrorBoundary>
            {renderCentralPanel()}
          </ErrorBoundary>
        </main>
        
        {/* Right Panel: Controls */}
        <aside className="panel-glass p-6 flex flex-col gap-6 animate-fade-in custom-scrollbar overflow-y-auto" style={{ animationDelay: '0.2s' }}>
              <PromptEditor
                prompt={currentPrompt}
                onPromptChange={setCurrentPrompt}
                disabled={isLoading || viewingHistoryItem !== null}
              />
              <div className="mt-auto pt-6 border-t border-gray-700/60 flex flex-col gap-4">
                {error && <p className="text-red-400 text-center text-sm bg-red-900/30 p-3 rounded-lg">{error}</p>}
                
                {isResultView ? (
                  <>
                    <button onClick={handleDownload} className="w-full flex items-center justify-center gap-2 px-8 py-3 bg-cyan-500 text-white font-bold rounded-lg shadow-lg hover:bg-cyan-400 transition-all duration-300 transform hover:scale-105">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span>Download</span>
                    </button>
                    <div className="grid grid-cols-2 gap-3">
                      <button onClick={handleGenerateClick} disabled={!canGenerate} className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-gray-600 text-white font-bold rounded-lg shadow-lg hover:bg-gray-500 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-700 disabled:cursor-not-allowed disabled:hover:scale-100">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm10 8a1 1 0 011-1h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 111.885-.666A5.002 5.002 0 0014.001 13H11a1 1 0 01-1-1z" clipRule="evenodd" />
                          </svg>
                          <span>Regenerate</span>
                      </button>
                      <button onClick={handleStartOver} className="w-full px-4 py-2 bg-gray-600 text-white font-bold rounded-lg shadow-lg hover:bg-gray-500 transition-all duration-300 transform hover:scale-105">
                          Start Over
                      </button>
                    </div>
                  </>
                ) : (
                  <button
                      onClick={handleGenerateClick}
                      disabled={!canGenerate}
                      className={`w-full px-12 py-4 text-xl font-bold rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${
                      canGenerate
                          ? 'bg-cyan-500 hover:bg-cyan-400 text-white shadow-cyan-500/50 animate-glow'
                          : 'bg-gray-600 cursor-not-allowed text-gray-400'
                      }`}
                  >
                      {isLoading ? 'Generating...' : 'Generate'}
                  </button>
                )}
              </div>
        </aside>
      </div>
    </div>
  );
};

export default App;
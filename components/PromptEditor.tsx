import React from 'react';

interface PromptEditorProps {
  prompt: string;
  onPromptChange: (newPrompt: string) => void;
  disabled: boolean;
}

const PromptEditor: React.FC<PromptEditorProps> = ({ prompt, onPromptChange, disabled }) => {
  return (
    <div className={`transition-opacity duration-500`}>
      <label htmlFor="prompt-textarea" className="block text-xl font-bold text-cyan-400 mb-4 border-b-2 border-cyan-400/20 pb-2">
        2. Write a Prompt
      </label>
      <div className="relative">
        <textarea
          id="prompt-textarea"
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          disabled={disabled}
          rows={8}
          className="w-full p-3 bg-gray-800 border-2 border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors duration-300 custom-scrollbar disabled:cursor-not-allowed"
          placeholder={"Describe the image you want to create or edit. You can also select a style from the gallery to get started."}
        />
        <span className="absolute bottom-2 right-3 text-xs text-gray-500 pointer-events-none">
          {prompt.length} characters
        </span>
      </div>
       <p className="text-xs text-gray-500 mt-2">To generate from text, just write a prompt. To edit, upload an image first.</p>
    </div>
  );
};

export default PromptEditor;
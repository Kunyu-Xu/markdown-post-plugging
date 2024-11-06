import React, { useState } from 'react';
import { MarkdownEditor } from './components/markdown-editor';
import { Toolbar } from './components/toolbar';
import { markdownStyles } from './config/post-styles';

function App() {
  const [markdown, setMarkdown] = useState('');
  const [selectedStyle, setSelectedStyle] = useState(markdownStyles[0].name);

  return (
    <div className="w-[600px] h-[400px] p-4">
      <Toolbar 
        selectedStyle={selectedStyle}
        setSelectedStyle={setSelectedStyle}
        markdownStyles={markdownStyles}
      />
      <div className="flex h-full">
        <MarkdownEditor 
          value={markdown}
          onChange={setMarkdown}
        />
      </div>
    </div>
  );
}

export default App; 
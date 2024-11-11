import React, { useState, useEffect } from 'react';
import { Toolbar } from './components/toolbar';
import { markdownStyles } from './config/post-styles';
import { storage } from './utils/storage';

function App() {
  const [selectedStyle, setSelectedStyle] = useState(markdownStyles[0].name);

  useEffect(() => {
    const loadSavedStyle = async () => {
      const savedStyle = await storage.getSelectedStyle();
      if (savedStyle) {
        setSelectedStyle(savedStyle);
      }
    };
    loadSavedStyle();
  }, []);

  const handleStyleChange = async (newStyle: string) => {
    setSelectedStyle(newStyle);
    await storage.setSelectedStyle(newStyle);
  };

  return (
    <div className="w-fit h-fit relative">
      <Toolbar 
        selectedStyle={selectedStyle}
        setSelectedStyle={handleStyleChange}
        markdownStyles={markdownStyles}
      />
    </div>
  );
}

export default App;
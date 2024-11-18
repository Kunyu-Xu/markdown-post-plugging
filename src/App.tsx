import React, { useState, useEffect } from 'react';
import { Toolbar } from './components/toolbar';
import { markdownStyles } from './config/post-styles';
import { storage } from './utils/storage';
import { Card } from "@nextui-org/react";

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

  const handleConvert = async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tab.id) return;

      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content-script.js']
      });

      await new Promise(resolve => setTimeout(resolve, 100));

      chrome.tabs.sendMessage(
        tab.id,
        {
          action: 'convertMarkdown',
          styleName: selectedStyle
        },
        async (response) => {
          if (chrome.runtime.lastError) {
            console.error('Error:', chrome.runtime.lastError);
            return;
          }

          if (response?.error) {
            console.error('Conversion error:', response.error);
            alert('转换失败，请重试');
            return;
          }

          if (response?.html) {
            try {
              const clipboardItem = new ClipboardItem({
                'text/html': new Blob([response.html], { type: 'text/html' })
              });
              
              await navigator.clipboard.write([clipboardItem]);
              alert('已复制到剪贴板！');
            } catch (err) {
              console.error('Failed to copy to clipboard:', err);
              alert('复制失败，请重试');
            }
          }
        }
      );
    } catch (error) {
      console.error('Error in handleConvert:', error);
    }
  };

  return (
    <Card className="popup-card relative" style={{width:'400px', height:"200px"}}>
      <Toolbar 
        selectedStyle={selectedStyle}
        setSelectedStyle={handleStyleChange}
        markdownStyles={markdownStyles}
        onConvert={handleConvert}
      />
    </Card>
  );
}

export default App;
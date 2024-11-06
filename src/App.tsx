import React, { useState } from 'react';
import { MarkdownEditor } from './components/markdown-editor';
import { Toolbar } from './components/toolbar';
import { markdownStyles } from './config/post-styles';
import { marked } from 'marked';

function App() {
  const [markdown, setMarkdown] = useState('');
  const [selectedStyle, setSelectedStyle] = useState(markdownStyles[0].name);
  const [html, setHtml] = useState('');

  React.useEffect(() => {
    const parseMarkdown = async () => {
      try {
        const parsedHtml = await marked(markdown);
        setHtml(parsedHtml);
      } catch (error) {
        console.error('Error parsing markdown:', error);
        setHtml('Error parsing markdown');
      }
    };

    parseMarkdown();
  }, [markdown]);

  return (
    <div className="w-popup h-popup flex flex-col p-4">
      <Toolbar 
        selectedStyle={selectedStyle}
        setSelectedStyle={setSelectedStyle}
        markdownStyles={markdownStyles}
      />
      <div className="flex-1 flex gap-4 mt-4">
        {/* 左侧编辑器 */}
        <div className="flex-1 border rounded-lg overflow-hidden">
          <MarkdownEditor 
            value={markdown}
            onChange={setMarkdown}
          />
        </div>
        {/* 右侧预览 */}
        <div 
          id="markdown-body"
          className="flex-1 border rounded-lg p-4 overflow-auto"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}

export default App; 
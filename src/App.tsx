import React, { useState } from 'react';
import { MarkdownEditor } from './components/markdown-editor';
import { Toolbar } from './components/toolbar';
import { markdownStyles } from './config/post-styles';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

const renderer = new marked.Renderer();
const originalCodeRenderer = renderer.code.bind(renderer);

renderer.code = (code: string, language: string | undefined, isEscaped: boolean) => {
  if (language) {
    try {
      const highlightedCode = hljs.highlight(code, {
        language,
        ignoreIllegals: true
      }).value;
      return `<pre><code class="hljs language-${language}">${highlightedCode}</code></pre>`;
    } catch (e) {
      console.error(e);
    }
  }
  return originalCodeRenderer(code, language, isEscaped);
};

marked.setOptions({
  renderer: renderer,
  gfm: true,
  breaks: true,
  pedantic: false
});

function App() {
  const [markdown, setMarkdown] = useState('');
  const [selectedStyle, setSelectedStyle] = useState(markdownStyles[0].name);
  const [html, setHtml] = useState('');

  React.useEffect(() => {
    const parseMarkdown = async () => {
      try {
        const parsedHtml = marked.parse(markdown);
        setHtml(String(parsedHtml));
      } catch (error) {
        console.error('Error parsing markdown:', error);
        setHtml('Error parsing markdown');
      }
    };

    parseMarkdown();
  }, [markdown]);

  return (
    <div className="w-popup h-popup flex flex-col p-4">
      <div className="flex-none">
        <Toolbar 
          selectedStyle={selectedStyle}
          setSelectedStyle={setSelectedStyle}
          markdownStyles={markdownStyles}
        />
      </div>
      <div className="flex-1 flex gap-4 mt-4 min-h-0">
        {/* 左侧编辑器 */}
        <div className="flex-1 border rounded-lg overflow-hidden">
          <MarkdownEditor 
            value={markdown}
            onChange={setMarkdown}
          />
        </div>
        <div
          id="markdown-body"
          className="flex-1 border rounded-lg p-4 overflow-y-auto markdown-preview"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}

export default App;
import { convertMarkdownToHtml } from './utils/markdown-converter';

console.log('Content script loaded');

// 标记脚本已注入
(window as any).markdownPostInjected = true;

// 监听消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Message received:', request);

  if (request.action === 'convertMarkdown') {
    try {
      // 获取选中的文本
      const selectedText = window.getSelection()?.toString() || '';
      console.log('Selected text:', selectedText);

      if (!selectedText) {
        sendResponse({ error: 'No text selected' });
        return true;
      }

      // 转换 Markdown 为 HTML
      const html = convertMarkdownToHtml(selectedText, request.styleName);
      console.log('Converted HTML:', html);
      
      sendResponse({ html });
    } catch (error) {
      console.error('Conversion error:', error);
      sendResponse({ error: 'Conversion failed' });
    }
    return true;
  }
}); 
import { marked } from 'marked';
import { loadCSS } from '../config/post-styles';

export const convertMarkdownToHtml = (markdown: string, styleName: string) => {
  try {
    // 转换 Markdown 为 HTML
    const htmlContent = marked(markdown);
    
    // 获取对应的样式
    const styleContent = loadCSS(styleName);
    
    // 组合 HTML 和样式
    const fullHtml = `
      <style>${styleContent}</style>
      <div class="article">${htmlContent}</div>
    `;
    
    return fullHtml;
  } catch (error) {
    console.error('Error converting markdown:', error);
    return '';
  }
}; 
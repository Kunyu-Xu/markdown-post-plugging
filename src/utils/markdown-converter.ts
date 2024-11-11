import { marked } from 'marked';

export const convertMarkdownToHtml = async (markdown: string, styleName: string = 'github') => {
  // 转换 Markdown 为 HTML
  const htmlContent = marked(markdown);
  
  // 动态加载样式文件
  const styleContent = await fetch(chrome.runtime.getURL(`styles/${styleName}.css`))
    .then(response => response.text())
    .catch(() => {
      console.error(`Failed to load style: ${styleName}`);
      // 如果加载失败，尝试加载默认样式
      return fetch(chrome.runtime.getURL('styles/github.css')).then(response => response.text());
    });
  
  // 组合 HTML 和样式
  return `
    <style>${styleContent}</style>
    <div class="article">${htmlContent}</div>
  `;
}; 
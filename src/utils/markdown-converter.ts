import { marked } from 'marked';

// 内置样式
const styles = {
  github: `
    .article {
      padding: 32px;
      border-radius: 8px;
      background: white;
      color-scheme: light;
      color: #1f2328;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans",
        Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
      font-size: 16px;
      line-height: 1.5;
      word-wrap: break-word;
    }
    /* 其他样式... */
  `,
  newspaper: `/* newspaper 样式 */`,
  poster: `/* poster 样式 */`,
  slim: `/* slim 样式 */`,
  note: `/* note 样式 */`
};

export const convertMarkdownToHtml = (markdown: string, styleName: string = 'github') => {
  // 转换 Markdown 为 HTML
  const htmlContent = marked(markdown);
  
  // 获取对应样式
  const styleContent = styles[styleName as keyof typeof styles] || styles.github;
  
  // 组合 HTML 和样式
  return `
    <style>${styleContent}</style>
    <div class="article">${htmlContent}</div>
  `;
}; 
import { convertMarkdownToHtml } from "./utils/markdown-converter";

console.log("Content script loaded");

// 监听消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Message received:", request);

  if (request.action === "convertMarkdown") {
    try {
      // 获取选中的文本
      const selectedText = window.getSelection()?.toString() || "";

      console.log("Selected text:", selectedText);

      if (!selectedText) {
        sendResponse({ error: "No text selected" });

        return true;
      }

      // 转换 Markdown 为 HTML
      convertMarkdownToHtml(selectedText, request.styleName)
        .then((html) => {
          console.log("Converted HTML:", html);
          sendResponse({ html: html });
        })
        .catch((error) => {
          console.error("Conversion error:", error);
          sendResponse({ error: "Conversion failed" });
        });

      return true; // 保持消息通道开放，等待异步响应
    } catch (error) {
      console.error("Error:", error);
      sendResponse({ error: "Unexpected error" });

      return true;
    }
  }
});

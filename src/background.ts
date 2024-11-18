console.log("Background script loaded");

// 监听插件图标点击
chrome.action.onClicked.addListener((tab) => {
  if (tab.id) {
    injectContentScript(tab.id);
  }
});

// 监听标签页更新
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    injectContentScript(tabId);
  }
});

// 监听消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "checkContentScript") {
    if (sender.tab?.id) {
      injectContentScript(sender.tab.id);
    }
    sendResponse({ status: "checked" });
  }
});

// 注入内容脚本
async function injectContentScript(tabId: number) {
  try {
    // 检查脚本是否已注入
    const [{ result }] = await chrome.scripting.executeScript({
      target: { tabId },
      func: () => window.hasOwnProperty("markdownPostInjected"),
    });

    if (!result) {
      // 注入内容脚本
      await chrome.scripting.executeScript({
        target: { tabId },
        files: ["content-script.js"],
      });
      console.log("Content script injected");
    }
  } catch (error) {
    console.error("Failed to inject content script:", error);
  }
}

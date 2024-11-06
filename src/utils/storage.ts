export const storage = {
  get: async (key: string) => {
    const result = await chrome.storage.local.get(key);
    return result[key];
  },
  
  set: async (key: string, value: any) => {
    await chrome.storage.local.set({ [key]: value });
  },
  
  remove: async (key: string) => {
    await chrome.storage.local.remove(key);
  }
}; 
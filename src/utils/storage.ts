export const STORAGE_KEYS = {
  SELECTED_STYLE: 'selectedStyle'
} as const;

export const storage = {
  getSelectedStyle: async () => {
    const result = await chrome.storage.local.get(STORAGE_KEYS.SELECTED_STYLE);
    return result[STORAGE_KEYS.SELECTED_STYLE];
  },
  
  setSelectedStyle: async (styleName: string) => {
    await chrome.storage.local.set({ 
      [STORAGE_KEYS.SELECTED_STYLE]: styleName 
    });
  }
}; 
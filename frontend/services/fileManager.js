import AsyncStorage from '@react-native-async-storage/async-storage';

// Helper to generate unique key per file
const getFileKey = (fileUri) => `highlights_${fileUri}`;

// Save highlight for a specific file
export const saveHighlightForFile = async (fileUri, text) => {
  try {
    const key = getFileKey(fileUri);
    const existing = await AsyncStorage.getItem(key);
    let highlights = existing ? JSON.parse(existing) : [];
    highlights.push(text);
    await AsyncStorage.setItem(key, JSON.stringify(highlights));
  } catch (error) {
    console.error(`Error saving highlight for file ${fileUri}:`, error);
  }
};

// Retrieve all highlights for a specific file
export const getHighlightsForFile = async (fileUri) => {
  try {
    const key = getFileKey(fileUri);
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error loading highlights for file ${fileUri}:`, error);
    return [];
  }
};

// Clear highlights for a specific file
export const clearHighlightsForFile = async (fileUri) => {
  try {
    const key = getFileKey(fileUri);
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error clearing highlights for file ${fileUri}:`, error);
  }
};

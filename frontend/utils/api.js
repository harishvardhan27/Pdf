// For development use: localhost
// For production use: your deployed backend URL
const BASE_URL = Platform.OS === 'android' ? 'http://10.0.2.2:5000' : 'http://localhost:5000';
// Replace with 'https://your-deployed-server.com' when you deploy

// Upload PDF to server (if backend parsing is supported)
export const uploadPDF = async (fileUri) => {
  const formData = new FormData();
  formData.append('file', {
    uri: fileUri,
    name: 'document.pdf',
    type: 'application/pdf',
  });

  try {
    const response = await fetch(`${BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return await response.json();
  } catch (error) {
    console.error('❌ Error uploading PDF:', error);
    return null;
  }
};

// Generate MCQs from selected text
export const generateMCQs = async (inputText) => {
  try {
    const response = await fetch(`${BASE_URL}/generate_mcq`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input: inputText }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate MCQs');
    }

    const data = await response.json();
    return data.mcqs || [];
  } catch (error) {
    console.error('❌ Error generating MCQs:', error);
    return [];
  }
};

// Get highlighted text from chatbot (e.g., based on a prompt)
export const getHighlightsFromChat = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}/highlight_text`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error('Highlighting failed');
    }

    const data = await response.json();
    return data.highlights || [];
  } catch (error) {
    console.error('❌ Error fetching highlights:', error);
    return [];
  }
};

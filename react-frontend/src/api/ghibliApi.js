const API_BASE_URL = 'http://localhost:8080/api/v1';

export const generateFromImage = async (imageFile, prompt) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  formData.append('prompt', prompt);

  try {
    const response = await fetch(`${API_BASE_URL}/generate`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Image generation failed');
    }

    return await response.blob();
  } catch (error) {
    console.error('Error generating from image:', error);
    throw error;
  }
};

export const generateFromText = async (prompt, style = 'ghibli') => {
  try {
    const response = await fetch(`${API_BASE_URL}/generate-from-text`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, style }),
    });

    if (!response.ok) {
      throw new Error('Text generation failed');
    }

    return await response.blob();
  } catch (error) {
    console.error('Error generating from text:', error);
    throw error;
  }
};
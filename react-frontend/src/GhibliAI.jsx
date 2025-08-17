import { useState, useCallback } from 'react';
import { generateFromImage, generateFromText } from './api/ghibliApi';

   export default function GhibliAI() {
  const [activeTab, setActiveTab] = useState('upload');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null); // Add this state
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null); // Add this state

  const handleImageUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file); // Store the file object
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGeneratedImage(null);
    
    try {
      let imageBlob;
      
      if (activeTab === 'upload') {
        if (!uploadedFile) {
          throw new Error('Please upload an image first');
        }
        imageBlob = await generateFromImage(uploadedFile, prompt);
      } else {
        if (!prompt) {
          throw new Error('Please enter a prompt');
        }
        imageBlob = await generateFromText(prompt);
      }
      
      const imageUrl = URL.createObjectURL(imageBlob);
      setGeneratedImage(imageUrl);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsGenerating(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-ghibli-light to-ghibli-dark text-ghibli-dark">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Transform Your Photos into <br />
          <span className="text-ghibli-primary">Ghibli Art with Ghibli AI</span>
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Experience the magic of Studio Ghibli's artistic style with our AI-powered Ghibli image generator tool.
        </p>
        <button 
          className="bg-ghibli-primary hover:bg-ghibli-primary-dark text-white font-bold py-3 px-8 rounded-full text-lg transition-all"
          onClick={() => document.getElementById('create').scrollIntoView()}
        >
          Try Ghibli AI
        </button>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Ghibli AI Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Art Style Transfer",
                description: "Convert your photos into beautiful Ghibli-style artwork with our advanced AI."
              },
              {
                title: "Prompt-Based Generation",
                description: "Create original Ghibli art just by describing what you imagine."
              },
              {
                title: "High Resolution",
                description: "Get high-quality images suitable for prints and wallpapers."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-ghibli-light p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Create Section - Dynamic Part */}
      <section id="create" className="py-16 px-4 bg-ghibli-light">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Create Ghibli Art</h2>
          
          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <button
              className={`px-6 py-2 font-medium ${activeTab === 'upload' ? 'bg-ghibli-primary text-white' : 'bg-white text-ghibli-dark'} rounded-l-lg`}
              onClick={() => setActiveTab('upload')}
            >
              Upload Photo
            </button>
            <button
              className={`px-6 py-2 font-medium ${activeTab === 'prompt' ? 'bg-ghibli-primary text-white' : 'bg-white text-ghibli-dark'} rounded-r-lg`}
              onClick={() => setActiveTab('prompt')}
            >
              Text Prompt
            </button>
          </div>

         
          {/* Upload Photo Tab */}
{activeTab === 'upload' && (
  <div className="bg-white p-6 rounded-xl shadow-md">
    <div className="mb-6">
      {uploadedImage ? (
        <div className="flex flex-col items-center">
          <img 
            src={uploadedImage} 
            alt="Uploaded preview" 
            className="max-h-64 mb-4 rounded-lg"
          />
          <button 
            className="text-ghibli-primary underline"
            onClick={() => setUploadedImage(null)}
          >
            Change Image
          </button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-ghibli-primary rounded-lg p-8 text-center cursor-pointer hover:bg-ghibli-light">
          <label className="cursor-pointer">
            <input 
              type="file" 
              className="hidden" 
              accept="image/*"
              onChange={handleImageUpload}
            />
            <div className="text-ghibli-primary text-lg mb-2">
              Drag & drop your photo here or click to browse
            </div>
            <div className="text-sm text-gray-500">
              Supports JPG, PNG (Max 5MB)
            </div>
          </label>
        </div>
      )}
    </div>

    <div className="mb-6">
      <label className="block text-sm font-medium mb-2">Enhance with a prompt (optional)</label>
      <textarea
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ghibli-primary focus:border-transparent"
        rows={3}
        placeholder="Describe any additional elements you want in Ghibli style..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
    </div>

    {/* Generate Button for Upload Tab */}
    <button
      className={`w-full py-3 px-4 bg-ghibli-primary hover:bg-ghibli-primary-dark text-white font-bold rounded-lg transition-all ${(!uploadedImage) ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={!uploadedImage}
      onClick={handleGenerate}
    >
      {isGenerating ? 'Generating...' : 'Generate Ghibli Art'}
    </button>
  </div>
)}

{/* Text Prompt Tab */}
{activeTab === 'prompt' && (
  <div className="bg-white p-6 rounded-xl shadow-md">
    <div className="mb-6">
      <label className="block text-sm font-medium mb-2">Describe your Ghibli artwork</label>
      <textarea
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ghibli-primary focus:border-transparent"
        rows={5}
        placeholder="Example: A peaceful countryside with rolling hills, a small cottage with smoke coming from the chimney, and a dragon flying in the distance..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
    </div>

    {/* Generate Button for Text Prompt Tab */}
    <button
      className={`w-full py-3 px-4 bg-ghibli-primary hover:bg-ghibli-primary-dark text-white font-bold rounded-lg transition-all ${!prompt.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={!prompt.trim()}
      onClick={handleGenerate}
    >
      {isGenerating ? 'Generating...' : 'Generate from Text'}
    </button>
  </div>
)}
        </div>
      </section>

      {/* Results Section (Will be dynamic after backend integration) */}
       {/* Updated Results Section */}
  <section className="py-16 px-4 bg-white">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-8">Your Ghibli Artwork</h2>
      {generatedImage ? (
        <div className="bg-gray-100 p-4 rounded-xl">
          <img 
            src={generatedImage} 
            alt="Generated Ghibli art" 
            className="max-w-full h-auto rounded-lg mx-auto"
          />
          <div className="mt-4">
            <a
              href={generatedImage}
              download="ghibli-art.png"
              className="inline-block bg-ghibli-primary hover:bg-ghibli-primary-dark text-white font-bold py-2 px-6 rounded-lg transition-all"
            >
              Download Artwork
            </a>
          </div>
        </div>
      ) : (
        <div className="bg-gray-100 p-8 rounded-xl">
          <p className="text-gray-500">
            {isGenerating ? 'Generating your Ghibli artwork...' : 'Your generated artwork will appear here'}
          </p>
          {isGenerating && (
            <div className="mt-4 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-ghibli-primary"></div>
            </div>
          )}
        </div>
      )}
    </div>
  </section>
    </div>
  );
}
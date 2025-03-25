import React, { useState } from "react";
import axios from "axios";

const GeminiComponent = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/generate-text", { prompt });
      setResponse(res.data.text);
    } catch (error) {
      setResponse("Error: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-6 max-w-[800px] min-w-[200px]">
      {/* <h1 className="text-4xl font-bold mb-6 text-neon-blue neon-glow">Gemini + MERN Demo</h1>*/}
      <h1 className="text-4xl font-bold mb-6 text-blue-400 neon-glow pt-3">GemiSeek</h1>  
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-800 p-6 rounded-xl shadow-lg border border-blue-500">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt"
          className="w-full p-3 rounded-md bg-gray-900 text-neon-blue placeholder-blue-300 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 text-center font-semibold neon-text"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 py-2 bg-blue-600 text-white font-bold rounded-lg transition 
                     hover:bg-blue-700 shadow-md shadow-blue-500/50 neon-button"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </form>
      {response && (
        <div className="mt-6 p-4 bg-gray-900 border border-neon-blue rounded-md max-w-md text-center 
                       shadow-md text-neon-blue font-mono text-lg neon-text max-w-[100vw]">
          {response}
        </div>
      )}
    </div>
  );
};

export default GeminiComponent;

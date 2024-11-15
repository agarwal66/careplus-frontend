import React, { useState, useEffect } from "react";
import axios from "axios";

const Aii = () => {
  const [prompt, setPrompt] = useState("");
  const [assistantResponse, setAssistantResponse] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateResponse = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log("Fetching prompt data...");
      const response = await axios.post(
        
        `https://gemini-a.onrender.com/generate-text`,
        {
          prompt: prompt,
        }
      );
      console.log("Response:", response);

      if (!response.data) {
        throw new Error("Failed to fetch prompt");
      }

      setAssistantResponse(response?.data?.generatedText);
      setLoading(false);
      console.log("Assistant Response:", response?.data?.generatedText);

      // Save prompt and response to your backend
      await axios.post(
        "http://localhost:4000/api/v1/ai/save-search-history",
        {
          prompt,
          response: response?.data?.generatedText,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      setError(error.message);
      setLoading(false);

      console.error("Error fetching prompt:", error);
    }
  };

  return (
    <div className="ai-container">
      <h4>Enter a prompt:</h4>
      <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} />
      <button onClick={generateResponse}>Generate Response</button>

      {loading ? (
        <p className="hello-d">Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <h4>Response:</h4>
          {assistantResponse.split("\n").map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </>
      )}
    </div>
  );
};

export default Aii;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Aii = () => {
//   const [prompt, setPrompt] = useState("");
//   const [assistantResponse, setAssistantResponse] = useState("");
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const generateResponse = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       console.log("Fetching prompt data...");
//       const response = await axios.post(
//         `https://gemini-a-production.up.railway.app/generate-text`,
//         {
//           prompt: prompt,
//         }
//       );
//       console.log("Response:", response);

//       if (!response.data) {
//         throw new Error("Failed to fetch prompt");
//       }

//       setAssistantResponse(response?.data?.generatedText);
//       setLoading(false);
//       console.log("Assistant Response:", response?.data?.generatedText);
//     } catch (error) {
//       setError(error.message);
//       setLoading(false);

//       console.error("Error fetching prompt:", error);
//     }
//   };

//   return (
//     <div className="ai-container">
//       <h4>Enter a prompt:</h4>
//       <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} />
//       <button onClick={generateResponse}>Generate Response</button>

//       {loading ? (
//         <p className="hello-d">Loading...</p>
//       ) : error ? (
//         <p>Error: {error}</p>
//       ) : (
//         <>
//           <h4>Response:</h4>
//           {assistantResponse.split('\n').map((line, index) => (
//             <p key={index}>{line}</p>
//           ))}
//         </>
//       )}
//     </div>
//   );
// };

// export default Aii;

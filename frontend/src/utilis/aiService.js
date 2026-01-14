import axios from "axios";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const BASE_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

export const getAiSummary = async (questionTitle, answersArray) => {
  if (!API_KEY) return "API Key missing.";

  const promptText = `Summarize the following forum discussion in 3 short bullet points.
    Question: ${questionTitle}
    Answers: ${answersArray.map((a) => a.answer).join(" | ")}`;

  try {
    const response = await axios.post(`${BASE_URL}?key=${API_KEY}`, {
      contents: [{ parts: [{ text: promptText }] }],
    });

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("DEBUG ERROR:", error.response?.data);

    if (error.response?.status === 404) {
      return "AI Error: Model not found. Please check your VPN location.";
    }
    return (
      "AI Error: " +
      (error.response?.data?.error?.message || "Service Unavailable")
    );
  }
};

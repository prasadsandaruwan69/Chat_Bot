import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API with your API key
const API_KEY =
  import.meta.env.VITE_GEMINI_API_KEY ||
  "AIzaSyBtpW755OpuSBIN0sZQEI0gRQnCro-S1Xw";
const genAI = new GoogleGenerativeAI(API_KEY);

// Get the generative model - Updated to use the correct model name
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Simple fallback responses when API is unavailable
const fallbackResponses = [
  "I'm currently experiencing high demand. Here are some things I can help you with when I'm back online: answering questions, helping with coding, writing assistance, and general conversation.",
  "My AI service is temporarily unavailable due to quota limits. The free tier allows 50 requests per day. Please try again tomorrow!",
  "I'm taking a short break due to API limits. In the meantime, feel free to explore the interface - I'll be back tomorrow with fresh responses!",
  "Service temporarily limited due to high usage. The Gemini API free tier has daily limits. Try again in a few hours or tomorrow!",
  "I'm currently offline due to daily usage limits. The free Google Gemini API allows 50 requests per day. See you tomorrow! 🚀",
];

const getFallbackResponse = () => {
  return fallbackResponses[
    Math.floor(Math.random() * fallbackResponses.length)
  ];
};

// Request counter to track API usage
let requestCount = 0;
const MAX_DAILY_REQUESTS = 50;

const incrementRequestCount = () => {
  requestCount++;
  console.log(`API Request #${requestCount}/${MAX_DAILY_REQUESTS}`);

  if (requestCount >= MAX_DAILY_REQUESTS - 5) {
    console.warn(
      `⚠️ Approaching daily limit! ${requestCount}/${MAX_DAILY_REQUESTS} requests used.`
    );
  }
};

export const generateAIResponse = async (userMessage) => {
  try {
    console.log("Generating AI response for:", userMessage);
    incrementRequestCount();

    // Generate content using the Gemini API
    const result = await model.generateContent(userMessage);
    const response = await result.response;
    const text = response.text();

    incrementRequestCount(); // Increment request count on successful response

    console.log("AI response generated:", text);
    return text;
  } catch (error) {
    console.error("Error generating AI response:", error);
    console.error("Error details:", error.message);

    // Check for specific error types
    if (error.message?.includes("API key")) {
      return "There's an issue with the API key. Please check the configuration.";
    } else if (
      error.message?.includes("quota") ||
      error.message?.includes("429")
    ) {
      return getFallbackResponse();
    } else if (
      error.message?.includes("network") ||
      error.message?.includes("fetch")
    ) {
      return "Network error. Please check your internet connection and try again.";
    } else if (
      error.message?.includes("not found") ||
      error.message?.includes("404")
    ) {
      return "The AI model is not available. This might be a temporary issue - please try again later.";
    }

    return "I'm sorry, I'm having trouble responding right now. Please try again.";
  }
};

export const generateAIResponseWithContext = async (
  userMessage,
  conversationHistory = []
) => {
  try {
    console.log("Generating AI response with context for:", userMessage);

    // Build context from conversation history (limit to last 10 messages for efficiency)
    const recentHistory = conversationHistory.slice(-10);
    let contextPrompt =
      "You are a helpful AI assistant. Here's our recent conversation:\n\n";

    recentHistory.forEach((msg, index) => {
      if (index < recentHistory.length - 1) {
        // Don't include the current message
        contextPrompt += `${msg.sender === "user" ? "User" : "Assistant"}: ${
          msg.text
        }\n`;
      }
    });

    contextPrompt += `\nUser: ${userMessage}\n\nPlease provide a helpful response:`;

    const result = await model.generateContent(contextPrompt);
    const response = await result.response;
    const text = response.text();

    console.log("AI response with context generated:", text);
    return text;
  } catch (error) {
    console.error("Error generating AI response with context:", error);
    console.error("Error details:", error.message);

    // Fallback to simple response without context
    console.log("Falling back to simple response...");
    return await generateAIResponse(userMessage);
  }
};

// Function to list available models
export const listAvailableModels = async () => {
  try {
    console.log("Listing available models...");
    const result = await genAI.listModels();
    console.log("Available models:", result);
    return result;
  } catch (error) {
    console.error("Error listing models:", error);
    return null;
  }
};

// Test function to verify API key
export const testGeminiAPI = async () => {
  try {
    console.log("Testing Gemini API...");

    // Test with the working model
    const result = await model.generateContent(
      "Hello, can you respond with a simple greeting?"
    );
    const response = await result.response;
    const text = response.text();
    console.log("API test successful:", text);
    return { success: true, message: text };
  } catch (error) {
    console.error("API test failed:", error);
    return { success: false, error: error.message };
  }
};

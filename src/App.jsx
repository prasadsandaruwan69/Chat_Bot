import { useState, useEffect } from "react";
import Header from "./components/Header";
import ChatMessage from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";
import "./App.css";
import { formatTime } from "../utils/chatUtils";
import {
  generateAIResponseWithContext,
  testGeminiAPI,
} from "./services/geminiService";

function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm Prasad AI Assistant, powered by Google Gemini. How can I help you today?",
      sender: "bot",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState("testing");

  // Test API on component mount
  useEffect(() => {
    const testAPI = async () => {
      console.log("Testing Gemini API connection...");
      const result = await testGeminiAPI();
      if (result.success) {
        setApiStatus("connected");
        console.log("✅ Gemini API connected successfully");
      } else {
        setApiStatus("error");
        console.error("❌ Gemini API connection failed:", result.error);

        // Add error message to chat
        const errorMsg = {
          id: Date.now(),
          text: `⚠️ API Connection Error: ${result.error}. Please check your API key and try again.`,
          sender: "bot",
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, errorMsg]);
      }
    };

    testAPI();
  }, []);

  const handleSendMessage = async (userMessage) => {
    // Add user message
    const userMsg = {
      id: Date.now(),
      text: userMessage,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Generate AI response
      const aiResponse = await generateAIResponseWithContext(
        userMessage,
        messages
      );

      // Add AI response
      const aiMsg = {
        id: Date.now() + 1,
        text: aiResponse,
        sender: "bot",
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      const errorMsg = {
        id: Date.now() + 1,
        text: "I'm sorry, I'm having trouble responding right now. Please try again.",
        sender: "bot",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col h-screen bg-gray-50'>
      <Header />
      {apiStatus === "testing" && (
        <div className='bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 text-center'>
          <p>🔄 Testing AI connection...</p>
        </div>
      )}
      {apiStatus === "error" && (
        <div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 text-center'>
          <p>❌ AI connection failed. Check console for details.</p>
        </div>
      )}
      {apiStatus === "connected" && (
        <div className='bg-green-100 border-l-4 border-green-500 text-green-700 p-4 text-center'>
          <p>✅ AI assistant ready!</p>
        </div>
      )}
      <div className='flex-1 overflow-y-auto'>
        <div className='max-w-5xl mx-auto'>
          <ChatMessage messages={messages} formatTime={formatTime} />
        </div>
      </div>
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}

export default App;

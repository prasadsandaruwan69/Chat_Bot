// Simple test script to check available models
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyC2IwKwA2BzLlQXwc47y5qVceI3F2UqNx0";
const genAI = new GoogleGenerativeAI(API_KEY);

// Test different model names
const modelsToTest = [
  "gemini-1.5-flash",
  "gemini-1.5-pro",
  "gemini-pro",
  "gemini-1.5-flash-latest",
  "gemini-1.5-pro-latest",
];

async function testModels() {
  console.log("Testing available models...");

  for (const modelName of modelsToTest) {
    try {
      console.log(`\nTesting model: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(
        "Hello, respond with just 'Working!'"
      );
      const response = await result.response;
      const text = response.text();
      console.log(`✅ ${modelName}: ${text}`);
    } catch (error) {
      console.log(`❌ ${modelName}: ${error.message}`);
    }
  }
}

testModels();

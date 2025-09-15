# Prasad AI Assistant - API Quota Guide

## 🚨 Current Issue: API Quota Exceeded

Your AI assistant is experiencing quota limits because **Google Gemini API free tier allows only 50 requests per day**.

## 📊 What This Means:

- ✅ 50 free requests per day per API key
- ❌ Once you hit the limit, you need to wait 24 hours
- 🔄 The quota resets at midnight UTC

## 🛠️ Solutions:

### Option 1: Wait (Free)

- Wait 24 hours for the quota to reset
- Your app will show friendly fallback messages until then

### Option 2: Upgrade to Paid Plan

- Visit: https://ai.google.dev/pricing
- Paid plans have much higher limits (1000+ requests/day)
- Very affordable for personal use

### Option 3: Create Multiple API Keys

- Create additional Google accounts
- Generate new API keys
- Switch between them in your app

## 🔧 How to Change API Key:

1. **Update the .env file:**

   ```
   VITE_GEMINI_API_KEY=your_new_api_key_here
   ```

2. **Or update geminiService.js directly:**
   ```javascript
   const API_KEY = "your_new_api_key_here";
   ```

## 📱 Your App Features:

- ✅ Smart fallback responses when quota exceeded
- ✅ Request counter to track usage
- ✅ Friendly error messages
- ✅ Professional chat interface

## 🎯 Tips to Conserve Quota:

- Test with short messages
- Don't refresh the page unnecessarily
- Use the app strategically

Your Prasad AI Assistant is working perfectly - it's just limited by the free tier quota! 🚀

import { Bot, Zap } from "lucide-react";
import React from "react";

export default function Header() {
  return (
    <div className='flex items-center justify-between w-full max-w-full mx-full  p-4 bg-gray-900 text-white shadow'>
      {/* Left side: Logo + Title */}
      <div className='flex items-center space-x-3'>
        <div className='p-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full'>
          <Bot className='w-6 h-6 text-white' />
        </div>
        <div className='flex flex-col'>
          <h1 className='text-xl font-bold'>Prasad AI Assistant</h1>
          <p className='text-sm text-gray-300'>Powered by Google Gemini</p>
        </div>
      </div>

      {/* Right side: AI Badge */}
      <div className='flex items-center space-x-1 text-sm text-purple-300 hover:text-purple-200 cursor-pointer'>
        <Zap className='w-4 h-4 animate-pulse text-yellow-400' />
        <span>AI Powered</span>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Send, Loader2 } from "lucide-react";

function ChatInput({ onSendMessage, isLoading }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className='border-t bg-white p-4'>
      <form onSubmit={handleSubmit} className='max-w-5xl mx-auto'>
        <div className='flex space-x-4'>
          <div className='flex-1 relative'>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder='Type your message here...'
              className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none'
              rows='1'
              style={{ minHeight: "44px", maxHeight: "120px" }}
              disabled={isLoading}
            />
          </div>
          <button
            type='submit'
            disabled={!message.trim() || isLoading}
            className='bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[44px]'
          >
            {isLoading ? (
              <Loader2 className='w-5 h-5 animate-spin' />
            ) : (
              <Send className='w-5 h-5' />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatInput;

import React from "react";
import { Bot, User } from "lucide-react";

function ChatMessage({ messages, formatTime }) {
  return (
    <div className='flex flex-col space-y-4 p-4'>
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.sender === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`flex max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-3 ${
              message.sender === "user"
                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
                : "bg-white text-gray-600 shadow-sm border"
            }`}
          >
            <div
              className={`flex-shrink-0 mr-3 ${
                message.sender === "user"
                  ? "text-indigo-200"
                  : "text-indigo-400"
              }`}
            >
              {message.sender === "user" ? (
                <User className='w-5 h-5' />
              ) : (
                <Bot className='w-5 h-5' />
              )}
            </div>
            <div className='flex-1 min-w-0'>
              <div className='flex justify-between items-center mb-1'>
                <span className='font-medium text-sm'>
                  {message.sender === "user" ? "You" : "Prasad AI"}
                </span>
                <span
                  className={`text-xs ml-2 ${
                    message.sender === "user" ? "opacity-70" : "text-gray-400"
                  }`}
                >
                  {formatTime
                    ? formatTime(new Date(message.timestamp))
                    : message.timestamp}
                </span>
              </div>
              <p className='text-sm break-words whitespace-pre-wrap'>
                {message.text}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatMessage;

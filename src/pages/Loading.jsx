import React from 'react';

export const Loading = () => (
  <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
    <div className="text-purple-500 font-black text-2xl animate-pulse">
      🎸 ROCK HAVEN
    </div>
    <div className="flex gap-2">
      <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"></div>
      <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
      <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
    </div>
  </div>
);
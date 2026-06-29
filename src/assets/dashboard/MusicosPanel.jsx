import React from 'react';

export const MusicosPanel = () => {
  return (
    <div className="p-8 bg-white/5 rounded-2xl">
      <h2 className="text-2xl font-black mb-4">🔍 Buscar Músicos</h2>
      <p className="text-slate-400 mb-6">Encuentra músicos cerca de ti</p>
      <div className="flex gap-2">
        <input 
          type="text" 
          placeholder="Buscar por instrumento o género..." 
          className="flex-1 bg-black p-3 rounded-lg border border-white/10"
        />
        <button className="px-6 py-3 bg-purple-600 rounded-lg font-bold">Buscar</button>
      </div>
    </div>
  );
};
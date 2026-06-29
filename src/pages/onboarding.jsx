import React from 'react';

export const Onboarding = ({ onRoleSelect }) => {
  return (
    <div className="max-w-2xl mx-auto text-center space-y-8 mt-20">
      <h1 className="text-5xl font-black uppercase tracking-tighter text-purple-500">
        ¿Quién eres hoy?
      </h1>
      <p className="text-slate-400 text-lg">
        Únete a la escena musical más grande de México
      </p>
      <div className="grid gap-4">
        <button 
          onClick={() => onRoleSelect("musician")} 
          className="p-8 bg-purple-600 hover:bg-purple-700 rounded-3xl text-2xl font-black transition-all transform hover:scale-105"
        >
          🎸 SOY MÚSICO
        </button>
        <button 
          onClick={() => onRoleSelect("business")} 
          className="p-8 bg-white/10 hover:bg-white/20 rounded-3xl text-2xl font-black transition-all transform hover:scale-105"
        >
          🏢 SOY NEGOCIO
        </button>
        <button 
          onClick={() => onRoleSelect("public")} 
          className="p-8 bg-pink-900/20 hover:bg-pink-900/40 border border-pink-500/30 rounded-3xl text-2xl font-black transition-all transform hover:scale-105"
        >
          🎵 SOY PÚBLICO
        </button>
      </div>
    </div>
  );
};
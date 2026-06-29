import React from 'react';

export const BandasPanel = () => {
  return (
    <div className="p-8 bg-white/5 rounded-2xl">
      <h2 className="text-2xl font-black mb-4">🎸 Mis Bandas</h2>
      <p className="text-slate-400 mb-6">Crea y gestiona tus proyectos musicales</p>
      <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors font-bold">
        + Crear nueva banda
      </button>
    </div>
  );
};
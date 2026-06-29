import React from 'react';

export const SalasPanel = () => {
  return (
    <div className="p-8 bg-white/5 rounded-2xl">
      <h2 className="text-2xl font-black mb-4">🏢 Salas y Estudios</h2>
      <p className="text-slate-400 mb-6">Reserva tu espacio de ensayo o grabación</p>
      <div className="bg-black/50 p-4 rounded-lg">
        <h3 className="font-bold">Sala de Ensayo Centro</h3>
        <p className="text-sm text-slate-400">Guadalajara, Jalisco • $200/hr</p>
      </div>
    </div>
  );
};
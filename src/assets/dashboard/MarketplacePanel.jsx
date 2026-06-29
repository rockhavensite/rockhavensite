import React from 'react';

export const MarketplacePanel = () => {
  return (
    <div className="p-8 bg-white/5 rounded-2xl">
      <h2 className="text-2xl font-black mb-4">🛒 Marketplace</h2>
      <p className="text-slate-400 mb-6">Compra y vende equipo musical</p>
      <div className="flex gap-2">
        <button className="px-6 py-3 bg-purple-600 rounded-lg font-bold">Comprar</button>
        <button className="px-6 py-3 bg-white/10 rounded-lg font-bold">Vender</button>
      </div>
    </div>
  );
};
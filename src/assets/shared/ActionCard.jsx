import React from 'react';
import { Users, Search, Music, ShoppingBag } from 'lucide-react';

const ICONS = {
  Users,
  Search,
  Music,
  ShoppingBag
};

export const ActionCard = ({ title, icon, description, color, onClick }) => {
  const IconComponent = ICONS[icon];
  
  return (
    <div 
      onClick={onClick} 
      className="p-6 bg-[#1a1a1a] border border-white/5 rounded-2xl hover:border-purple-500/50 hover:bg-[#222] transition-all cursor-pointer group"
    >
      {IconComponent && (
        <IconComponent 
          className="text-purple-500 mb-4 group-hover:scale-110 transition-transform" 
          size={32} 
        />
      )}
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-sm text-slate-400 mt-1">{description}</p>
    </div>
  );
};
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useProfile } from '../hooks/useProfile';
import { validateProfile, MUSICIAN_ROLES, BUSINESS_TYPES } from '../utils/validators';

export const ProfileCreation = ({ role, onBack, onSave }) => {
  const { saveProfile, saving, error: saveError, initialProfile } = useProfile();
  const [profile, setProfile] = useState(initialProfile);
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const toggleRole = (role) => {
    setProfile(prev => ({
      ...prev,
      roles: prev.roles.includes(role) 
        ? prev.roles.filter(r => r !== role)
        : [...prev.roles, role]
    }));
  };

  const handleSubmit = async () => {
    const validation = validateProfile(profile, role);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const success = await saveProfile(profile, role);
    if (success) {
      onSave();
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <button 
        onClick={onBack} 
        className="flex items-center gap-2 text-purple-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft size={16} /> Volver a selección
      </button>
      
      <h2 className="text-3xl font-black mb-6">Completa tu identidad</h2>
      
      <div className="space-y-4 bg-white/5 p-8 rounded-3xl border border-white/10">
        <div>
          <input 
            type="text" 
            placeholder="URL foto perfil" 
            className="w-full bg-black p-4 rounded-xl border border-white/10"
            value={profile.avatar}
            onChange={e => handleChange('avatar', e.target.value)}
          />
        </div>
        
        <div>
          <input 
            type="text" 
            placeholder="Nombre completo *" 
            className={`w-full bg-black p-4 rounded-xl border ${errors.fullName ? 'border-red-500' : 'border-white/10'}`}
            value={profile.fullName}
            onChange={e => handleChange('fullName', e.target.value)}
          />
          {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
        </div>
        
        <div>
          <input 
            type="text" 
            placeholder="Nombre de usuario *" 
            className={`w-full bg-black p-4 rounded-xl border ${errors.username ? 'border-red-500' : 'border-white/10'}`}
            value={profile.username}
            onChange={e => handleChange('username', e.target.value)}
          />
          {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
        </div>
        
        {role === 'musician' && (
          <>
            <div>
              <input 
                type="text" 
                placeholder="Ubicación (ej: Zapopan, Jalisco) *" 
                className={`w-full bg-black p-4 rounded-xl border ${errors.location ? 'border-red-500' : 'border-white/10'}`}
                value={profile.location}
                onChange={e => handleChange('location', e.target.value)}
              />
              {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
            </div>
            
            <input 
              type="text" 
              placeholder="Equipo / Instrumentos" 
              className="w-full bg-black p-4 rounded-xl border border-white/10"
              value={profile.equipment}
              onChange={e => handleChange('equipment', e.target.value)}
            />
            
            <div>
              <p className="text-sm font-bold text-slate-400 mb-2">Roles *:</p>
              <div className="flex flex-wrap gap-2">
                {MUSICIAN_ROLES.map(r => (
                  <button 
                    key={r} 
                    onClick={() => toggleRole(r)} 
                    className={`px-4 py-2 rounded-full border transition-all ${
                      profile.roles.includes(r) 
                        ? "bg-purple-600 border-purple-400" 
                        : "bg-black border-white/20 hover:border-purple-400"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
              {errors.roles && <p className="text-red-500 text-sm mt-1">{errors.roles}</p>}
            </div>
          </>
        )}
        
        {role === 'business' && (
          <>
            <div>
              <input 
                type="text" 
                placeholder="Nombre del Negocio *" 
                className={`w-full bg-black p-4 rounded-xl border ${errors.businessName ? 'border-red-500' : 'border-white/10'}`}
                value={profile.businessName}
                onChange={e => handleChange('businessName', e.target.value)}
              />
              {errors.businessName && <p className="text-red-500 text-sm mt-1">{errors.businessName}</p>}
            </div>
            
            <select 
              className="w-full bg-black p-4 rounded-xl border border-white/10"
              value={profile.giros[0] || ''}
              onChange={e => handleChange('giros', [e.target.value])}
            >
              <option value="">Tipo de negocio</option>
              {BUSINESS_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            
            <input 
              type="text" 
              placeholder="Dirección / Google Maps Link" 
              className="w-full bg-black p-4 rounded-xl border border-white/10"
              value={profile.address}
              onChange={e => handleChange('address', e.target.value)}
            />
            
            <div>
              <input 
                type="tel" 
                placeholder="Teléfono *" 
                className={`w-full bg-black p-4 rounded-xl border ${errors.phone ? 'border-red-500' : 'border-white/10'}`}
                value={profile.phone}
                onChange={e => handleChange('phone', e.target.value)}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>
            
            <input 
              type="url" 
              placeholder="Sitio Web" 
              className="w-full bg-black p-4 rounded-xl border border-white/10"
              value={profile.website}
              onChange={e => handleChange('website', e.target.value)}
            />
          </>
        )}
        
        {role === 'public' && (
          <input 
            type="text" 
            placeholder="Bandas / Venues Favoritos" 
            className="w-full bg-black p-4 rounded-xl border border-white/10"
            value={profile.favBands}
            onChange={e => handleChange('favBands', e.target.value)}
          />
        )}
        
        {saveError && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 text-red-400">
            {saveError}
          </div>
        )}
        
        <button 
          onClick={handleSubmit} 
          disabled={saving}
          className="w-full py-4 bg-purple-600 hover:bg-purple-700 rounded-full font-black mt-6 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? 'Guardando...' : 'Finalizar Registro'}
        </button>
      </div>
    </div>
  );
};
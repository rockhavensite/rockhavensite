import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';

const INITIAL_PROFILE = {
  fullName: "",
  username: "",
  age: "",
  location: "",
  avatar: "",
  roles: [],
  equipment: "",
  rehearsalSpace: "",
  businessName: "",
  giros: [],
  address: "",
  phone: "",
  email: "",
  socials: "",
  website: "",
  favBands: ""
};

export const useProfile = () => {
  const { user, setProfile } = useAuth();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const saveProfile = async (profileData, role) => {
    if (!user) {
      setError('No hay usuario autenticado');
      return false;
    }

    setSaving(true);
    setError(null);

    try {
      const completeProfile = {
        ...profileData,
        role,
        profileCompleted: true,
        updatedAt: new Date().toISOString(),
        createdAt: profileData.createdAt || new Date().toISOString()
      };

      await setDoc(
        doc(db, "users", user.uid), 
        completeProfile, 
        { merge: true }
      );

      setProfile(completeProfile);
      return true;
    } catch (err) {
      setError('Error al guardar perfil: ' + err.message);
      return false;
    } finally {
      setSaving(false);
    }
  };

  return {
    saveProfile,
    saving,
    error,
    initialProfile: INITIAL_PROFILE
  };
};
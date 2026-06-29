import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../config/firebase';
import { onAuthStateChanged, signInAnonymously, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

// Crear el contexto
const AuthContext = createContext(null);

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};

// Componente proveedor
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        try {
          await signInAnonymously(auth);
        } catch (error) {
          console.error('Error al iniciar sesión:', error);
        }
        return;
      }

      setUser(firebaseUser);
      
      try {
        const docSnap = await getDoc(doc(db, "users", firebaseUser.uid));
        if (docSnap.exists() && docSnap.data().profileCompleted) {
          setProfile(docSnap.data());
        }
      } catch (error) {
        console.error('Error al cargar perfil:', error);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setProfile(null);
      window.location.reload();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const value = {
    user,
    profile,
    setProfile,
    loading,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
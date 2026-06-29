import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../config/firebase';
import { onAuthStateChanged, signInAnonymously, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      // 1. Si no hay usuario, intenta anonimizar
      if (!firebaseUser) {
        try {
          await signInAnonymously(auth);
        } catch (error) {
          console.error('Error al iniciar sesión:', error);
          setLoading(false); // IMPORTANTE: Cerrar carga aunque falle
        }
        return; 
      }

      // 2. Si hay usuario, cargar perfil
      setUser(firebaseUser);
      try {
        const docSnap = await getDoc(doc(db, "users", firebaseUser.uid));
        if (docSnap.exists() && docSnap.data().profileCompleted) {
          setProfile(docSnap.data());
        }
      } catch (error) {
        console.error('Error al cargar perfil:', error);
      }
      
      // 3. Finalizar carga siempre al tener usuario o tras el intento
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

  return (
    <AuthContext.Provider value={{ user, profile, setProfile, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDMe5-rgDAQJr4T449uJL91fM1rVukHSZA",
  authDomain: "rock-haven-f6d79.firebaseapp.com",
  projectId: "rock-haven-f6d79",
  storageBucket: "rock-haven-f6d79.firebasestorage.app",
  messagingSenderId: "204596988404",
  appId: "1:204596988404:web:15fb7cda8de5cbc13351a1"
};

// Inicializar Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
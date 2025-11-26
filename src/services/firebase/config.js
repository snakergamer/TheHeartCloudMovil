
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

// Obtener variables de entorno desde app.config.js (extra)
const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.VITE_FIREBASE_API_KEY,
  authDomain: Constants.expoConfig?.extra?.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: Constants.expoConfig?.extra?.VITE_FIREBASE_PROJECT_ID,
  storageBucket: Constants.expoConfig?.extra?.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Constants.expoConfig?.extra?.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: Constants.expoConfig?.extra?.VITE_FIREBASE_APP_ID,
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Auth con persistencia de AsyncStorage
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;

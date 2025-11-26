/**
 * Firebase Auth Service
 * Servicios de autenticación con Firebase
 */

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';
import { auth } from './config';

const authService = {
  // Registro
  register: async (email, password, name) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Actualizar perfil con nombre
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      return {
        user: userCredential.user,
        uid: userCredential.user.uid,
      };
    } catch (error) {
      throw {
        code: error.code,
        message: error.message,
      };
    }
  },

  // Login
  login: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return {
        user: userCredential.user,
        uid: userCredential.user.uid,
      };
    } catch (error) {
      throw {
        code: error.code,
        message: error.message,
      };
    }
  },

  // Logout
  logout: async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  },

  // Recuperar contraseña
  sendPasswordReset: async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw error;
    }
  },

  // Obtener usuario actual
  getCurrentUser: () => {
    return auth.currentUser;
  },

  // Escuchar cambios de autenticación
  onAuthStateChanged: (callback) => {
    return auth.onAuthStateChanged(callback);
  },
};

export default authService;

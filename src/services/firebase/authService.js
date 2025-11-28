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
  fetchSignInMethodsForEmail,
} from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from './config';

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

  // Verificar si el correo existe
  checkEmailExists: async (email) => {
    try {
      // Intentar primero con fetchSignInMethodsForEmail (método nativo)
      // Si falla o devuelve array vacío (por seguridad), consultar Firestore
      try {
        const methods = await fetchSignInMethodsForEmail(auth, email);
        if (methods && methods.length > 0) return true;
      } catch (e) {
        // Ignorar error y probar Firestore
      }

      // Fallback: Consultar colección de usuarios
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', email));
      const snapshot = await getDocs(q);
      return !snapshot.empty;
    } catch (error) {
      console.log('Check email error:', error);
      // Si todo falla, devolver true para no bloquear (fail open)
      return true;
    }
  },
};

export default authService;

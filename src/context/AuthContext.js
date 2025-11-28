/**
 * Auth Context
 * Contexto global para autenticación con Firebase
 */

import React, { createContext, useReducer, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authService from '../services/firebase/authService';
import { userService } from '../services/firebase/firestoreService';
import { getFirebaseErrorMessage } from '../utils/firebaseErrors';

export const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  token: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
      };
    case 'LOGIN_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'REGISTER_REQUEST':
      return { ...state, loading: true, error: null };
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
      };
    case 'REGISTER_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'LOGOUT':
      return initialState;
    case 'UPDATE_USER':
      return { ...state, user: { ...state.user, ...action.payload } };
    case 'DELETE_ACCOUNT':
      return initialState;
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload, isAuthenticated: !!action.payload };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Verificar si el usuario ya está autenticado al iniciar
  useEffect(() => {
    let unsubscribe;

    const checkAuth = async () => {
      try {
        // Solo escuchar cambios de autenticación cuando ya hay un usuario autenticado
        if (state.isAuthenticated) {
          unsubscribe = authService.onAuthStateChanged(async (firebaseUser) => {
            if (!firebaseUser) {
              // Usuario se deslogueó
              dispatch({ type: 'SET_USER', payload: null });
            }
          });
        }
      } catch (error) {
        console.error('Auth check error:', error);
      }
    };

    checkAuth();
    return () => unsubscribe?.();
  }, [state.isAuthenticated]);

  const login = useCallback(async (email, password) => {
    dispatch({ type: 'LOGIN_REQUEST' });
    try {
      const result = await authService.login(email, password);
      const userData = await userService.getById(result.uid);

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: {
            uid: result.uid,
            email: result.user.email,
            name: result.user.displayName,
            ...userData,
          },
          token: await result.user.getIdToken(),
        },
      });
    } catch (error) {
      console.log('Login Error:', error.code);
      dispatch({ type: 'LOGIN_ERROR', payload: getFirebaseErrorMessage(error.code || error.message) });
      throw error;
    }
  }, []);

  const register = useCallback(async (userData) => {
    dispatch({ type: 'REGISTER_REQUEST' });
    try {
      const result = await authService.register(userData.email, userData.password, userData.name);

      // Guardar datos adicionales en Firestore
      await userService.create(result.uid, {
        name: userData.name,
        email: userData.email,
        bio: '',
        postsCount: 0,
        forumsJoined: [],
        securityQuestion: userData.securityQuestion,
        securityAnswer: userData.securityAnswer,
      });

      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: {
          user: {
            uid: result.uid,
            email: result.user.email,
            name: userData.name,
          },
          token: await result.user.getIdToken(),
        },
      });
    } catch (error) {
      console.log('Register Error:', error.code);
      dispatch({ type: 'REGISTER_ERROR', payload: getFirebaseErrorMessage(error.code || error.message) });
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: getFirebaseErrorMessage(error.code || error.message) });
    }
  }, []);

  const updateUser = useCallback(async (userData) => {
    try {
      if (state.user?.uid) {
        await userService.update(state.user.uid, userData);
        dispatch({ type: 'UPDATE_USER', payload: userData });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: getFirebaseErrorMessage(error.code || error.message) });
      throw error;
    }
  }, [state.user]);

  const deleteAccount = useCallback(async () => {
    try {
      if (state.user?.uid) {
        await userService.delete(state.user.uid);
        await authService.logout();
        dispatch({ type: 'DELETE_ACCOUNT' });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: getFirebaseErrorMessage(error.code || error.message) });
      throw error;
    }
  }, [state.user]);

  const setError = useCallback((error) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  }, []);

  const value = {
    ...state,
    login,
    register,
    logout,
    updateUser,
    deleteAccount,
    setError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Auth Service
 * Maneja todas las llamadas API relacionadas con autenticación
 */

import API_CONFIG from '../config';

const authService = {
  login: async (email, password) => {
    try {
      // POST /auth/login
      console.log('Login:', { email });
    } catch (error) {
      throw error;
    }
  },

  register: async (userData) => {
    try {
      // POST /auth/register
      console.log('Register:', userData);
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      // POST /auth/logout
      console.log('Logout');
    } catch (error) {
      throw error;
    }
  },

  refreshToken: async (token) => {
    try {
      // POST /auth/refresh
      console.log('Refreshing token');
    } catch (error) {
      throw error;
    }
  },

  forgotPassword: async (email) => {
    try {
      // POST /auth/forgot-password
      console.log('Forgot password:', { email });
    } catch (error) {
      throw error;
    }
  },
};

export default authService;

/**
 * useAuthHook
 * Maneja la lógica específica de autenticación
 */

import { useState, useCallback } from 'react';

const useAuthHook = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      // Lógica de login
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  return { isAuthenticated, user, loading, error, login, logout };
};

export default useAuthHook;

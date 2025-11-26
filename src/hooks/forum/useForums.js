/**
 * useForums Hook
 * Maneja la lógica de foros
 */

import { useState, useCallback } from 'react';

const useForums = () => {
  const [forums, setForums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchForums = useCallback(async () => {
    setLoading(true);
    try {
      // Llamada a API aquí
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { forums, loading, error, fetchForums, setForums };
};

export default useForums;

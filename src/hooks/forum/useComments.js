/**
 * useComments Hook
 * Maneja la lógica de comentarios
 */

import { useState, useCallback } from 'react';

const useComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchComments = useCallback(async (postId) => {
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

  const createComment = useCallback(async (commentData) => {
    try {
      // Llamada a API para crear comentario
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  return { comments, loading, error, fetchComments, createComment, setComments };
};

export default useComments;

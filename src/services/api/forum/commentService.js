/**
 * Comment Service
 * Maneja todas las llamadas API relacionadas con comentarios
 */

import API_CONFIG from '../config';

const commentService = {
  getAll: async (postId) => {
    try {
      // GET /posts/:postId/comments
      console.log(`${API_CONFIG.BASE_URL}/posts/${postId}/comments`);
    } catch (error) {
      throw error;
    }
  },

  create: async (postId, commentData) => {
    try {
      // POST /posts/:postId/comments
      console.log(`Creating comment in post ${postId}:`, commentData);
    } catch (error) {
      throw error;
    }
  },

  update: async (commentId, commentData) => {
    try {
      // PUT /comments/:id
      console.log(`Updating comment ${commentId}:`, commentData);
    } catch (error) {
      throw error;
    }
  },

  delete: async (commentId) => {
    try {
      // DELETE /comments/:id
      console.log(`Deleting comment ${commentId}`);
    } catch (error) {
      throw error;
    }
  },

  likeComment: async (commentId) => {
    try {
      // POST /comments/:id/like
      console.log(`Liking comment ${commentId}`);
    } catch (error) {
      throw error;
    }
  },
};

export default commentService;

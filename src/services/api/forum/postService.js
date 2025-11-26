/**
 * Post Service
 * Maneja todas las llamadas API relacionadas con posts
 */

import API_CONFIG from '../config';

const postService = {
  getAll: async (forumId) => {
    try {
      // GET /forums/:forumId/posts
      console.log(`${API_CONFIG.BASE_URL}/forums/${forumId}/posts`);
    } catch (error) {
      throw error;
    }
  },

  getById: async (postId) => {
    try {
      // GET /posts/:id
      console.log(`${API_CONFIG.BASE_URL}/posts/${postId}`);
    } catch (error) {
      throw error;
    }
  },

  create: async (forumId, postData) => {
    try {
      // POST /forums/:forumId/posts
      console.log(`Creating post in forum ${forumId}:`, postData);
    } catch (error) {
      throw error;
    }
  },

  update: async (postId, postData) => {
    try {
      // PUT /posts/:id
      console.log(`Updating post ${postId}:`, postData);
    } catch (error) {
      throw error;
    }
  },

  delete: async (postId) => {
    try {
      // DELETE /posts/:id
      console.log(`Deleting post ${postId}`);
    } catch (error) {
      throw error;
    }
  },

  likePost: async (postId) => {
    try {
      // POST /posts/:id/like
      console.log(`Liking post ${postId}`);
    } catch (error) {
      throw error;
    }
  },
};

export default postService;

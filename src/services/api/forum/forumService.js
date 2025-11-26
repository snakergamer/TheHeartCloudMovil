/**
 * Forum Service
 * Maneja todas las llamadas API relacionadas con foros
 */

import API_CONFIG from '../config';

const forumService = {
  getAll: async () => {
    try {
      // GET /forums
      console.log(`${API_CONFIG.BASE_URL}/forums`);
    } catch (error) {
      throw error;
    }
  },

  getById: async (forumId) => {
    try {
      // GET /forums/:id
      console.log(`${API_CONFIG.BASE_URL}/forums/${forumId}`);
    } catch (error) {
      throw error;
    }
  },

  create: async (forumData) => {
    try {
      // POST /forums
      console.log('Creating forum:', forumData);
    } catch (error) {
      throw error;
    }
  },

  update: async (forumId, forumData) => {
    try {
      // PUT /forums/:id
      console.log(`Updating forum ${forumId}:`, forumData);
    } catch (error) {
      throw error;
    }
  },

  delete: async (forumId) => {
    try {
      // DELETE /forums/:id
      console.log(`Deleting forum ${forumId}`);
    } catch (error) {
      throw error;
    }
  },
};

export default forumService;

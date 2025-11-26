/**
 * API Configuration
 * Configuración base para todas las peticiones API
 */

const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
  TIMEOUT: 30000,
  HEADERS: {
    'Content-Type': 'application/json',
  },
};

export default API_CONFIG;

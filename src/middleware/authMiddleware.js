/**
 * Auth Middleware
 * Valida y maneja la autenticación de las peticiones
 */

export const authMiddleware = (config, token) => {
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
};

export default authMiddleware;

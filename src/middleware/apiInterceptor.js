/**
 * API Interceptor
 * Maneja autenticación, errores y transformación de respuestas
 */

import API_CONFIG from './config';

const createApiClient = (axiosInstance) => {
  // Interceptor de solicitud
  axiosInstance.interceptors.request.use(
    (config) => {
      // Aquí puedes agregar el token de autenticación
      // const token = await getToken();
      // config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Interceptor de respuesta
  axiosInstance.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      if (error.response) {
        console.error('Error Response:', error.response.status);
      } else if (error.request) {
        console.error('Error Request:', error.request);
      } else {
        console.error('Error:', error.message);
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default createApiClient;

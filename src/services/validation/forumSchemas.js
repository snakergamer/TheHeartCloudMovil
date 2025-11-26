/**
 * Forum Validation Schemas
 * Esquemas de validación para posts y comentarios
 */

import * as yup from 'yup';

// Schema para crear/editar publicación (Post)
export const postSchema = yup.object().shape({
  title: yup
    .string()
    .required('El título es obligatorio')
    .min(5, 'El título debe tener al menos 5 caracteres')
    .max(100, 'El título no puede exceder 100 caracteres'),

  content: yup
    .string()
    .required('El contenido es obligatorio')
    .min(10, 'El contenido debe tener al menos 10 caracteres')
    .max(300, 'El contenido no puede exceder 300 caracteres'),
});

// Schema para crear/editar comentario (Comment)
export const commentSchema = yup.object().shape({
  content: yup
    .string()
    .required('El comentario es obligatorio')
    .min(5, 'El comentario debe tener al menos 5 caracteres')
    .max(150, 'El comentario no puede exceder 150 caracteres'),
});

// Schema para editar perfil
export const editProfileSchema = yup.object().shape({
  name: yup
    .string()
    .required('El nombre es obligatorio')
    .min(5, 'El nombre debe tener al menos 5 caracteres')
    .max(15, 'El nombre no puede exceder 15 caracteres')
    .matches(/^[a-zA-Z0-9]*$/, 'El nombre solo puede contener letras y números'),

  bio: yup
    .string()
    .max(250, 'La biografía no puede exceder 250 caracteres'),
});

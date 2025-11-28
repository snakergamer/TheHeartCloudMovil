/**
 * Validation Schemas
 * Esquemas de validación para autenticación usando Yup
 */

import * as yup from 'yup';

// Expresiones regulares
const ALPHANUMERIC_REGEX = /^[a-zA-Z0-9]*$/;
const NO_ACCENTS_REGEX = /^[a-zA-Z0-9\s]*$/;
const NO_SPECIAL_CHARS_REGEX = /^[a-zA-Z0-9\s]*$/;

// Schema de Registro
export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .required('El nombre es obligatorio')
    .min(5, 'El nombre debe tener al menos 5 caracteres')
    .max(15, 'El nombre no puede exceder 15 caracteres')
    .matches(ALPHANUMERIC_REGEX, 'El nombre solo puede contener letras y números'),

  email: yup
    .string()
    .required('El correo es obligatorio')
    .min(5, 'El correo debe tener al menos 5 caracteres')
    .max(100, 'El correo no puede exceder 100 caracteres')
    .email('Debe ser un correo válido'),

  password: yup
    .string()
    .required('La contraseña es obligatoria')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(16, 'La contraseña no puede exceder 16 caracteres')
    .test('no-spaces', 'La contraseña no puede contener espacios', (value) => !value || !/\s/.test(value))
    .test('no-quotes', 'La contraseña no puede contener comillas', (value) => !value || !/['"`]/.test(value)),

  confirmPassword: yup
    .string()
    .required('Debe confirmar la contraseña')
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden'),

  securityQuestion: yup
    .string()
    .required('La pregunta de seguridad es obligatoria')
    .min(10, 'La pregunta debe tener al menos 10 caracteres')
    .max(100, 'La pregunta no puede exceder 100 caracteres'),

  securityAnswer: yup
    .string()
    .required('La respuesta de seguridad es obligatoria')
    .min(2, 'La respuesta debe tener al menos 2 caracteres')
    .max(60, 'La respuesta no puede exceder 60 caracteres')
    .matches(NO_ACCENTS_REGEX, 'La respuesta no puede contener acentos ni símbolos especiales'),

  termsAccepted: yup
    .boolean()
    .oneOf([true], 'Debes aceptar los términos y condiciones'),
});

// Schema de Login
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('El correo es obligatorio')
    .min(5, 'El correo debe tener al menos 5 caracteres')
    .max(100, 'El correo no puede exceder 100 caracteres')
    .email('Debe ser un correo válido'),

  password: yup
    .string()
    .required('La contraseña es obligatoria')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(16, 'La contraseña no puede exceder 16 caracteres'),

  rememberMe: yup.boolean(),
});

// Schema de Recuperar Contraseña
export const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .required('El correo es obligatorio')
    .email('Debe ser un correo válido'),
});

// Schema de Validar Respuesta de Seguridad
export const securityAnswerSchema = yup.object().shape({
  answer: yup
    .string()
    .required('La respuesta es obligatoria')
    .min(2, 'La respuesta debe tener al menos 2 caracteres')
    .max(60, 'La respuesta no puede exceder 60 caracteres')
    .matches(NO_ACCENTS_REGEX, 'La respuesta no puede contener acentos ni símbolos'),
});

// Schema de Nueva Contraseña
export const newPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required('La contraseña es obligatoria')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(16, 'La contraseña no puede exceder 16 caracteres')
    .test('no-spaces', 'La contraseña no puede contener espacios', (value) => !value || !/\s/.test(value))
    .test('no-quotes', 'La contraseña no puede contener comillas', (value) => !value || !/['"`]/.test(value)),

  confirmPassword: yup
    .string()
    .required('Debe confirmar la contraseña')
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden'),
});

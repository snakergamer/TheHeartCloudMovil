/**
 * Firebase Error Messages
 * Mapeo de códigos de error de Firebase a mensajes amigables en español
 */

export const getFirebaseErrorMessage = (errorCode) => {
    switch (errorCode) {
        case 'auth/user-not-found':
            return 'No se encontró ninguna cuenta con este correo electrónico.';
        case 'auth/wrong-password':
            return 'La contraseña es incorrecta.';
        case 'auth/email-already-in-use':
            return 'Este correo electrónico ya está registrado.';
        case 'auth/invalid-email':
            return 'El formato del correo electrónico no es válido.';
        case 'auth/weak-password':
            return 'La contraseña es muy débil. Debe tener al menos 6 caracteres.';
        case 'auth/network-request-failed':
            return 'Error de conexión. Verifica tu internet.';
        case 'auth/too-many-requests':
            return 'Demasiados intentos fallidos. Intenta de nuevo más tarde.';
        case 'auth/user-disabled':
            return 'Esta cuenta ha sido deshabilitada.';
        case 'auth/operation-not-allowed':
            return 'Operación no permitida.';
        case 'auth/requires-recent-login':
            return 'Por seguridad, inicia sesión nuevamente para realizar esta acción.';
        default:
            // Si el error no es un código de string (ej. es un objeto Error), devolver su mensaje o un genérico
            if (typeof errorCode !== 'string') {
                return errorCode?.message || 'Ocurrió un error inesperado. Intenta de nuevo.';
            }
            // Si es un código pero no está en la lista
            if (errorCode.startsWith('auth/')) {
                return 'Error de autenticación. Intenta de nuevo.';
            }
            return 'Ocurrió un error inesperado.';
    }
};

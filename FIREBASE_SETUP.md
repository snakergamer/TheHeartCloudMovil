# Firebase Setup Guide - TheHeartCloud

## 🔥 Configuración de Firebase

### 1. Crear Proyecto en Firebase Console

1. Ve a [Firebase Console](https://console.firebase.google.com)
2. Haz clic en "Agregar proyecto"
3. Nombre del proyecto: `TheHeartCloud` (o el que prefieras)
4. Habilita Google Analytics (opcional)
5. Crea el proyecto

### 2. Configurar Autenticación

1. Ve a **Authentication** en el panel lateral izquierdo
2. Haz clic en "Comenzar"
3. Elige **Email/Password** como método de autenticación
4. Actívalo y guarda

**Métodos de autenticación habilitados:**
- ✅ Email/Password
- ✅ Google (opcional)
- ✅ Facebook (opcional)

### 3. Configurar Firestore Database

1. Ve a **Firestore Database**
2. Haz clic en "Crear base de datos"
3. Elige ubicación cercana a tu región
4. Inicia en modo prueba (para desarrollo)
5. Crear

**Reglas de seguridad (temporales para desarrollo):**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

**⚠️ IMPORTANTE:** Estas reglas no son seguras para producción. Antes de ir a producción, configura reglas específicas.

### 4. Estructura de Colecciones en Firestore

#### Forums Collection
```javascript
// /forums/{forumId}
{
  id: string,
  name: string,
  description: string,
  category: string,
  image: string,
  postsCount: number,
  membersCount: number,
  createdAt: timestamp,
  updatedAt: timestamp,
}
```

#### Posts Collection
```javascript
// /posts/{postId}
{
  id: string,
  forumId: string,           // ref a forums
  title: string,
  content: string,
  author: {
    id: string,
    name: string,
    avatar: string,
  },
  likes: number,
  commentsCount: number,
  createdAt: timestamp,
  updatedAt: timestamp,
}
```

#### Comments Collection
```javascript
// /comments/{commentId}
{
  id: string,
  postId: string,            // ref a posts
  content: string,
  author: {
    id: string,
    name: string,
    avatar: string,
  },
  likes: number,
  createdAt: timestamp,
  updatedAt: timestamp,
}
```

#### Users Collection
```javascript
// /users/{uid}
{
  uid: string,               // Firebase Auth UID
  email: string,
  name: string,
  bio: string,
  avatar: string,
  postsCount: number,
  forumsJoined: string[],
  securityQuestion: string,
  securityAnswer: string,
  createdAt: timestamp,
  updatedAt: timestamp,
}
```

### 5. Obtener Credenciales de Firebase

1. Ve a **Project Settings** (engranaje en la esquina superior)
2. Selecciona la pestaña **Service Accounts**
3. Copia el contenido de `firebaseConfig`

Debería verse así:
```javascript
{
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
}
```

### 6. Configurar Variables de Entorno

1. Copia `.env.example` a `.env.local`
2. Completa con tus credenciales de Firebase:

```bash
EXPO_PUBLIC_FIREBASE_API_KEY=AIza...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
EXPO_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123def456
```

### 7. Instalar Firebase SDK

```bash
# Ya está en package.json, solo ejecuta:
npm install
```

## 🔐 Reglas de Seguridad (Producción)

Para producción, usa estas reglas más restrictivas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Usuarios - Solo pueden leer/escribir sus propios datos
    match /users/{uid} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == uid;
    }
    
    // Foros - Lectura pública, escritura restringida
    match /forums/{forumId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && isAdmin(request.auth.uid);
    }
    
    // Posts - Lectura pública, solo autor puede escribir
    match /posts/{postId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth.uid == resource.data.author.id;
    }
    
    // Comentarios - Similar a posts
    match /comments/{commentId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth.uid == resource.data.author.id;
    }
  }
  
  function isAdmin(uid) {
    return get(/databases/$(database)/documents/users/$(uid)).data.isAdmin == true;
  }
}
```

## 📊 Índices en Firestore

Firestore puede sugerir crear índices. Acepta todas las sugerencias para mejor performance.

Índices recomendados:
- `forums`: Ninguno requerido
- `posts`: Índice en (forumId, createdAt)
- `comments`: Índice en (postId, createdAt)
- `users`: Ninguno requerido

## 🧪 Testing Firebase en Local

### Usar Firebase Emulator (Opcional)

```bash
npm install -g firebase-tools
firebase init emulators
npm run build && firebase emulators:start
```

## 🚀 Deployment a Producción

### 1. Crear aplicación para Expo

En Firebase Console, ve a **Project Settings** y crea una nueva aplicación web:
- Copia el config
- Reemplaza en tu `.env.local`

### 2. Actualizar Reglas de Seguridad

- Cambia a las reglas de producción (ver arriba)
- Haz pruebas exhaustivas

### 3. Deploy

```bash
# Para iOS
eas build --platform ios --auto-submit

# Para Android
eas build --platform android --auto-submit
```

## 🐛 Troubleshooting

### Error: "Invalid API Key"
- Verifica que las credenciales en `.env.local` sean correctas
- Asegúrate de que Firebase Authentication esté habilitada

### Error: "Permission denied"
- Verifica las reglas de Firestore
- En desarrollo, usa las reglas permisivas (modo prueba)

### Error: "Cannot create user"
- Verifica que Email/Password esté habilitado en Authentication

### Datos no se guardan
- Abre Firestore Console y verifica la estructura
- Revisa la consola del navegador para errores

## 📱 Usar en la App

### Login
```javascript
import { authService } from '../services/firebase';

const { login } = useContext(AuthContext);
await login(email, password);
```

### Crear Forum
```javascript
import { forumService } from '../services/firebase';

const forum = await forumService.create({
  name: 'Salud Mental',
  description: 'Espacio para compartir sobre salud mental',
  category: 'Bienestar',
  image: '',
  postsCount: 0,
  membersCount: 1,
});
```

### Crear Post
```javascript
import { postService } from '../services/firebase';

const post = await postService.create({
  forumId: forumId,
  title: 'Mi experiencia',
  content: 'Contenido del post...',
  author: {
    id: userId,
    name: userName,
    avatar: userAvatar,
  },
});
```

## 📚 Recursos

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Firestore](https://firebase.google.com/docs/firestore)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [React Native Firebase](https://rnfirebase.io/)

## ✅ Checklist de Configuración

- [ ] Proyecto creado en Firebase Console
- [ ] Autenticación habilitada (Email/Password)
- [ ] Firestore Database creada
- [ ] Colecciones documentadas
- [ ] Credenciales obtenidas
- [ ] `.env.local` configurado
- [ ] npm install ejecutado
- [ ] App funcionando con Firebase
- [ ] Reglas de seguridad revisadas

---

**¡Tu app ya está conectada a Firebase!** 🎉

# Estructura de Proyecto - TheHeartCloudMovil

## 📁 Organización General

La aplicación está organizada en una arquitectura modular y escalable optimizada para una app de foros.

### Estructura Actual

```
src/
├── app/                    # Configuración principal de la app
├── assets/                 # Imágenes, fuentes, etc.
├── components/
│   ├── common/            # Componentes reutilizables
│   ├── forms/             # Componentes de formularios
│   ├── forum/             # Componentes específicos de foros
│   └── shared/            # Componentes compartidos globales
├── context/               # Contextos de React (AppContext, AuthContext)
├── hooks/
│   ├── auth/             # Hooks de autenticación
│   ├── forum/            # Hooks de foros
│   ├── useApi.js         # Hook para peticiones API
│   ├── useAuth.js        # Hook general de autenticación
│   ├── useForm.js        # Hook para formularios
│   └── index.js
├── middleware/            # Interceptores y middleware de API
│   ├── authMiddleware.js  # Middleware de autenticación
│   ├── apiInterceptor.js  # Interceptor de peticiones
│   └── index.js
├── models/               # Modelos/tipos de datos
│   ├── Forum.js
│   ├── Post.js
│   ├── Comment.js
│   ├── User.js
│   └── index.js
├── navigation/           # Navegación de la app
├── screens/             # Pantallas de la aplicación
├── services/
│   └── api/
│       ├── config.js              # Configuración base de API
│       ├── auth/                  # Servicios de autenticación
│       │   ├── authService.js
│       │   └── index.js
│       ├── forum/                 # Servicios de foros
│       │   ├── forumService.js
│       │   ├── postService.js
│       │   ├── commentService.js
│       │   └── index.js
│       ├── comments.js            # (Legacy - puede eliminarse)
│       ├── forums.js              # (Legacy - puede eliminarse)
│       ├── posts.js               # (Legacy - puede eliminarse)
│       └── index.js
├── storage/             # Almacenamiento local
├── styles/              # Estilos globales
├── utils/              # Utilidades y constantes
└── validation/         # Validación de esquemas
```

## 🎯 Propósito de Cada Carpeta

### `/models`
Define la estructura de datos de la aplicación:
- **Forum.js** - Estructura de un foro
- **Post.js** - Estructura de un post
- **Comment.js** - Estructura de un comentario
- **User.js** - Estructura de un usuario

### `/hooks/forum`
Hooks específicos para lógica de foros:
- **useForums** - Obtener y gestionar foros
- **usePosts** - Obtener y crear posts
- **useComments** - Obtener y crear comentarios

### `/hooks/auth`
Hooks específicos para autenticación:
- **useAuthHook** - Lógica de login/logout

### `/middleware`
Interceptores y middleware de API:
- **authMiddleware.js** - Agrega token a peticiones
- **apiInterceptor.js** - Maneja respuestas y errores

### `/services/api/auth`
Servicios de autenticación:
- **authService.js** - Login, registro, logout

### `/services/api/forum`
Servicios de foros, posts y comentarios:
- **forumService.js** - CRUD de foros
- **postService.js** - CRUD de posts
- **commentService.js** - CRUD de comentarios

### `/services/api/config.js`
Configuración centralizada de la API:
- BASE_URL
- TIMEOUT
- HEADERS por defecto

## 📝 Cómo Usar

### Importar Modelos
```javascript
import { Forum, Post, Comment, User } from '@/models';
```

### Usar Hooks de Foros
```javascript
import { useForums, usePosts } from '@/hooks/forum';

function MyComponent() {
  const { forums, loading } = useForums();
  const { posts, createPost } = usePosts();
  // ...
}
```

### Usar Servicios de API
```javascript
import { forumService, postService } from '@/services/api/forum';

const forums = await forumService.getAll();
const posts = await postService.getAll(forumId);
```

## 🚀 Próximos Pasos

1. **Integrar cliente HTTP** (axios o fetch)
2. **Implementar contextos globales** con los servicios
3. **Conectar con API real** en `authService.js` y servicios de foros
4. **Agregar validación** con esquemas Yup/Zod
5. **Implementar caché** en servicios

## 📦 Dependencias Recomendadas

- `axios` - Cliente HTTP
- `@react-navigation/native` - Navegación
- `yup` o `zod` - Validación de esquemas
- `react-hook-form` - Manejo de formularios


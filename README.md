# Tyba Challenge 🚀

API REST desarrollada con Node.js que permite la gestión de usuarios y búsqueda de restaurantes por ubicación, implementando las mejores prácticas de desarrollo y arquitectura de software.

## 📋 Descripción

Tyba Challenge es una aplicación backend que proporciona servicios de autenticación de usuarios y búsqueda de restaurantes. La aplicación está construida con una arquitectura modular y escalable, siguiendo principios SOLID y patrones de diseño modernos.

## ✨ Características Actuales

- **Autenticación de Usuarios**
  - Registro de nuevos usuarios
  - Inicio de sesión con JWT
  - Cierre de sesión seguro
- **Sistema de Logs**
  - EventSubscriber para registro de transacciones
  - Trazabilidad completa de operaciones
- **Seguridad**
  - Rate limiting implementado
  - Autenticación JWT
  - Validación de datos con Celebrate
- **Calidad de Código**
  - Linters configurados (ESLint)
  - Pre-commit hooks con Husky
  - Formateo automático con Prettier
  - TypeScript para type safety
- **Infraestructura**
  - Docker Compose configurado
  - Base de datos MongoDB
  - Variables de entorno con DotENV

## 🚧 Características en Desarrollo

- [ ] Endpoint para obtener restaurantes por ciudad o coordenadas
- [ ] Pruebas unitarias
- [ ] Paginación para logs de transacciones
- [ ] Frontend sencillo para interacción con la API
- [ ] Versionado y documentación de APIs (Swagger/OpenAPI)
- [ ] Manejador global de excepciones

## 🛠️ Tecnologías

- **Runtime**: Node.js
- **Lenguaje**: TypeScript
- **Framework**: Express.js
- **Base de Datos**: MongoDB
- **Autenticación**: JWT (JSON Web Tokens)
- **Validación**: Celebrate (Joi)
- **Contenedores**: Docker & Docker Compose
- **Event System**: EventDispatch
- **Linting**: ESLint
- **Formatting**: Prettier
- **Git Hooks**: Husky
- **Variables de Entorno**: DotENV

## 🏗️ Arquitectura

El proyecto sigue una arquitectura modular y escalable con las siguientes capas:

```
src/
├── api/          # Middlewares y rutas
├── config/       # Configuraciones de la aplicación
├── interfaces/   # Interfaces TypeScript
├── loaders/      # Inicializadores de servicios
├── models/       # Modelos de datos
├── services/     # Lógica de negocio
├── subscribers/  # Event listeners
└── types/        # Tipos TypeScript personalizados
```

Esta estructura permite:

- Separación clara de responsabilidades
- Fácil testeo de componentes
- Reutilización de servicios para CLI o pruebas
- Escalabilidad horizontal

## 🚀 Instalación

### Prerrequisitos

- Node.js (v14 o superior)
- Docker y Docker Compose
- MongoDB (si no usas Docker)

### Pasos de instalación

1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/tyba-challenge.git
cd tyba-challenge
```

2. Instalar dependencias

```bash
npm install
```

3. Configurar variables de entorno

```bash
cp .env.example .env
# Editar .env con tus configuraciones
```

4. Iniciar con Docker Compose

```bash
docker-compose up -d
```

5. Iniciar en modo desarrollo

```bash
npm run dev
```

## 📝 Uso

### Endpoints Disponibles

#### Autenticación

**Registro de Usuario**

```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "usuario@ejemplo.com",
  "password": "password123",
  "name": "Nombre Usuario"
}
```

**Inicio de Sesión**

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "usuario@ejemplo.com",
  "password": "password123"
}
```

**Cerrar Sesión**

```http
POST /api/auth/logout
Authorization: Bearer {token}
```

#### Logs de Transacciones

**Obtener logs del usuario** (requiere autenticación)

```http
GET /api/transactions
Authorization: Bearer {token}
```

### Rate Limiting

La API implementa rate limiting para prevenir abuso:

- Límite: 100 peticiones por ventana de 15 minutos
- Se aplica por IP

## 🧪 Testing

```bash
# Ejecutar pruebas unitarias (próximamente)
npm test

# Ejecutar pruebas con coverage
npm run test:coverage
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia el servidor en modo desarrollo

# Producción
npm run build        # Compila TypeScript a JavaScript
npm start           # Inicia el servidor en producción

# Calidad de código
npm run lint        # Ejecuta ESLint
npm run format      # Formatea código con Prettier

# Docker
docker-compose up   # Inicia todos los servicios
docker-compose down # Detiene todos los servicios
```

## 📁 Estructura del Proyecto

```
tyba-challenge/
├── src/
│   ├── api/
│   │   ├── routes/
│   │   └── middlewares/
│   ├── config/
│   │   └── index.ts
│   ├── interfaces/
│   │   ├── IUser.ts
│   │   ├── ...
│   │   ├── ...
│   │   └── ITransaction.ts
│   ├── loaders/
│   │   ├── express.ts
│   │   ├── mongoose.ts
│   │   ├── ....
│   │   ├── ....
│   │   ├── ....
│   │   └── index.ts
│   ├── models/
│   │   ├── user.ts
│   │   └── transactionLog.ts
│   ├── services/
│   │   ├── auth.ts
│   │   ├── ...
│   │   ├── ...
│   │   └── transaction.ts
│   ├── subscribers/
│   │   ├── lgo.ts
│   │   └── events.ts
│   ├── types/
│   │   └── index.d.ts
│   └── server.ts
├── tests/
├── .env
├── .env.example
├── .eslintrc.js
├── .gitignore
├── .prettierrc
├── docker-compose.yml
├── Dockerfile
├── package.json
├── tsconfig.json
└── README.md
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea tu Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m '⭐ feat(scope): some AmazingFeature'`)
4. Push a la Branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Estándares de Código

- Seguir la guía de estilo definida en ESLint
- Escribir código en TypeScript
- Documentar funciones complejas
- Mantener la cobertura de pruebas > 80%

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Autor

**Tu Nombre**

- GitHub: [@tu-usuario](https://github.com/CamiloBarros)
- LinkedIn: [tu-perfil](https://linkedin.com/in/ocbarrosr)

## 🙏 Agradecimientos

- Tyba por el challenge
- La comunidad de Node.js
- Todos los contribuidores del proyecto

---

⭐️ Si este proyecto te ha sido útil, considera darle una estrella!

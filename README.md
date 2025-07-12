# Tyba Challenge

API REST desarrollada con TypeScript, Express y MongoDB.

## 🚀 Tecnologías

- **TypeScript** - Tipado estático
- **Express** - Framework web
- **MongoDB** - Base de datos
- **ESLint** - Linting
- **Prettier** - Formateo de código
- **Husky** - Git hooks
- **tsx** - Ejecución TypeScript

## 📦 Instalación

```bash
# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env

# Ejecutar en desarrollo
pnpm dev
```

## 🔧 Scripts disponibles

```bash
pnpm dev         # Desarrollo con hot reload
pnpm build       # Compilar para producción
pnpm start       # Ejecutar versión compilada
pnpm lint        # Verificar código con ESLint
pnpm lint:fix    # Corregir errores automáticamente
pnpm format      # Formatear código con Prettier
pnpm type-check  # Verificar tipos TypeScript
```

## 📚 Endpoints

- `GET /` - Información de la API
- `GET /health` - Health check

## 🏗️ Estructura del proyecto

```
src/
├── server.ts       # Punto de entrada
├── routes/         # Rutas de la API
├── controllers/    # Controladores
├── services/       # Lógica de negocio
├── models/         # Modelos de datos
├── middleware/     # Middlewares
├── utils/          # Utilidades
└── config/         # Configuración
```
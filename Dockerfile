# Etapa base
FROM node:22.5.1-alpine3.20 AS base

LABEL maintainer="tu-email@ejemplo.com"
LABEL description="Aplicación TypeScript"
LABEL version="1.0.0"

# Instalar utilidades básicas
RUN apk add --no-cache dumb-init tini && apk upgrade --no-cache
RUN apk add --no-cache netcat-openbsd
RUN apk add --no-cache mongodb-tools

# Variables globales
ENV NODE_ENV=production
ENV NPM_CONFIG_LOGLEVEL=warn
ENV NPM_CONFIG_COLOR=false

# Crear usuario no-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 -G nodejs

# Establecer directorio de trabajo
WORKDIR /usr/src/app

# Asignar permisos al directorio de trabajo
RUN chown -R nodejs:nodejs /usr/src/app

#########################################
# Etapa de desarrollo
#########################################
FROM base AS development

ENV NODE_ENV=development

# Copiar archivos de configuración
COPY --chown=nodejs:nodejs package*.json ./
COPY --chown=nodejs:nodejs tsconfig*.json ./

# Configurar cache local y evitar errores de permisos
RUN mkdir -p .npm && npm config set cache .npm

# Instalar dependencias
RUN npm ci --include=dev

# Copiar código fuente y entorno
COPY --chown=nodejs:nodejs src/ ./src/
COPY --chown=nodejs:nodejs .env* ./

# Copiar el script de espera y darle permisos (como root)
COPY wait_for_db.sh /usr/src/app/wait_for_db.sh
RUN chmod +x /usr/src/app/wait_for_db.sh

USER nodejs

# Exponer puerto
EXPOSE 3000

# Comando para desarrollo
CMD ["npm", "run", "dev"]

#########################################
# Etapa de build
#########################################
FROM base AS build

ENV NODE_ENV=development

USER nodejs

# Copiar config y preparar entorno
COPY --chown=nodejs:nodejs package*.json ./
COPY --chown=nodejs:nodejs tsconfig*.json ./

# Cache local sin mount
RUN mkdir -p .npm && npm config set cache .npm
RUN npm ci --include=dev

# Copiar fuente y compilar
COPY --chown=nodejs:nodejs src/ ./src/
RUN npm run build

# Limpiar dependencias de desarrollo y cache
RUN npm prune --omit=dev && npm cache clean --force

#########################################
# Etapa de producción
#########################################
FROM base AS production

ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=1024"

USER nodejs

# Copiar archivos desde el build
COPY --from=build --chown=nodejs:nodejs /usr/src/app/dist ./dist
COPY --from=build --chown=nodejs:nodejs /usr/src/app/node_modules ./node_modules
COPY --from=build --chown=nodejs:nodejs /usr/src/app/package*.json ./

# Healthcheck (opcional)
COPY --chown=nodejs:nodejs healthcheck.js ./
RUN mkdir -p logs && chmod 755 logs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node healthcheck.js || exit 1

ENTRYPOINT ["tini", "--"]
CMD ["node", "dist/index.js"]

#########################################
# Etapa de testing
#########################################
FROM development AS test

COPY --chown=nodejs:nodejs test/ ./test/
COPY --chown=nodejs:nodejs jest.config.js ./
RUN npm test

#########################################
# Etapa de análisis de seguridad
#########################################
FROM development AS security

RUN npm audit --audit-level=moderate
RUN npm audit fix

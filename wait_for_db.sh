#!/bin/sh

echo "Esperando a que MongoDB esté disponible en el puerto 27017..."

until nc -z mongo 27017; do
  echo "MongoDB no disponible, esperando 2 segundos..."
  sleep 2
done

echo "MongoDB está listo, iniciando la aplicación..."
exec "$@" 
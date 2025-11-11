# Manual de usuario - Despliegue de aula-service

Este manual describe, paso a paso y sin información personal, cómo descargar las imágenes Docker necesarias, crear las instancias (máquinas/servidores) y desplegar la aplicación aula-service para que cualquier usuario con conocimientos básicos pueda realizar el proceso.

## Resumen
- Aplicación: aula-service (servicio Spring Boot).
- Componentes mínimos: base de datos PostgreSQL y servicio aula-service.
- Puerto de la aplicación: 8082 (ajustar si su configuración usa otro).
- No contiene datos de autores.

## Requisitos previos
- Acceso a una máquina con Linux (local o en la nube) con permisos para instalar software y abrir puertos.
- Acceso a Internet desde la máquina para descargar imágenes.
- Docker instalado en la(s) máquina(s) donde desplegará los contenedores.
- (Opcional) Cuenta en Docker Hub si desea tirar imágenes privadas o subir imágenes propias.

## Preparar la instancia (máquina/VM)
1. Crear la VM en el proveedor de su elección (proveedor genérico):
   - Sistema recomendado: Ubuntu 22.04 LTS.
   - Reserva de recurso: 1 vCPU, 2 GB RAM mínimo (ajustar según carga).
   - Abrir puertos en el firewall y en el proveedor:
     - 22 (SSH)
     - 8082 (aplicación)
     - 5432 (PostgreSQL) — abrir solo si necesita acceso remoto a la DB.
2. Conectarse por SSH a la VM y ejecutar las instalaciones:
   - Actualizar paquetes:
     sudo apt update && sudo apt upgrade -y
   - Instalar Docker (método recomendado):
     curl -fsSL https://get.docker.com -o get-docker.sh
     sudo sh get-docker.sh
   - Instalar docker-compose (plugin moderno) si lo necesita:
     sudo apt install -y docker-compose-plugin
   - Añadir su usuario al grupo docker (cerrar y abrir sesión):
     sudo usermod -aG docker $USER

## Descargar las imágenes Docker
En la VM (o en la máquina donde desplegará):
1. Imágenes públicas necesarias:
   - PostgreSQL oficial:
     docker pull postgres:15
   - Imagen de la aplicación (ejemplo de nombre; sustituya por la que corresponda):
     docker pull TU_DOCKERHUB_USER/aula-service:latest
   - Si la imagen no existe en un registry público y tiene el código fuente, puede construir localmente (en la máquina donde está el Dockerfile) y, si desea, etiquetar y subirla a Docker Hub:
     docker build -t TU_DOCKERHUB_USER/aula-service:latest .
     docker login
     docker push TU_DOCKERHUB_USER/aula-service:latest

Nota: reemplace TU_DOCKERHUB_USER por el nombre de repositorio que corresponda. No incluya información personal en los metadatos.

## Despliegue (opción 1: contenedores individuales con docker run)
1. Crear la base de datos PostgreSQL:
   docker run -d --name aula-db \
     -e POSTGRES_DB=aulas \
     -e POSTGRES_USER=aula_user \
     -e POSTGRES_PASSWORD=aula_pass \
     -v aula-postgres-data:/var/lib/postgresql/data \
     -p 5432:5432 \
     postgres:15
2. Desplegar el servicio aula-service (ajuste variables según su configuración):
   docker run -d --name aula-service \
     -e SPRING_DATASOURCE_URL=jdbc:postgresql://aula-db:5432/aulas \
     -e SPRING_DATASOURCE_USERNAME=aula_user \
     -e SPRING_DATASOURCE_PASSWORD=aula_pass \
     -p 8082:8082 \
     --link aula-db:aula-db \
     TU_DOCKERHUB_USER/aula-service:latest

Nota: si ejecuta ambos contenedores en la misma máquina, puede usar el hostname del contenedor (aula-db). Si la DB está en otra máquina, sustituya el host por la IP o DNS correspondiente.

## Despliegue (opción 2: docker-compose — recomendado para despliegue reproducible)
1. Crear un archivo docker-compose.yml con el siguiente ejemplo (en la misma carpeta):
```yaml
version: "3.8"
services:
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: aulas
      POSTGRES_USER: aula_user
      POSTGRES_PASSWORD: aula_pass
    volumes:
      - postgres-data:/var/lib/postgresql/data
    networks:
      - aula-net

  aula-service:
    image: TU_DOCKERHUB_USER/aula-service:latest
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://db:5432/aulas
      SPRING_DATASOURCE_USERNAME: aula_user
      SPRING_DATASOURCE_PASSWORD: aula_pass
    ports:
      - "8082:8082"
    depends_on:
      - db
    networks:
      - aula-net

volumes:
  postgres-data:

networks:
  aula-net:
```
2. Lanzar la pila:
   docker compose up -d
3. Ver logs:
   docker compose logs -f aula-service

## Comprobaciones y verificación
- Ver contenedores en ejecución:
  docker ps
- Revisar logs del servicio:
  docker logs -f aula-service
- Probar endpoint básico (desde máquina local o mediante curl en la VM):
  curl http://<IP_O_HOST>:8082/aulas

## Actualizaciones y rollback
- Para actualizar a una nueva versión:
  1) Parar contenedores actuales: docker compose down
  2) Descargar nueva imagen: docker pull TU_DOCKERHUB_USER/aula-service:versión
  3) Actualizar el docker-compose.yml con el nuevo tag y volver a levantar: docker compose up -d
- Para rollback: usar el tag anterior de la imagen y repetir el proceso (pull del tag anterior y docker compose up -d).

## Seguridad y buenas prácticas
- No exponga PostgreSQL a Internet si no es necesario; utilice redes internas o VPN.
- Use contraseñas robustas y, preferiblemente, variables de entorno o secrets para producción.
- Configure backups para los volúmenes de la base de datos.
- Use certificados TLS y reglas de firewall apropiadas en producción.

## Generar el manual en PDF y subir al Aula Virtual
1. Para generar un PDF desde este documento (opciones):
   - Usar Pandoc:
     sudo apt install -y pandoc
     pandoc README.md -o Manual_Despliegue_aula-service.pdf
   - O usar la opción "Imprimir a PDF" en su editor (VS Code, navegador, etc.).
2. Subir el PDF resultante al sistema del Aula Virtual mediante la interfaz de carga del curso o actividad.

## Conclusión
Siga los pasos en orden: preparar la VM, instalar Docker, descargar imágenes, desplegar (docker run o docker compose) y verificar. El manual evita información personal y es suficiente para que un usuario con conocimientos básicos despliegue la aplicación.

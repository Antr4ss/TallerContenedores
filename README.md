# Manual de usuario - Despliegue de la plataforma (microservicios)

Este manual describe, paso a paso y sin información personal, cómo descargar las imágenes Docker necesarias, crear las instancias (máquinas/servidores) y desplegar la plataforma compuesta por los microservicios (incluyendo aula-service) usando docker-compose. Está pensado para que un usuario con conocimientos básicos siga las instrucciones y logre desplegar la aplicación completa.

## Resumen
- Plataforma: conjunto de microservicios (ej.: gateway, config, discovery, aula-service, otros microservicios que conforman la solución).
- Componentes mínimos: base de datos PostgreSQL y los microservicios.
- Orquestación recomendada: docker-compose (evita ejecutar contenedores individualmente).
- Puerto público de ejemplo para la aplicación: 8082 (ajustar según configuración de cada servicio).
- El documento no contiene datos de autores.

## Requisitos previos
- Máquina Linux (local o en la nube) con permisos de administrador para instalar software y abrir puertos.
- Conexión a Internet desde la máquina para descargar imágenes.
- Docker y Docker Compose (plugin moderno) instalados en la máquina donde desplegará.
- (Opcional) Cuenta en Docker Hub o en un registro privado para acceder a las imágenes.

## Preparar la instancia (VM o servidor)
1. Crear la VM en el proveedor que elija:
   - Recomendado: Ubuntu 22.04 LTS.
   - Recursos mínimos por entorno de pruebas: 2 vCPU, 4 GB RAM (ajustar según número de microservicios y carga).
   - Abrir puertos necesarios (según servicios expuestos), por ejemplo:
     - 22 (SSH)
     - 8082 (puerto ejemplo del gateway/API)
     - 5432 (PostgreSQL) — solo si necesita acceso remoto directo a la DB.
2. Conectarse por SSH y preparar la máquina:
```bash
sudo apt update && sudo apt upgrade -y
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo apt install -y docker-compose-plugin
sudo usermod -aG docker $USER
# cierre y vuelva a iniciar sesión para aplicar el grupo docker
```

## Descargar imágenes Docker (opcional)
- Si las imágenes están en un registro público:
```bash
docker pull postgres:15
docker pull ORGANIZACION/gateway:latest
docker pull ORGANIZACION/aula-service:latest
docker pull ORGANIZACION/otro-servicio:latest
```
- Si dispone del código y del Dockerfile localmente, puede construir la imagen y subirla al registry:
```bash
# construir localmente (ejemplo)
docker build -t ORGANIZACION/aula-service:latest .
# iniciar sesión en Docker Hub/registry
docker login
# subir la imagen al registry
docker push ORGANIZACION/aula-service:latest
```
Nota: reemplace ORGANIZACION y nombres de servicios por los valores reales del registro. No incluya información personal en las etiquetas o metadatos.

## Despliegue (recomendado: docker-compose)
1. Cree un archivo docker-compose.yml en la máquina de despliegue. Ejemplo genérico para varios microservicios:
```yaml
version: "3.8"
services:
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: plataforma
      POSTGRES_USER: platform_user
      POSTGRES_PASSWORD: strong_password
    volumes:
      - postgres-data:/var/lib/postgresql/data
    networks:
      - plataforma-net

  gateway:
    image: ORGANIZACION/gateway:latest
    ports:
      - "8082:8082"   # puerto público del gateway/API
    environment:
      SPRING_PROFILES_ACTIVE: prod
    depends_on:
      - db
    networks:
      - plataforma-net

  aula-service:
    image: ORGANIZACION/aula-service:latest
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://db:5432/plataforma
      SPRING_DATASOURCE_USERNAME: platform_user
      SPRING_DATASOURCE_PASSWORD: strong_password
    depends_on:
      - db
    networks:
      - plataforma-net

  otro-servicio:
    image: ORGANIZACION/otro-servicio:latest
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://db:5432/plataforma
      SPRING_DATASOURCE_USERNAME: platform_user
      SPRING_DATASOURCE_PASSWORD: strong_password
    depends_on:
      - db
    networks:
      - plataforma-net

volumes:
  postgres-data:

networks:
  plataforma-net:
```
2. Reemplace los nombres de imagen (ORGANIZACION/...) y variables por los valores reales de su entorno.
3. Levante la pila:
```bash
docker compose up -d
```
4. Verifique estado y logs:
```bash
docker compose ps
docker compose logs -f gateway
docker compose logs -f aula-service
```

## Comprobaciones y verificación
- Listar contenedores activos:
```bash
docker ps
```
- Ver logs de un servicio:
```bash
docker logs -f <container_name_or_id>
```
- Probar un endpoint desde otra máquina o localmente:
```bash
curl http://<IP_O_HOST>:8082/health   # ajuste la ruta según su gateway/servicio
curl http://<IP_O_HOST>:8082/aulas    # ejemplo de endpoint de aula-service
```

## Actualizaciones y rollback
- Para actualizar a una nueva versión de imagen:
  1. Parar la pila: docker compose down
  2. Descargar el nuevo tag: docker pull ORGANIZACION/aula-service:VERSION
  3. Actualizar docker-compose.yml con el nuevo tag y levantar: docker compose up -d
- Para rollback: use el tag anterior en docker-compose.yml y repita el proceso.

## Seguridad y buenas prácticas
- No exponga PostgreSQL directamente a Internet; use redes privadas o VPN.
- Utilice contraseñas robustas y gestione secretos con mecanismos seguros (secrets de Docker, Vault, variables de entorno gestionadas).
- Configure backups periódicos para los volúmenes de la base de datos.
- En producción, habilite TLS/HTTPS en el gateway y aplique políticas de firewall.
- Limite accesos SSH y use claves públicas/privadas.

## Generar el manual en PDF y subir al Aula Virtual
1. Para generar un PDF desde este documento:
```bash
# opción con Pandoc
sudo apt install -y pandoc
pandoc README.md -o Manual_Despliegue_Plataforma.pdf
```
2. Suba el PDF generado al espacio del Aula Virtual mediante la interfaz de carga del curso o actividad.

## Notas finales
- Este manual es genérico: ajuste nombres de imagen, puertos y variables a su estructura de microservicios.
- Use docker-compose para un despliegue reproducible y sencillo. Evite exponer servicios innecesarios a Internet.
- El documento no contiene datos personales ni información que permita inferir autores del taller.

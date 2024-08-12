# Documentación colombia dashboard

## Descripción
Este proyecto es una aplicación de tablero (dashboard) que utiliza datos de la API pública de Colombia. Permite visualizar información sobre presidentes, aeropuertos y atracciones turísticas.

## Prerrequisitos

- [Node.js](https://nodejs.org/)
-  [Docker](https://docs.docker.com/get-docker/) (opcional, para la dockerización)
## Instalación y Ejecución
1. **Clonar el repositorio**
```bash
   git clone https://github.com/DavidCG5/colombian_api_DavidCortes.git
   cd colombian_api_DavidCortes
```   
2. **Instalar Dependencias**
```bash
	npm install
```
3. **Iniciar la Aplicación**
```bash
	npm run dev
```
la aplicación estará disponible en `http://localhost:5173/colombia_dash`.
## Dockerización(Opcional)
La aplicación ha sido dockerizada y se encuentra disponible como una imagen Docker. Sigue estos pasos para ejecutar la aplicación usando Docker.

### Ejecución de la Aplicación con Docker
1. **Construir la Imagen Docker**
```bash 
	docker build -t colombian-api-app .
```
O puedes descargar la imagen ya construida desde Docker Hub:
```bash
	docker pull tacticalferret/cra
```
2. **Ejecutar el Contenedor**
Para iniciar un contenedor a partir de la imagen descargada o construida, utiliza el siguiente comando:
```bash
	docker run -d -p 3000:5173 --name colombian-api-container tacticalferret/cra
```
-   `-d` ejecuta el contenedor en modo desacoplado.
-   `-p 3000:3000` mapea el puerto 5173 del contenedor al puerto 3000 de tu máquina local.
-   `--name colombian-api-container` le da un nombre al contenedor.
-   `tacticalferret/cra` es el nombre de la imagen en Docker Hub.
3. **Acceder a la Aplicación**
http://localhost:3000/colombia_dash

## Documentación API
Un proyecto Open-source que ofrece acceso a datos sobre su diversidad, todo a tu alcance.
- [API - Colombia](https://api-colombia.com/swagger/index.html)

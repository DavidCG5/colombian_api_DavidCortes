# Usa una imagen base de Node.js
FROM node:alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia el archivo package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto 5173
EXPOSE 5173

# Comando para iniciar la aplicación
CMD ["npm", "run", "dev"]





# Use a imagem base do Node.js
FROM node:18-alpine

# Diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia os arquivos de configuração do package e lock para o container
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante dos arquivos do projeto para o container
COPY . .

# Compila o código TypeScript
RUN npm run build

# Define a porta que o serviço vai usar
EXPOSE 5000

# Comando para iniciar o serviço
CMD ["node", "dist/server.js"]

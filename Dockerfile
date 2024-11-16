# Use a imagem base oficial do Node.js
FROM node:16-buster-slim

# Instalações de dependências do sistema
RUN apt-get update && apt-get install -y \
    libgtk2.0-0 \
    libgtk-3-0 \
    libgbm-dev \
    libnotify-dev \
    libgconf-2-4 \
    libnss3 \
    libxss1 \
    libasound2 \
    libxtst6 \
    xauth \
    xvfb \
    --no-install-recommends \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Diretório de trabalho
WORKDIR /usr/src/app

# Copia package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências do Node.js
RUN npm install

# Copia o restante dos arquivos da aplicação
COPY . .

# Instala o Playwright e seus navegadores
RUN npx playwright install

# Comando padrão para rodar os testes usando Playwright
CMD ["npx", "playwright", "test"]

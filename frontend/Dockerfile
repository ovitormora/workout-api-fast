#
# 🎓 DOCKERFILE — Frontend (React + Vite)
#
# Um Dockerfile é uma "receita" para criar uma imagem Docker.
# Cada linha (instrução) adiciona uma "camada" à imagem.
#
# Usamos multi-stage build (2 estágios):
#   - dev: para desenvolvimento (com hot reload)
#   - prod: para produção (servindo arquivos estáticos)
#

# === Estágio Base ===
# Começa com uma imagem Node.js leve (Alpine Linux)
FROM node:20-alpine as base

# Define a pasta de trabalho dentro do container
WORKDIR /app

# Copia apenas os arquivos de dependências primeiro
# (isso aproveita o cache do Docker — se as dependências
#  não mudaram, não precisa reinstalar)
COPY package.json package-lock.json ./

# --- Estágio de Desenvolvimento ---
FROM base as dev

# Instala TODAS as dependências (incluindo devDependencies)
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta do Vite dev server
EXPOSE 5173

# Inicia o servidor de desenvolvimento com hot reload
# --host 0.0.0.0 permite acesso de fora do container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# --- Estágio de Produção ---
FROM base as prod

# Instala apenas dependências de produção
RUN npm ci --only=production

# Copia o código e faz o build
COPY . .
RUN npm run build

# Usa Nginx para servir os arquivos estáticos
FROM nginx:alpine as production
COPY --from=prod /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

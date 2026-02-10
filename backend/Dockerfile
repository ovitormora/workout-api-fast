FROM python:3.10-slim as base

WORKDIR /app/

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/app

# Copia e instala apenas o necessário para o setup básico
COPY pyproject.toml .

# --- Estágio de Desenvolvimento ---
FROM base as dev
# Instala com dependências de teste e extras opcionais
RUN pip install ".[test]"
COPY . .

# Add entrypoint script
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

ENTRYPOINT ["/app/entrypoint.sh"]
# Comando padrão para dev (com reload)
CMD ["fastapi", "run", "app/main.py", "--port", "8000", "--host", "0.0.0.0", "--reload"]

# --- Estágio de Produção ---
FROM base as prod
# Instala apenas dependências de produção
RUN pip install .
COPY . .

# Add entrypoint script
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

ENTRYPOINT ["/app/entrypoint.sh"]
# Comando padrão para prod (sem reload)
CMD ["fastapi", "run", "app/main.py", "--port", "8000", "--host", "0.0.0.0"]
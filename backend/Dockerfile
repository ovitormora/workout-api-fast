FROM python:3.10

WORKDIR /app/

# Instala o uv (gerenciador de pacotes rápido usado no template atualizado)
# Ou podemos usar pip normal. Para simplificar didaticamente, usaremos pip padrão aqui:
COPY pyproject.toml .
RUN pip install .

COPY . .

ENV PYTHONPATH=/app

CMD ["fastapi", "run", "app/main.py", "--port", "8000", "--host", "0.0.0.0"]
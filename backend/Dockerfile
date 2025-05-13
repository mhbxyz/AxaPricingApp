FROM python:3.13
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

ADD . /app
WORKDIR /app

RUN uv sync --locked

EXPOSE 5000

CMD ["uv", "run", "src/axa_pricing_app/app.py"]

FROM python:3.13

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

ENV UID=1000
ENV GID=1000

RUN mkdir -p /app && \
    addgroup --gid ${GID} appgroup && \
    adduser --disabled-password --uid ${UID} --gid ${GID} --home /home/appuser appuser && \
    chown -R ${UID}:${GID} /app

USER appuser
ENV HOME=/home/appuser
ENV UV_VENV_PATH=/home/appuser/.venv

WORKDIR /app
ADD . /app

RUN uv sync --locked

EXPOSE 5000

CMD ["uv", "run", "src/axa_pricing_app/app.py"]

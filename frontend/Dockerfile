FROM node:23

WORKDIR /app
ADD . /app

# Ensure local binaries are available
ENV NODE_ENV=development
ENV PATH="./node_modules/.bin:$PATH"

# Optional cleanup of cache to reduce layer size
RUN npm install && npm cache clean --force

EXPOSE 5173
CMD ["npm", "run", "dev"]

FROM node:23

WORKDIR /app
COPY package*.json ./

# Optional cleanup of cache to reduce layer size
RUN npm install && npm cache clean --force

COPY . .

# Ensure local binaries are available
ENV NODE_ENV=development
ENV PATH="./node_modules/.bin:$PATH"

EXPOSE 5173
CMD ["npm", "run", "dev"]

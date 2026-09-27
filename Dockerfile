# API target
FROM node:24-alpine AS api
WORKDIR /eve-healthcare/api

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .
CMD ["npm", "start"]
FROM node:lts as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:lts
WORKDIR /app
COPY --from=builder /app/dist /app/dist
COPY package*.json ./
RUN npm install --only=production
EXPOSE 4000
CMD [node, dist/book-chat/server/server.mjs]
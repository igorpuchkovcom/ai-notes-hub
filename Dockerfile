FROM node:24-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
ENV DATABASE_URL="file:./dev.db"
RUN npm run build
EXPOSE 3000
CMD ["sh", "-c", "npx prisma db push && npm start"]
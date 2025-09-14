FROM node:alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
#COPY ./dist /app/dist
CMD ["node", "dist/index.js"]

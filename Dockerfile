FROM node:18-alpine

ENV FILES_DIRECTORY=files
ENV PORT=3000

WORKDIR /application

COPY app.js package.json package-lock.json ./

RUN npm install --only=production

EXPOSE $PORT
CMD ["node", "app.js"]
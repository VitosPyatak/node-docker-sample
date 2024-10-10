FROM node:18-alpine AS build

WORKDIR /application

COPY app.js package.json package-lock.json ./

RUN npm install --only=production

FROM node:18-alpine

WORKDIR /application

COPY --from=build application/app.js .
COPY --from=build application/node_modules node_modules

EXPOSE 3000
CMD ["node", "app.js"]

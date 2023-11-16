FROM node:lts

WORKDIR /app

COPY ./package.json ./
COPY ./tsconfig.build.json ./


RUN npm install -g yarn --force
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn run build

ENV HOME=/app \
    NODE_ENV=production

EXPOSE 3000

CMD ["yarn", "start:prod"]
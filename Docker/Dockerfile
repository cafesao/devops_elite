FROM node:18 as BUILD

WORKDIR /build

COPY ../package.json ../yarn.lock ./

RUN yarn

COPY . .

RUN yarn compile

FROM node:18-alpine 

WORKDIR /api

COPY --from=BUILD ./build/package.json ./
COPY --from=BUILD ./build/yarn.lock ./
COPY --from=BUILD ./build/dist/. ./
COPY --from=BUILD ./build/.env ./
COPY --from=BUILD ./build/prisma ./

RUN yarn --prod

RUN npx prisma generate

CMD ["yarn","start"]
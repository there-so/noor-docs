FROM mhart/alpine-node:14.16.1 AS BUILD_IMAGE

WORKDIR /app

COPY ./.yarn ./.yarn
COPY ./.yarnrc.yml ./.yarnrc.yml
COPY ./yarn.lock ./yarn.lock
COPY ./package.json ./package.json

# RUN yarn set version berry
RUN yarn install --inline-builds

COPY . .

RUN yarn prisma generate
RUN yarn build

# Remix
ENV PORT=3000

CMD [ "yarn", "start" ]

FROM node:16.20-alpine
WORKDIR /app

RUN apk add --update \
  git python3 make g++ openssh-client

# Copying source files
COPY . .

# Install packages
RUN yarn install

# Building app
RUN yarn build

# Running the app
CMD ["yarn", "start"]
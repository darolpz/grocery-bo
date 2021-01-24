FROM node:14.15.4-alpine

# update packages
RUN apk update

# create root application folder
WORKDIR /app

# copy configs to /app folder
COPY package*.json ./
COPY tsconfig.json ./
# copy source code to /app/src folder
COPY src /app/src

RUN npm install
RUN npm run postinstall

RUN ls ./build

EXPOSE 8080

CMD [ "npm", "run", "start" ]
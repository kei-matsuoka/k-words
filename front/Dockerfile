FROM node:18

WORKDIR /front
COPY package.json /front/package.json
COPY package-lock.json /front/package-lock.json
RUN npm install
ADD . /front
EXPOSE 3001

CMD ["npm", "start"]

FROM node:12.13.1

RUN mkdir /code
ADD . /code/
WORKDIR /code

RUN apt-get update && apt-get install -y wait-for-it
RUN npm install
CMD npm run start
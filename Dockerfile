FROM node:12.13.1

RUN mkdir /code
WORKDIR /code
ADD package.json /code
ADD load.js /code/

RUN apt-get update && apt-get install -y "wait-for-it"
RUN npm install

CMD ["wait-for-it", "db:5432", "--", "node", "load.js", "us"]

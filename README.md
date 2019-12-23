This is just a sandbox for experimenting with modeling tweets in PostgreSQL for
the [DocNow] project.

Set these appropriately in your environment so that *load.js* can talk to the
Twitter API:

* CONSUMER_KEY
* CONSUMER_SECRET
* ACCESS_TOKEN
* ACCESS_TOKEN_SECRET
* TRACK

TRACK is the keyword you would like to use when collecting data from Twitter's filter stream.

Then you can use docker-compose to start up the test:

    docker-compose up

[PostgreSQL]: https://www.postgresql.org/


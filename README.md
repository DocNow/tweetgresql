This is just a sandbox for experimenting with modeling tweets in PostgreSQL for
the [DocNow] project.

Set these appropriately in your environment so that *load.js* can talk to the
Twitter API:

* CONSUMER_KEY
* CONSUMER_SECRET
* ACCESS_TOKEN
* ACCESS_TOKEN_SECRET

Install a few things:

    npm install

Then start loading some tweets from the filter stream:

    ./load.js obama

Connect to PostgreSQL and see the data loaded.

[PostgreSQL]: https://www.postgresql.org/


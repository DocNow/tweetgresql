#!/usr/bin/env node

const Twit = require('twit')
const pg = require('pg')

const twitter = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
})

const db = new pg.Client() 
db.connect()

const track = process.argv[2]
const stream = twitter.stream('statuses/filter', {track})

stream.on('tweet', t => {
  console.log(t.id_str)
  db.query(
    `INSERT INTO tweets (id, json) VALUES ($1, $2)`,
    [t.id_str, t]
  )
})


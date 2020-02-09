#!/usr/bin/env node

const Twit = require('twit')
const knex = require('knex')
const knexfile = require('./knexfile')

const twitter = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
})

if (process.argv.length < 3) {
  console.log('usage: load.js <query>')
  process.exit(-1)
}

const db = knex(knexfile)
const track = process.argv[2]
const stream = twitter.stream('statuses/filter', {track})

stream.on('tweet', t => {
  db.transaction(trx => {
    console.log(t.id_str)
    return trx('tweets').insert({id: t.id_str, json: t})
  })
})

function addTweet(tweet) {
}

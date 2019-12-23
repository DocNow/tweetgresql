#!/usr/bin/env node

console.log(process.env)

const Twit = require('twit')
const knex = require('knex')
const knexfile = require('./knexfile')

const twitter = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
})

const db = knex(knexfile)
const track = process.env.TRACK
const stream = twitter.stream('statuses/filter', {track})

stream.on('tweet', t => {
  db.transaction(trx => {
    console.log(t.id_str)
    return trx('tweets').insert({id: t.id_str, json: t})
  })
})

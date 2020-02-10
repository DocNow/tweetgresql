#!/usr/bin/env node

const Twit = require('twit')
const knex = require('knex')
const knexfile = require('./knexfile')

const db = knex(knexfile)

const twitter = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
})

async function main() {
  if (process.argv.length < 3) {
    console.log('usage: load.js <query>')
    process.exit(-1)
  }

  const [user_id] = await db.transaction(trx => {
    return trx('user').insert({
      updated: new Date(),
      tweet_quota: 50000,
      twitter_screen_name: "edsu",
      twitter_consumer_key: "123",
      twitter_consumer_secret: "456"
    }, 'id')
  })

  const [collection_id] = await db.transaction(trx => {
    return trx('collection').insert({
      updated: new Date(),
      user_id: user_id,
      title: 'Test',
      description: 'This is a test'
    }, 'id')
  })

  const track = process.argv[2]
  const stream = twitter.stream('statuses/filter', {track})

  stream.on('tweet', t => {
    db.transaction(trx => {
      return trx('tweet').insert({
        collection_id: collection_id,
        tweet_id: t.id_str, 
        screen_name: t.user.screen_name,
        text: t.text,
        retweet_id: t.retweeted_status ? t.retweeted_status.id_str : null,
        quote_id: t.quoted_status ? t.quoted_status.id_str : null,
        retweet_count: t.retweet_count,
        quote_count: t.quote_count,
        reply_count: t.reply_count,
        like_count: t.favorite_count,
        reply_to_tweet_id: t.in_reply_to_status_id_str,
        reply_to_user_id: t.in_reply_to_user_id_str,
        image_count: 0,
        video_count: 0,
        language: t.lang,
        json: t
      })
    })
  })

  stream.on('disconnect', () => {
    db.destroy()
  })

}

function addTweet(tweet) {
}

if (require.main === module) {
  main()
}

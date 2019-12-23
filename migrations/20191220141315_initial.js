exports.up = function(knex) {
  return knex.schema
    .createTable('tweets', table => {
      table.string('id', 25).primary()
      table.jsonb('json')
    })
}

exports.down = function(knex) {
  return knex.schema 
    .dropTable('tweets') 
}

var config = require('../config.js')

var mysql = require('knex')({
  client: 'mysql',
  connection: {
    host: config.imageDB.host,
    port: config.imageDB.port,
    user: config.imageDB.user,
    password: config.imageDB.pass,
    database: config.imageDB.db,
    charset: config.imageDB.char
  }
})

module.exports = async ctx => {
  if (mysql) {
    //return mysql('imageInfo').select('id', 'userID', 'url')
    ctx.state.data = await mysql('imageInfo').select('url')
  }
}
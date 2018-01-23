var config = require("../config.js")

var mysql = require('knex')({
    client:"mysql",
    connection:{
        host: config.questionDB.host,
        port: config.questionDB.port,
        database: config.questionDB.database,
        user: config.questionDB.user,
        password: config.questionDB.password,
        charset: config.questionDB.char,
    }
})

module.exports = async ctx => {

    if (mysql){
        ctx.state.data = await mysql('questions').select()
        /*ctx.state.data = {
            questions: "2 + 2 = ?",
            answer1: "1",
            answer2:"2",
            answer3: "3",
            answer4:"4",
            correct: "D"
        }*/
    }
}
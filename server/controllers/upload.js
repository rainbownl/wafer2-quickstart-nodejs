const { uploader } = require('../qcloud')
const config = require('../config')

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

var checkExist = function(url){
	if (mysql){
		mysql('imageInfo').count('id as hasUrl').where('url', '=', url).then(res => {
			if (res && res[0].hasUrl){
				return true
			}
			else{
				return false
			}
		})
	}
  return false
}

var saveUrlToDB = function(inUrl){
  if (mysql){
    mysql('imageInfo').insert(
        {
          userID: 0,
          url: inUrl
        }).then(()=>{
          console.log("insert ok")
        })
  }
}

module.exports = async ctx => {
    // 获取上传之后的结果
    // 具体可以查看：
    const data = await uploader(ctx.req)

    var saveUrl = data.imgUrl
    //if (checkExist(saveUrl) == false){
    saveUrlToDB(saveUrl)
    //}

    ctx.state.data = data
}

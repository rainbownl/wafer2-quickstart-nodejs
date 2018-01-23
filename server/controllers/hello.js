//test http protocal
function get(ctx, next){
  var name = ctx.header.name
  var age = ctx.header.age
  ctx.state.data = 'hello, '+ name + ', you are ' + age + ' years old.'
}

function post(ctx, next){
	ctx.body = {
    code:0,
    data:'hello, post client'
  }
}
module.exports = {
	get,
	post
}
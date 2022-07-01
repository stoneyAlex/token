/*
 * @Author: shimingxia
 * @Date: 2022-06-28 14:40:25
 * @LastEditors: shimingxia
 * @LastEditTime: 2022-06-28 20:30:07
 * @Description: 
 */
const Koa = require('koa')
const router = require('koa-router')()
const static = require('koa-static')
const bodyParser = require('koa-bodyparser')
const jwt = require('jsonwebtoken')
const jwtAuth = require('koa-jwt')

const app = new Koa()

const secret = 'this is Stoney secret'
app.use(bodyParser())
app.use(static(__dirname + '/'))

router.post("/login-token", async ctx => {
  const {body} = ctx.request;
  const userInfo = body.username
  ctx.body = {
    message: 'Sucess',
    user: userInfo,
    token: jwt.sign(
      {
        data: userInfo,
        exp: Math.floor(Date.now() / 1000) + 60 * 60
      },
      secret
    )
  }
})

router.get(
  "/getUser-token",
  jwtAuth({
    secret
  }),
  async ctx => {
    console.log(ctx.state.user)
    ctx.body = {
      message: 'get data sucess',
      userInfo: ctx.state.user.data
    }
  }
)
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(3000)
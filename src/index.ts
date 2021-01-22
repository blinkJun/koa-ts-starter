import Koa, { Context, Next } from 'koa'
import Router from '@koa/router'

import indexControler from './controlers/index'

new indexControler()

const app:Koa = new Koa()
const router = new Router()

router.get('/',(ctx:Context,next:Next)=>{
    ctx.body = 'hello world'
    next()
})

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000)
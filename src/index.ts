/*
 * @Author liangjun
 * @LastEditors liangjun
 * @Date 2021-01-25 21:25:46
 * @LastEditTime 2021-03-30 11:29:24
 * @Description 
 */
import Koa from 'koa'
import Router from '@koa/router'
import BodyParser from 'koa-bodyparser'
import Jwt from 'koa-jwt'

import handleError from './middlewares/error'
import setCors from './middlewares/cors'
import formatResBody from './middlewares/format-res-body'

import {transferToRouteParams,Route} from './routes'

import config from './config/index'

const app:Koa = new Koa()

// 全局错误状态管理
app.use(handleError());

// cors
app.use(setCors(config.cors.whiteList))

// json web token
app.use(Jwt({
    secret:config.jwt.secrect
}).unless({
    path:['/account/login','/account/getValidateCode','/wechat/code','/wechat/signature']
}))

// 格式化返回值
app.use(formatResBody())


// 请求body格式化插件
app.use(BodyParser()) 

// 路由插件
const router = new Router()
transferToRouteParams().then((routes:Route[])=>{
    routes.forEach(route=>{
        const method = route.method
        router[method](route.path,route.handler)
    })
})
app.use(router.routes()).use(router.allowedMethods());

// 启动
app.listen(config.server.port,config.server.host)
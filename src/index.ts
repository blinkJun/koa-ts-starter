/*
 * @Author liangjun
 * @LastEditors liangjun
 * @Date 2021-01-25 21:25:46
 * @LastEditTime 2023-04-17 14:21:53
 * @Description 
 */
import Koa from 'koa'
import Router from '@koa/router'
import BodyParser from 'koa-bodyparser'
import favicon from 'koa-favicon';

import handleError from './middlewares/error'
import setCors from './middlewares/cors'
import formatResBody from './middlewares/format-res-body'

import { transferToRouteParams, Route } from './routes'

import config from './config/index'

const app: Koa = new Koa()

// 站点图标
app.use(favicon(__dirname + '/public/favicon.ico'));

// 全局错误状态管理
app.use(handleError());

// cors
app.use(setCors(config.cors.whiteList))

// 格式化返回值
app.use(formatResBody())


// 请求body格式化插件
app.use(BodyParser())

// 路由插件
const router = new Router()
transferToRouteParams().then((routes: Route[]) => {
    routes.forEach(route => {
        const method = route.method
        router[method](route.path, route.handler)
    })
})
app.use(router.routes()).use(router.allowedMethods());

// 启动
app.listen(config.server.port, config.server.host)

console.log(`server listen on ${config.server.host}:${config.server.port}`)
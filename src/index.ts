/*
 * @Author liangjun
 * @LastEditors liangjun
 * @Date 2021-01-25 21:25:46
 * @LastEditTime 2021-01-28 16:39:53
 * @Description 
 */
import Koa from 'koa'
import Router from '@koa/router'
import BodyParser from 'koa-bodyparser'

import {transferToRouteParams,Route} from './routes'

const app:Koa = new Koa()

// 请求body格式化插件
app.use(BodyParser())

// 路由插件
const router = new Router()
transferToRouteParams().then((routes:Route[])=>{
    routes.forEach(route=>{
        const method = route.method
        router[method](route.path,...route.handlers)
    })
})
app.use(router.routes()).use(router.allowedMethods());

// 启动
app.listen(3000)
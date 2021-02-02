/*
 * @Author liangjun
 * @LastEditors liangjun
 * @Date 2021-01-25 21:25:46
 * @LastEditTime 2021-02-02 18:26:06
 * @Description 
 */
import Koa,{Context, Next} from 'koa'
import Router from '@koa/router'
import BodyParser from 'koa-bodyparser'
import formatResBody from './middlewares/format-res-body'

import {transferToRouteParams,Route} from './routes'

const app:Koa = new Koa()

// 格式化返回值
app.use(formatResBody())

// 全局错误状态管理
app.use(async (ctx:Context, next:Next) => {
    try {
        await next();
    } catch (error) {
        console.log(error);
        ctx.serverError('服务器错误',error.message)
    }
});

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
app.listen(3000)
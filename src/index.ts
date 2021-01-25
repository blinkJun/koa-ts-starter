/*
 * @Author liangjun
 * @LastEditors liangjun
 * @Date 2021-01-25 21:25:46
 * @LastEditTime 2021-01-25 23:24:01
 * @Description 
 */
import Koa from 'koa'
import Router from '@koa/router'
import BodyParser from 'koa-bodyparser'

import {transferToRouteParams,Route} from './routes'

const app:Koa = new Koa()
const router = new Router()

app.use(BodyParser())

transferToRouteParams().then((routes:Route[])=>{
    routes.forEach(route=>{
        const method = route.method
        router[method](route.path,route.handler)
    })
})


app.use(router.routes()).use(router.allowedMethods());

app.listen(3000)
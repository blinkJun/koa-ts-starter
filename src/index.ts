import Koa from 'koa'
import Router from '@koa/router'

import {transferToRouteParams,Route} from './routes'

const app:Koa = new Koa()
const router = new Router()

transferToRouteParams().then((routes:Route[])=>{
    routes.forEach(route=>{
        const method = route.method
        router[method](route.path,route.handler)
    })
})

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000)
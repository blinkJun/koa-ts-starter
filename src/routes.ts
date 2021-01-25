/*
 * @Author liangjun
 * @LastEditors liangjun
 * @Date 2021-01-25 14:38:49
 * @LastEditTime 2021-01-25 23:23:16
 * @Description 读取控制器，将控制器转换为路由处理方法
 */
import { ParamMiddleware } from '@koa/router';
import fs from 'fs';
import { Context, Middleware, Next } from 'koa';
import path from 'path';

import 'reflect-metadata';
import {getControllerMetaData} from './decorators/controller'
import {getMethodMetaData,RouteConfig} from './decorators/methods'
import {getDescriptor,validate} from './decorators/validator'

export interface Route extends RouteConfig {
    handler:(ctx:Context,next:Next)=>void
}

let Controllers: any[] = [];

async function readyController(url: string) {
    const fileNames = fs.readdirSync(url);
    for (const name of fileNames) {
        const _url = path.join(url, name);
        if (fs.statSync(_url).isDirectory()) {
            await readyController(_url);
        } else {
            // 解析 导入
            try {
                const objClass = await import(_url);
                if (typeof objClass === 'object' && Object.prototype.toString.call(objClass).toLowerCase() === '[object object]') {
                    Controllers.push(objClass.default);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
}

// 控制器文件夹
const controllerDir = path.join(__dirname,'./controller/')

// 读取
const readAllController = async function(){
    Controllers = []
    await readyController(controllerDir)
    return Controllers
}

// 转换为路由的参数形式
export const transferToRouteParams = async function():Promise<Route[]> {
    const controllers = await readAllController()
    
    const routes:Route[] = []

    controllers.forEach(controller=>{
        const basePath = getControllerMetaData(controller)
        if(!basePath) return;
        const instanceMethods = Reflect.ownKeys(controller.prototype)
        instanceMethods.forEach(key=>{
            if (key === 'constructor') return;

            // 路由相关
            const routeFunction = Reflect.get(controller.prototype,key)
            const route:RouteConfig = getMethodMetaData(controller.prototype,key as string)
            if(!route) return;

            // 验证器相关
            const descriptor:any =  getDescriptor(controller.prototype,key as string)

            routes.push({
                method:route.method,
                path:basePath+route.path,
                handler:async (ctx:Context,next:Next):Promise<Middleware|undefined>=>{
                    ctx.accepts('application/json')
                    let validateSuccess = true
                    if(descriptor){
                        // 验证
                        let data = null
                        if(route.method==='get'){
                            data = JSON.parse(JSON.stringify(ctx.query))
                        }else{
                            data = ctx.request.body
                        }
                        try{
                            await validate(descriptor,data)
                        }catch(err){
                            console.log(err)
                            validateSuccess = false
                            next()
                            ctx.status = 400 
                            ctx.body = err.errors[0].message
                        }
                    }
                    if(validateSuccess){
                        return routeFunction(ctx,next)
                    }
                }
            }) 
        })
    })

    return routes
}

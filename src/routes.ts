/*
 * @Author liangjun
 * @LastEditors liangjun
 * @Date 2021-01-25 14:38:49
 * @LastEditTime 2021-01-28 16:36:07
 * @Description 读取控制器，将控制器转换为路由处理方法
 */
import fs from 'fs';
import { Context, Middleware, Next } from 'koa';
import path from 'path';

import 'reflect-metadata';
import {getControllerMetaData} from './decorators/controller'
import {getMethodMetaData,RouteConfig} from './decorators/methods'
import {getDescriptor,Descriptor,validateMiddleware} from './decorators/validator'

export interface Route extends RouteConfig {
    handlers:Middleware[]
}

// 控制器文件夹
const controllerDir = path.join(__dirname,'./controller/')

// 读取
const readAllController = async function(){
    const  controllers: any[] = [];
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
                        controllers.push(objClass.default);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }
    await readyController(controllerDir)
    return controllers
}


// 根据控制器生成对应路由处理方法
const controllerToRoute = function(controller:any):Route[]{
    // 基础控制器路由
    const basePath = getControllerMetaData(controller)
    if(!basePath) return [];

    // 控制器每个方法的键
    const instanceMethods = Reflect.ownKeys(controller.prototype)

    const routes:Route[] = []
    // 遍历所有的控制器方法
    instanceMethods.forEach((key):void=>{
        // 忽略构造器函数
        if (key === 'constructor') return;

        // 获得该控制器方法
        const routeFunction = Reflect.get(controller.prototype,key)
        // 获得该控制器方法的 路由配置
        const routeConfig:RouteConfig = getMethodMetaData(controller.prototype,key as string)
        // 获得该控制器方法的 参数验证配置
        const descriptor:Descriptor =  getDescriptor(controller.prototype,key as string)

        // 没有路由配置则忽略此方法
        if(!routeConfig) return;

        // 生成路由
        const route:Route = {
            method:routeConfig.method,
            path:basePath+routeConfig.path,
            handlers:[(ctx:Context,next:Next)=>validateMiddleware(ctx,next,descriptor),routeFunction ]
        }

        routes.push(route)
    })

    return routes
}

// 转换为路由的参数形式
export const transferToRouteParams = async function():Promise<Route[]> {
    const controllers = await readAllController()
    
    const routes:Route[] = []

    controllers.forEach(controller=>{
        const controllerRouteList = controllerToRoute(controller)
        routes.push(...controllerRouteList)
    })

    return routes
}

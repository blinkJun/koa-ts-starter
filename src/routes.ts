/*
 * @Author liangjun
 * @LastEditors liangjun
 * @Date 2021-01-25 14:38:49
 * @LastEditTime 2021-06-05 17:52:37
 * @Description 读取控制器，将控制器转换为路由处理方法
 */
import fs from 'fs';
import { Context, Middleware, Next } from 'koa';
import path from 'path';

import 'reflect-metadata';
import {getControllerMetaData} from './decorators/controller'
import {getMethodMetaData,RouteConfig} from './decorators/methods'
import {getValidetorDescriptor,validateHandler} from './decorators/validator'
import {getAuthCode,validateAuth} from './decorators/permissions'

export interface Route extends RouteConfig {
    handler:Middleware
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
        const routeConfig = getMethodMetaData(controller.prototype,key as string)
        // 获得该控制器方法的 参数验证配置
        const validatorDescriptor =  getValidetorDescriptor(controller.prototype,key as string)
        // 获得该控制器方法的 权限配置
        const authCode = getAuthCode(controller.prototype,key as string)
        // 没有路由配置则忽略此方法
        if(!routeConfig) return;

        // 生成路由
        const route:Route = {
            method:routeConfig.method,
            path:basePath+routeConfig.path,
            handler:async (ctx:Context,next:Next)=>{
                // 验证权限
                let passAuth = true
                if(authCode){
                    passAuth = await validateAuth(ctx,authCode)
                }

                if(!passAuth){
                    ctx.fail('暂无此接口权限，请向管理员申请')
                }
                
                if(passAuth){
                    // 验证参数
                    const errors = await validateHandler(ctx,validatorDescriptor)
                    
                    if(errors){
                        ctx.invalidParams('参数验证不通过',errors)
                    }
                    if(!errors){
                        return routeFunction(ctx,next)
                    }
                }

            }
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

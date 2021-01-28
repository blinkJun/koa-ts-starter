/*
 * @Author liangjun
 * @LastEditors liangjun
 * @Date 2021-01-25 21:40:16
 * @LastEditTime 2021-01-28 16:37:10
 * @Description 参数验证修饰器
 */
import 'reflect-metadata';
import { Context, Middleware, Next } from 'koa';
import Scheme from 'async-validator'

export const validatorMetaKey = Symbol('validator')

export type DecoratorHandler = (target:any,propertyKey:string)=>void

export type ValidateMiddleware = (ctx:Context,next:Next,discirptor:Descriptor) => void

export interface Descriptor {
  [propName:string]:any
}
export interface ValidateData {
  [propName:string]:any
}


// 添加元数据
export const Validator = function(descriptor:Descriptor):DecoratorHandler{
    return (target:()=>any,propertyKey:string)=>{
        return Reflect.defineMetadata(validatorMetaKey,descriptor,target,propertyKey)
    }
}
// 获取元数据
export const getDescriptor = function(target:()=>any,propertyKey:string):any{
    return Reflect.getMetadata(validatorMetaKey,target,propertyKey)
}

// 进行验证
export const validate = async function(descriptor:Descriptor,data:ValidateData):Promise<any> {
    const validator = new Scheme(descriptor)
    const validateResult = await validator.validate(data);
    return validateResult
}

// 该如何进行验证
export const validateMiddleware:ValidateMiddleware = async function(ctx:Context,next:Next,descriptor?:Descriptor){
    if(descriptor){
        // 需要验证的参数
        let data = {}

        if(ctx.method==='GET'){
            data = JSON.parse(JSON.stringify(ctx.query))
        }
        
        if(ctx.method==='POST'){
            data = ctx.request.body
        }

        
        try{
            await validate(descriptor,data)
            next()
        }catch(err){
            console.log(err)
            ctx.status = 400 
            ctx.body = err.errors
        }
    }else{
        next()
    }
}
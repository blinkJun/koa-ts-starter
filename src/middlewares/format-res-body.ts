/*
 * @Author liangjun
 * @LastEditors liangjun
 * @Date 2021-01-28 17:38:24
 * @LastEditTime 2021-03-02 18:51:07
 * @Description 格式化返回值
 */
import {Context, Next, Middleware} from 'koa'
 
export interface FormatResBodyOptions {
    successCode?:number,
    failCode?:number,
    validateFailCode?:number
}

export interface FormatResBodyHandle{
    success:(msg:string,data?:any)=>void
    fail:(msg:string,data?:any)=>void
    invalidParams:(msg:string,data?:any)=>void
    serverError:(msg:string,data?:any)=>void
}

export enum Code{
    success = 0,
    error = -1,
    invalid = 400,
    serverError = 500
}

export default (options?:FormatResBodyOptions):Middleware =>{
    const {successCode,failCode,validateFailCode} = options || {}
    return async (ctx:Context,next:Next)=>{
        
        // 成功方法
        ctx.success = (msg:string,data:any)=>{
            ctx.status = 200
            ctx.body = {
                code:successCode || Code.success,
                msg:msg,
                data:data
            }
        }
        // 失败方法
        ctx.fail = (msg:string,data:any)=>{
            ctx.status = 200
            ctx.body = {
                code:failCode || Code.error,
                msg:msg,
                data:data
            }
        }
        // invalid params
        ctx.invalidParams = (msg:string,data:any)=>{
            ctx.status = 200
            ctx.body = {
                code:validateFailCode || Code.invalid,
                msg:msg,
                data:data
            }
        }

        // server error
        ctx.serverError = (msg:string,data:any)=>{
            ctx.status = 500
            ctx.body = {
                code:Code.serverError,
                msg:msg,
                data:data
            }
        }

        await next();
    }
}
/*
 * @Author liangjun
 * @LastEditors liangjun
 * @Date 2021-01-28 17:38:24
 * @LastEditTime 2021-01-28 18:56:21
 * @Description 格式化返回值
 */
import {Context, Next,Middleware} from 'koa'
 
export interface FormatResBodyOptions {
    successCode?:number,
    failCode?:number,
    validateFailCode?:number
}

export default (options?:FormatResBodyOptions):Middleware =>{
  const {successCode,failCode,validateFailCode} = options || {}
  return async (ctx:Context,next:Next)=>{
        
    // 成功方法
    ctx.success = (msg:string,data:any)=>{
      ctx.status = 200
      ctx.body = {
        code:successCode || 0,
        msg:msg,
        data:data
      }
    }
    // 失败方法
    ctx.fail = (msg:string,data:any)=>{
      ctx.status = 200
      ctx.body = {
        code:failCode || -1,
        msg:msg,
        data:data
      }
    }
    // invalid params
    ctx.invalidParams = (msg:string,data:any)=>{
      ctx.status = 200
      ctx.body = {
        code:validateFailCode || 400,
        msg:msg,
        data:data
      }
    }

    // invalid params
    ctx.serverError = (msg:string,data:any)=>{
      ctx.status = 200
      ctx.body = {
        code:500,
        msg:msg,
        data:data
      }
    }

    await next();
  }
}
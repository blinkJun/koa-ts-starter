/*
 * @Author liangjun
 * @LastEditors liangjun
 * @Date 2021-01-28 17:38:24
 * @LastEditTime 2021-03-02 15:32:29
 * @Description 允许特定站点跨域请求
 */
import {Context, Next,Middleware} from 'koa'
 
export interface FormatResBodyOptions {
    successCode?:number,
    failCode?:number,
    validateFailCode?:number
}

export default (whiteList:string[]):Middleware =>{
    return async (ctx:Context,next:Next)=>{
        //设置允许跨域请求
        const {origin} = ctx.req.headers

        if(origin&&whiteList.includes(origin)){
            ctx.set('Access-Control-Allow-Origin',origin)
            ctx.set('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');
            ctx.set('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With');
        }

        if(ctx.method == 'OPTIONS'){
            ctx.status = 204
            ctx.body = ''
        }else{
            await next();
        }
    }
}
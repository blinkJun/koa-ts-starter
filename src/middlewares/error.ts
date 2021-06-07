/*
 * @Author liangjun
 * @LastEditors liangjun
 * @Date 2021-01-28 17:38:24
 * @LastEditTime 2021-06-07 17:59:42
 * @Description 处理错误
 */
import {Context, Next,Middleware} from 'koa'
import {logResponse,logError} from '../helpers/log'

export default ():Middleware =>{
    return async (ctx:Context,next:Next)=>{
        try {
            await next();
            logResponse(ctx)
        } catch (error) {
            if(error.status===401){
                ctx.status = 401;
                ctx.body = 'Protected resource, use Authorization header to get access\n';
            }else{
                ctx.serverError('服务器错误',error.message)
            }
            logError(ctx,error)
        }
    }
}
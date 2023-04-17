/*
 * @Author liangjun
 * @LastEditors liangjun
 * @Date 2021-01-28 17:38:24
 * @LastEditTime 2023-04-17 14:10:53
 * @Description 处理错误
 */
import { Context, Next, Middleware } from 'koa'
import { logResponse, logError } from '../helpers/log'

export default (): Middleware => {
    return async (ctx: Context, next: Next) => {
        try {
            await next();
            logResponse(ctx)
        } catch (error: any) {
            if (error.status === 401) {
                ctx.status = 401;
                ctx.body = '请先登录\n';
            } else {
                ctx.serverError('服务器错误', error.message)
            }
            logError(ctx,error)
        }
    }
}
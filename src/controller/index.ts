
import {Context,Next} from 'koa'
import {Controller} from '../decorators/controller'
import {GET} from '../decorators/methods'

@Controller('/index')
export default class Index{
    @GET('/:id')
    async getDetail(ctx:Context,next:Next):Promise<void>{
        await next()
        ctx.status = 200
        ctx.body = ctx.path
    }
}
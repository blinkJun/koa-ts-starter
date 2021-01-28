
import {Context,Next} from 'koa'
import {Controller} from '../decorators/controller'
import {GET,POST} from '../decorators/methods'
import {Validator} from '../decorators/validator'

@Controller('/index')
export default class Index{
    @POST('/detail')
    @Validator({
        id:{
            type:'string',
            required:true
        },
        number:{
            required:true
        }
    })
    async getDetail(ctx:Context,next:Next):Promise<void>{
        throw new Error(ctx.url)
    }
    
    @GET('/page')
    async getPage(ctx:Context,next:Next):Promise<void>{
        await next()
        ctx.status = 200
        ctx.body = '<script src="https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.js"></script><script>axios.post("http://localhost:3000/index/detail",{id:"1",number:"2"})</script>'
    }
}
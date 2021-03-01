
import {Context} from 'koa'
import {Controller} from '../decorators/controller'
import {POST} from '../decorators/methods'
import {Validator} from '../decorators/validator'

import {AdminModel} from '../db/index'

@Controller('/account')
export default class Index{
    @POST('/login')
    @Validator({
        name:{
            type:'string',
            required:true
        },
        password:{
            required:true
        }
    })
    async login(ctx:Context):Promise<void>{
        const {name,password} = ctx.request.body
        const instance = await AdminModel.findOne({
            where:{
                name:name
            }
        })
        if(instance&&instance.password===password){
            ctx.success('登录成功',{
                user:instance,
                env:process.env['NODE_ENV']
            })
        }else{
            ctx.fail('登录失败')
        }
    }
}
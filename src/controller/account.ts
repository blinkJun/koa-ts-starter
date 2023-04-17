
import { Context,Next } from 'koa'
import { Controller } from '../decorators/controller'
import { POST } from '../decorators/methods'
import { Validator } from '../decorators/validator'

import { AdminModel } from '../db/index'

@Controller('/account')
export default class Index {
    @Validator(
        {
            name: { type: 'string', required: true },
            password: { required: true }
        }
    )
    @POST('/login')
    async login(ctx: Context,next:Next): Promise<void> {
        await next()
        interface LoginParam {
            name: string
            password: string
        }

        const { name, password } = ctx.request.body as LoginParam
        const instance = await AdminModel.findOne({
            where: {
                name: name
            }
        })
        if (instance && instance.password === password) {
            ctx.success('登录成功', {
                user: instance,
                env: process.env['NODE_ENV']
            })
        } else {
            ctx.fail('登录失败')
        }
    }
}
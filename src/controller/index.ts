
import { Context, Next } from 'koa'
import { Controller } from '../decorators/controller'
import { POST } from '../decorators/methods'
import { Validator } from '../decorators/validator'

import { AdminModel } from '../db/index'

@Controller('/index')
export default class Index {
    @POST('/detail')
    @Validator({
        id: {
            type: 'number',
            required: true
        },
        number: {
            required: true
        }
    })
    async getDetail(ctx: Context,next:Next): Promise<void> {
        await next()
        interface Query {
            id: string
        }
        const instance = await AdminModel.findByPk((ctx.request.body as Query).id)
        ctx.success('查询成功', {
            user: instance,
            env: process.env['NODE_ENV']
        })
    }
}
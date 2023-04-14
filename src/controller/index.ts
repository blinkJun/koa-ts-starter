
import { Context, Next } from 'koa'
import { Controller } from '../decorators/controller'
import { GET, POST } from '../decorators/methods'
import { Validator } from '../decorators/validator'

import { AdminModel,DeptsModel } from '../db/index'

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
    async getDetail(ctx: Context): Promise<void> {
        interface Query {
            id: string
        }
        const instance = await AdminModel.findByPk((ctx.request.body as Query).id)
        ctx.success('查询成功', {
            user: instance,
            env: process.env['NODE_ENV']
        })
    }

    @GET('/test')
    async testmodel(ctx: Context): Promise<void> {
        const instance = await DeptsModel.findAll()
        ctx.success('查询成功', {
            user: instance,
            env: process.env['NODE_ENV']
        })
    }

    @GET('/page')
    async getPage(ctx: Context, next: Next): Promise<void> {
        await next()
        ctx.status = 200
        ctx.body = '<script src="https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.js"></script><script>axios.post("/index/detail",{id:3,number:"2"})</script>'
    }
}
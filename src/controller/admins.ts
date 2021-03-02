
import {Context} from 'koa'
import {Controller} from '../decorators/controller'
import {GET, POST} from '../decorators/methods'
import {Validator,validators} from '../decorators/validator'

import {AdminModel} from '../db/index'

const adminValidator = {
    name:{
        type:'string',
        required:true,
    },
    password:{
        type:'string',
        required:true,
    },
    head_pic:{
        type:'string',
        required:false,
    },
    role_id:{
        validator:validators.number,
        required:true,
    },
    dept_id:{
        validator:validators.number,
        required:true,
    },
    phone_number:{
        validator:validators.number,
        required:true,
    }
}

@Controller('/admins')
export default class Index{
    @GET('/list')
    async list(ctx:Context):Promise<void>{
        const {page,limit,name} = ctx.request.query
        const options = {
            offset:Number(page)||1,
            limit:Number(limit)||9999,
            where:<any>{},
            attributes:{
                exclude:['password'],
                include:[]
            }
        };
        if (name) {
            options.where.name = name
        }
        const list = await AdminModel.findAndCountAll({
            ...options,
            // 排序
            order: [['created_at', 'DESC']]
        })
        ctx.success('获取成功！',list)
    }

    @POST('/create')
    @Validator(adminValidator)
    async create(ctx:Context):Promise<void>{
        try{
            await AdminModel.create(ctx.request.body);
            ctx.success('添加成功！')
        }catch(err){
            ctx.fail(`添加失败:${err.message}`)
        }
    }

    @POST('/update')
    @Validator({
        id:{
            validator:validators.number,
            required:true,
        },
        ...adminValidator
    })
    async update(ctx:Context):Promise<void>{
        try{
            const id = ctx.request.body.id
            delete ctx.request.body.id
            await AdminModel.update(ctx.request.body,{
                where:{
                    id
                }
            });
            ctx.success('更新成功！')
        }catch(err){
            ctx.fail(`更新失败:${err.message}`)
        }
    }

    @POST('/delete')
    async delete(ctx:Context):Promise<void>{
        try{
            const id = ctx.request.body.id
            await AdminModel.destroy({
                where:{
                    id
                }
            })
            ctx.success('删除成功！')
        }catch(err){
            ctx.fail(`删除失败:${err.message}`)
        }
    }
}
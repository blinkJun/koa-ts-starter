
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
    @Validator({
        page:{
            validator:validators.number,
            required:true
        },
        limit:{
            validator:validators.number,
            required:true
        }
    })
    async list(ctx:Context):Promise<void>{
        const {page,limit,name} = ctx.request.query
        const options = {
            offset:Number(page)>0?Number(page)-1:0,
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
        ...adminValidator,
        id:{
            validator:validators.number,
            required:true,
        },
        password:{
            type:'string',
            required:false,
        }
    })
    async update(ctx:Context):Promise<void>{
        try{
            const {id} = ctx.request.body
            const clientUser = ctx.state.user
            const user = await AdminModel.findByPk(clientUser.id);

            // 管理员或者本人才可更新
            if(user){
                const isAdmin = Number(user.role_id) === 1
                const isSelf = clientUser.id === id
                if(!isAdmin||!isSelf){
                    ctx.fail('您无此权限操作，只能修改自己的信息，或者请使用管理员账户更改')
                    return
                }
            }else{
                ctx.fail('无此用户')
            }

            // 删除id
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
            const clientUser = ctx.state.user
            const user = await AdminModel.findByPk(clientUser.id);

            // 管理员才可删除
            if(user){
                const isAdmin = Number(user.role_id) === 1
                if(!isAdmin){
                    ctx.fail('您无此权限操作，请使用管理员账户删除')
                    return
                }
            }else{
                ctx.fail('无此用户')
                return 
            }


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
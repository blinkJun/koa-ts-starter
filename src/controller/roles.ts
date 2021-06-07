import {Context} from 'koa'
import {Controller} from '../decorators/controller'
import {GET, POST} from '../decorators/methods'
import {Validator,validators} from '../decorators/validator'
import {Auth} from '../decorators/permissions'
import {RoleModel,AdminModel} from '../db/index'

const validateConfig = {
    name:{
        type:'string',
        required:true,
    },
    auth_list:{
        validator:validators.array,
        required:true
    },
    remark:{
        validator:'string',
        required:true
    }
}

@Controller('/role')
export default class Index {
    @GET('/list')
    @Auth('system:role')
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
        const {page,limit} = ctx.request.query
        const options = {
            offset:Number(page)>0?Number(page)-1:0,
            limit:Number(limit)||9999,
            where:<any>{},
            attributes:{
                exclude:[],
                include:[]
            }
        };
        const list = await RoleModel.findAndCountAll({
            ...options,
            // 排序
            order: [['created_at', 'DESC']]
        })
        list.rows.forEach(row=>{
            row.auth_list = JSON.parse(row.auth_list)
        })
        ctx.success('获取成功！',list)
    }


    @POST('/create')
    @Auth('system:role:create')
    @Validator(validateConfig)
    async create(ctx:Context):Promise<void>{
        try{
            
            await RoleModel.create({
                ...ctx.request.body,
                auth_list:JSON.stringify(ctx.request.body.auth_list)
            });
            ctx.success('添加成功！')
        }catch(err){
            ctx.fail(`添加失败:${err.message}`)
        }
    }

    @POST('/update')
    @Auth('system:role:update')
    @Validator({
        ...validateConfig,
        id:{
            validator:validators.number,
            required:true,
        }
    })
    async update(ctx:Context):Promise<void>{
        try{
            const {id} = ctx.request.body

            // 删除id
            delete ctx.request.body.id

            await RoleModel.update({
                ...ctx.request.body,
                auth_list:JSON.stringify(ctx.request.body.auth_list)
            },{
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
    @Auth('system:role:del')
    @Validator({
        id:{
            validator:validators.number,
            required:true,
        }
    })
    async delete(ctx:Context):Promise<void>{
        try{
            const id = ctx.request.body.id

            const clientUser = ctx.state.user
            const user = await AdminModel.findByPk(clientUser.id);
            const role = await RoleModel.findByPk(id)

            // 顶级菜单不可删除
            if(role?.id===1){
                ctx.fail('不可删除管理员')
                return 
            }

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


            
            await RoleModel.destroy({
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
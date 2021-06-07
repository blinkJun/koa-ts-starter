
import {Context} from 'koa'
import {Controller} from '../decorators/controller'
import {GET, POST} from '../decorators/methods'
import {Validator} from '../decorators/validator'
import config from '../config'
import jwt from 'jsonwebtoken'
import svgCaptcha from 'svg-captcha'
import {encrypt,decrypt} from '../helpers/encode'
import {AdminModel,RoleModel,MenuModel} from '../db/index'

@Controller('/account')
export default class Index{
    @POST('/login')
    @Validator({
        account:{
            type:'string',
            required:true
        },
        password:{
            required:true
        },
        validateCode:{
            required:true
        },
        validateCodeHash:{
            required:true
        }
    })
    async login(ctx:Context):Promise<void>{
        const {account,password,validateCode,validateCodeHash} = ctx.request.body as any

        if(decrypt(validateCodeHash).toLowerCase()!==(validateCode as string).toLowerCase()){
            ctx.fail('验证码错误')
            return
        }

        const instance = await AdminModel.findOne({
            where:{
                name:account
            }
        })
        if(!instance){
            ctx.fail('无此用户')
            return
        }
        if(instance.password===password){
            const token = jwt.sign({
                id:instance.id
            },config.jwt.secrect,{
                expiresIn:'24h'
            })
            ctx.success('登录成功',{
                userInfo:instance,
                token:token
            })
        }else{
            ctx.fail('密码错误')
        }
    }

    @GET('/getValidateCode')
    async getValidateCode(ctx:Context):Promise<void>{
        const {data,text} = svgCaptcha.create({
            width:120,
            height:32,
            fontSize:32
        })
        
        ctx.success('获取成功',{
            svg:data,
            validateCodeHash:encrypt(text)
        })
    }

    // 获取用户的权限列表 
    @GET('/authList')
    async authList(ctx:Context):Promise<void>{
        const {id} = ctx.state.user;
        const userInfo = await AdminModel.findByPk(id)
        const role = await RoleModel.findByPk(userInfo?.role_id)
        const roleAuthList:number[] = JSON.parse(role?.auth_list as string)
        const {rows} = await MenuModel.findAndCountAll({
            // 排序
            order: [['created_at', 'DESC']]
        })
        const userAuthList = rows.filter(row=>roleAuthList.includes(row.id))
        const userAuthListCode = userAuthList.map(auth=>auth.authorize_key)
        ctx.success('获取成功！',userAuthListCode)
    }
}
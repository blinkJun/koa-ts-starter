/*
 * @Author liangjun
 * @LastEditors liangjun
 * @Date 2021-06-05 15:49:18
 * @LastEditTime 2021-06-05 17:46:44
 * @Description 权限验证装饰器
 */
import 'reflect-metadata';
import { Context } from 'koa';
import {AdminModel,RoleModel,MenuModel} from '../db/index'

const metaKey = Symbol('auth')

// 添加权限信息元数据
export const Auth = function(authCode:string):PropertyDecorator{
    return (target,propertyKey) => {
        Reflect.defineMetadata(metaKey,authCode,target,propertyKey)
    }
}
// 获取权限
export const getAuthCode = function(target:()=>void,propertyKey:string):string|null{
    if(propertyKey){
        return Reflect.getMetadata(metaKey,target,propertyKey)
    }else{
        return null
    }
} 
// 获取权限信息元数据
export const validateAuth = async function(ctx:Context,authCode:string):Promise<boolean>{
    const {id} = ctx.state.user;
    const userInfo = await AdminModel.findByPk(id)
    const role = await RoleModel.findByPk(userInfo?.role_id)
    const {rows} = await MenuModel.findAndCountAll({
        // 排序
        order: [['created_at', 'DESC']]
    })
    const thisAuthMenu = rows.find(row=>row.authorize_key===authCode)
    return !!(thisAuthMenu&&role?.auth_list.includes(String(thisAuthMenu.id)))
}
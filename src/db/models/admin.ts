/*
 * @Author liangjun
 * @LastEditors liangjun
 * @Date 2021-02-02 16:02:46
 * @LastEditTime 2021-02-02 17:04:45
 * @Description 管理员模型
 */

import {Sequelize,Model,ModelDefined,ModelOptions,DataTypes} from 'sequelize'

interface AdminInstance extends Model{
    id:number
    name:string
    password:string
    head_pic:string
    role_id:string
    dept_id:string
    phone_number:number,
    email:string
}

export default (sequelize:Sequelize):ModelDefined<AdminInstance,ModelOptions> =>{
    return sequelize.define<AdminInstance>('Admin',{
        id:{
            primaryKey:true,
            autoIncrement:true,
            type:DataTypes.INTEGER.UNSIGNED,
        },
        name:{
            type:DataTypes.STRING
        },
        password:{
            type:DataTypes.STRING
        },
        head_pic:{
            type:DataTypes.STRING
        },
        role_id:{
            type:DataTypes.STRING
        },
        dept_id:{
            type:DataTypes.STRING
        },  
        phone_number:{
            type:DataTypes.STRING
        },
        email:{
            type:DataTypes.STRING
        }
    },{
        tableName:'admins',
        timestamps: false
    })
}
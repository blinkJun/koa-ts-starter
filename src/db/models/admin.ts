/*
 * @Author liangjun
 * @LastEditors liangjun
 * @Date 2021-02-02 16:02:46
 * @LastEditTime 2021-03-03 18:25:17
 * @Description 管理员模型
 */

import {Sequelize,Model,DataTypes,Optional} from 'sequelize'

enum Status {
    normal=1,
    warning=0
}

interface AdminAttrbutes {
    id:number
    name:string
    password:string
    head_pic:string
    role_id:string
    dept_id:string
    phone_number:number,
    email:string
    status:Status
}

// Some attributes are optional in `User.build` and `User.create` calls
interface AdminAttrbutesCreation extends Optional<AdminAttrbutes, 'id'> {
    [propName:string]:any
}

class Admin extends Model<AdminAttrbutes, AdminAttrbutesCreation> implements AdminAttrbutes{
    id!:number
    name!:string
    password!:string
    head_pic!:string
    role_id!:string
    dept_id!:string
    phone_number!:number
    email!:string
    status!:Status

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}

export default (sequelize:Sequelize):typeof Admin=>{
    Admin.init({
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
        },
        status:{
            type:DataTypes.INTEGER
        }
    },{
        sequelize,
        tableName:'admins',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    })

    return Admin
}
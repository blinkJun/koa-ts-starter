/*
 * @Author liangjun
 * @LastEditors liangjun
 * @Date 2021-03-04 18:02:27
 * @LastEditTime 2021-03-05 15:46:52
 * @Description 角色管理
 */
import {Sequelize,Model,DataTypes,Optional} from 'sequelize'

interface RoleAttrbutes {
    id:number
    name:string
    auth_list:string
    remark:string
}


// Some attributes are optional in `User.build` and `User.create` calls
interface RoleAttrbutesCreation extends Optional<RoleAttrbutes, 'id'> {
    [propName:string]:any
}

class Role extends Model<RoleAttrbutes, RoleAttrbutesCreation> implements RoleAttrbutes{
    id!:number
    name!:string
    auth_list!:string
    remark!:string

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}

export default (sequelize:Sequelize):typeof Role=>{
    Role.init({
        id:{
            primaryKey:true,
            autoIncrement:true,
            type:DataTypes.INTEGER.UNSIGNED,
        },
        name:{
            type:DataTypes.STRING
        },
        auth_list:{
            type:DataTypes.STRING
        },
        remark:{
            type:DataTypes.STRING
        }
    },{
        sequelize,
        tableName:'roles',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    })

    return Role
}
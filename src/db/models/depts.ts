/*
 * @Author liangjun
 * @LastEditors liangjun
 * @Date 2021-03-04 09:58:22
 * @LastEditTime 2021-03-04 10:01:12
 * @Description 部门管理模型
 */

import {Sequelize,Model,DataTypes,Optional} from 'sequelize'

interface DeptsAttrbutes {
    id:number
    parent_id:number|null
    name:string
}

// Some attributes are optional in `User.build` and `User.create` calls
interface DeptsAttrbutesCreation extends Optional<DeptsAttrbutes, 'id'> {
    [propName:string]:any
}

class Depts extends Model<DeptsAttrbutes, DeptsAttrbutesCreation> implements DeptsAttrbutes{
    id!:number
    name!:string
    parent_id!:number|null

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}

export default (sequelize:Sequelize):typeof Depts=>{
    Depts.init({
        id:{
            primaryKey:true,
            autoIncrement:true,
            type:DataTypes.INTEGER.UNSIGNED,
        },
        name:{
            type:DataTypes.STRING
        },
        parent_id:{
            type:DataTypes.STRING
        }
    },{
        sequelize,
        tableName:'depts',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    })

    return Depts
}
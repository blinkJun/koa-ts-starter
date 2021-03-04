/*
 * @Author liangjun
 * @LastEditors liangjun
 * @Date 2021-03-04 18:02:27
 * @LastEditTime 2021-03-04 18:09:54
 * @Description 菜单管理
 */
import {Sequelize,Model,DataTypes,Optional} from 'sequelize'

interface MenuAttrbutes {
    id:number
    name:string
    level:number
    authorize_key:string
    parent_id:number | null
    static:number | null
}


// Some attributes are optional in `User.build` and `User.create` calls
interface MenuAttrbutesCreation extends Optional<MenuAttrbutes, 'id'> {
    [propName:string]:any
}

class Menu extends Model<MenuAttrbutes, MenuAttrbutesCreation> implements MenuAttrbutes{
    id!:number
    name!:string
    level!:number
    parent_id!:number|null
    authorize_key!:string
    static!:number | null

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}

export default (sequelize:Sequelize):typeof Menu=>{
    Menu.init({
        id:{
            primaryKey:true,
            autoIncrement:true,
            type:DataTypes.INTEGER.UNSIGNED,
        },
        name:{
            type:DataTypes.STRING
        },
        level:{
            type:DataTypes.INTEGER
        },
        parent_id:{
            type:DataTypes.INTEGER
        },
        authorize_key:{
            type:DataTypes.STRING
        },
        static:{
            type:DataTypes.INTEGER
        }
    },{
        sequelize,
        tableName:'menus',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    })

    return Menu
}
/*
 * @Author liangjun
 * @LastEditors liangjun
 * @Date 2021-02-02 16:02:46
 * @LastEditTime 2023-04-14 10:44:26
 * @Description 管理员模型
 */

import { Sequelize, Model, DataTypes, Optional } from 'sequelize'

interface AdminAttrbutes {
    id: number
    name: string
    password: string
    head_pic: string
    role_id: string
    dept_id: string
    phone_number: number,
    email: string
}

// Some attributes are optional in `User.build` and `User.create` calls
interface AdminAttrbutesCreation extends Optional<AdminAttrbutes, 'id'> {
    [propName: string]: any
}

class Admin extends Model<AdminAttrbutes, AdminAttrbutesCreation> implements AdminAttrbutes {
    id!: number
    name!: string
    password!: string
    head_pic!: string
    role_id!: string
    dept_id!: string
    phone_number!: number
    email!: string
}

export default (sequelize: Sequelize): typeof Admin => {
  Admin.init({
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    name: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    head_pic: {
      type: DataTypes.STRING
    },
    role_id: {
      type: DataTypes.STRING
    },
    dept_id: {
      type: DataTypes.STRING
    },
    phone_number: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    tableName: 'admins',
    timestamps: false
  })

  return Admin
}
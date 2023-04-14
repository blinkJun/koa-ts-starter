/*
 * @Author liangjun
 * @LastEditors liangjun
 * @Date 2021-02-02 14:38:18
 * @LastEditTime 2023-04-14 17:03:13
 * @Description 
 */
import {Sequelize} from 'sequelize'
import AdminModelCreate from './models/admin'
import DeptsModelCreate from './models/depts'
import config from '../config/index'


const username = config.mysql.username
const password = config.mysql.password
const host = config.mysql.host
const database = config.mysql.database

const sequelize = new Sequelize(`mysql://${username}:${password}@${host}:3306/${database}`);

export const AdminModel = AdminModelCreate(sequelize)
export const DeptsModel = DeptsModelCreate(sequelize)

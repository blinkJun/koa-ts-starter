/*
 * @Author liangjun
 * @LastEditors liangjun
 * @Date 2021-02-02 14:38:18
 * @LastEditTime 2021-02-02 17:25:58
 * @Description 
 */
import {Sequelize} from 'sequelize'
import AdminModelCreate from './models/admin'

const username = 'jun'
const password = '123456'
const host = '127.0.0.1'
const database = 'console'

const sequelize = new Sequelize(`mysql://${username}:${password}@${host}:3306/${database}`);

export const AdminModel = AdminModelCreate(sequelize)


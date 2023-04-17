/*
 * @Author liangjun
 * @LastEditors liangjun
 * @Date 2021-02-02 17:42:51
 * @LastEditTime 2023-04-17 11:13:11
 * @Description 开发环境配置
 */
import {ServerConfig,MysqlConfig,CorsConfig} from './index'
import mysqlConfig from '../db/config/config.json'

export const server:ServerConfig = {
    host:'127.0.0.1',
    port:5301
}

export const cors:CorsConfig = {
    whiteList:['http://192.168.1.160:3000']
}

export const mysql:MysqlConfig = mysqlConfig.development
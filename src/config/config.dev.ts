/*
 * @Author liangjun
 * @LastEditors liangjun
 * @Date 2021-02-02 17:42:51
 * @LastEditTime 2021-02-03 10:12:05
 * @Description 开发环境配置
 */
import {MysqlConfig,ServerConfig} from './index'

export const mysql:MysqlConfig = {
    username : 'jun',
    password : '123456',
    host : '127.0.0.1',
    database : 'console'
}

export const server:ServerConfig = {
    host:'127.0.0.1',
    port:3000
}
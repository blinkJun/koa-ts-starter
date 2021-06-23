/*
 * @Author liangjun
 * @LastEditors liangjun
 * @Date 2021-02-02 17:42:51
 * @LastEditTime 2021-06-23 22:07:14
 * @Description 开发环境配置
 */
import {MysqlConfig,ServerConfig,JWTCofig,CorsConfig} from './index'

// department jun@123456
export const mysql:MysqlConfig = {
    username : 'root',
    password : '8120102',
    host : '127.0.0.1',
    database : 'console_demo'
}

export const server:ServerConfig = {
    host:'127.0.0.1',
    port:5301
}

export const jwt:JWTCofig = {
    secrect:'hawk-admin-dev'
}

export const cors:CorsConfig = {
    whiteList:['http://localhost:3000']
}
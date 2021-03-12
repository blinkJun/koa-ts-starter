/*
 * @Author liangjun
 * @LastEditors liangjun
 * @Date 2021-02-02 17:42:51
 * @LastEditTime 2021-03-11 18:50:02
 * @Description 开发环境配置
 */
import {MysqlConfig,ServerConfig,JWTCofig,CorsConfig} from './index'

export const mysql:MysqlConfig = {
    username : 'jun',
    password : '123456',
    host : '127.0.0.1',
    database : 'console'
}

export const server:ServerConfig = {
    host:'127.0.0.1',
    port:5301
}

export const jwt:JWTCofig = {
    secrect:'hawk-admin-dev'
}

export const cors:CorsConfig = {
    whiteList:['http://192.168.1.169:3000']
}
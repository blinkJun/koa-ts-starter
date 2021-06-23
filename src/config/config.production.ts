/*
 * @Author liangjun
 * @LastEditors liangjun
 * @Date 2021-02-02 17:44:35
 * @LastEditTime 2021-06-23 22:07:21
 * @Description 正式环境配置
 */
import {MysqlConfig,ServerConfig,JWTCofig,CorsConfig} from './index'

export const mysql:MysqlConfig = {
    username : 'root',
    password : 'rental888',
    host : '127.0.0.1',
    database : 'console_demo'
}

export const server:ServerConfig = {
    host:'0.0.0.0',
    port:5301
}

export const jwt:JWTCofig = {
    secrect:'hawk-admin-prod'
}

export const cors:CorsConfig = {
    whiteList:['http://120.24.43.205','http://sunrise.tojike.com']
}
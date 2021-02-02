/*
 * @Author liangjun
 * @LastEditors liangjun
 * @Date 2021-02-02 17:45:16
 * @LastEditTime 2021-02-02 18:25:01
 * @Description 选取对应的配置
 */
import * as dev from './config.dev'
import * as production from './config.production'
 
export interface MysqlConfig {
    username:string,
    password : string,
    host : string,
    database : string
}

export interface Config {
    mysql:MysqlConfig
}
interface ConfigEnvMap {
    dev:Config
    [propName:string]:Config
}

const configEnvMap:ConfigEnvMap = {
    dev,
    production
}

declare const process : {
    env: {
        NODE_ENV: string
    }
}
const env:string = process.env['NODE_ENV']
const config:Config = configEnvMap[env]

export default config
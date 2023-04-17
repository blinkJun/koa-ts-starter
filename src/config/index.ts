/*
 * @Author liangjun
 * @LastEditors liangjun
 * @Date 2021-02-02 17:45:16
 * @LastEditTime 2023-04-17 11:14:37
 * @Description 选取对应的配置
 */
import * as development from './config.development'
import * as production from './config.production'

export interface MysqlConfig {
    username: string,
    password: string,
    host: string,
    database: string
}
export interface ServerConfig {
    host: string,
    port: number
}
export interface CorsConfig {
    whiteList: string[]
}

export interface Config {
    server: ServerConfig,
    cors: CorsConfig,
    mysql:MysqlConfig
}



interface ConfigEnvMap {
    development: Config
    [propName: string]: Config
}

const configEnvMap: ConfigEnvMap = {
    development,
    production
}

declare const process: {
    env: {
        NODE_ENV: string
    }
}
const env: string = process.env['NODE_ENV']
const config: Config = configEnvMap[env]

export default config
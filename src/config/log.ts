/*
 * @Author liangjun
 * @LastEditors liangjun
 * @Date 2021-06-07 17:29:37
 * @LastEditTime 2023-04-17 14:28:05
 * @Description 日志的配置，每个环境都统一用一个配置
 */

import path from 'path'

// 日志目录
const baseLogPath = path.resolve(__dirname,'../../logs')

/*报错输出日志*/
//错误日志目录、文件名、输出完整路径
const errorPath = '/error';
const errorFileName = 'error';
const errorLogPath = baseLogPath + errorPath + '/' + errorFileName;

/*请求数据得到响应时输出响应日志*/
//响应日志目录、文件名、输出完整路径
const responsePath = '/response';
const responseFileName = 'response';
const responseLogPath = baseLogPath + responsePath + '/' + responseFileName;

/*操作数据库进行增删改等敏感操作记录日志*/
//操作日志目录、文件名、输出完整路径
const handlePath = '/handle';
const handleFileName = 'handle';
const handleLogPath = baseLogPath + handlePath + '/' + handleFileName;

export default {
    //日志格式等设置
    appenders:
        {
            'rule-console': {'type': 'console'},
            'errorLogger': {
                'type': 'dateFile',
                'filename': errorLogPath,
                'pattern': 'yyyy-MM-dd-hh.log',
                'alwaysIncludePattern': true,
                'encoding': 'utf-8',
                'maxLogSize': 1000,
                'numBackups': 3,
                'path': errorPath
            },
            'resLogger': {
                'type': 'dateFile',
                'filename': responseLogPath,
                'pattern': 'yyyy-MM-dd-hh.log',
                'alwaysIncludePattern': true,
                'encoding': 'utf-8',
                'maxLogSize': 1000,
                'numBackups': 3,
                'path': responsePath
            },
            'handleLogger': {
                'type': 'dateFile',
                'filename': handleLogPath,
                'pattern': 'yyyy-MM-dd-hh.log',
                'alwaysIncludePattern': true,
                'encoding': 'utf-8',
                'maxLogSize': 1000,
                'numBackups': 3,
                'path': responsePath
            },
        },
    //供外部调用的名称和对应设置定义
    categories: {
        'default': {'appenders': ['rule-console'], 'level': 'all'},
        'resLogger': {'appenders': ['resLogger'], 'level': 'info'},
        'errorLogger': {'appenders': ['errorLogger'], 'level': 'error'},
        'handleLogger': {'appenders': ['handleLogger'], 'level': 'all'},
        'http': {'appenders': ['resLogger'], 'level': 'info'}
    },
    'baseLogPath': baseLogPath
}
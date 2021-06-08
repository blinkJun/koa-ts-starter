/*
 * @Author liangjun
 * @LastEditors liangjun
 * @Date 2021-06-07 17:36:16
 * @LastEditTime 2021-06-08 11:11:51
 * @Description 输出日志的打印方法
 */
import { Context, Request } from 'koa';
import log4js from 'log4js'

// 日志的配置
import logConfig from '../config/log'

// 加载配置
log4js.configure(logConfig)

//调用预先定义的日志名称
const resLogger = log4js.getLogger('resLogger');
const errorLogger = log4js.getLogger('errorLogger');
const handleLogger = log4js.getLogger('handleLogger');
const consoleLogger = log4js.getLogger();

// 格式化日志文本 加上日志头尾和换行方便查看 ==>  普通日志、请求日志、响应日志、操作日志、错误日志
const formatText = {
    info: function(info:any) {
        let logText = new String();
        //响应日志头信息
        logText += '\n' + '*************** info log start ***************' + '\n';
        //响应内容
        logText += 'info detail: ' + '\n' + JSON.stringify(info) + '\n';
        //响应日志结束信息
        logText += '*************** info log end ***************' + '\n';
        return logText;
    },
    request: function(req:Request,startDate:Date, endDate:Date=new Date()):string {
        let logText = '';
        const method = req.method;
        //请求的时间
        logText += 'request time: ' + startDate + '\n';
        //访问方法
        logText += 'request method: ' + method + '\n';
        //请求原始地址
        logText += 'request originalUrl:  ' + req.originalUrl + '\n';
        //客户端ip
        logText += 'request client ip:  ' + req.ip + '\n';
        //请求参数
        if (method === 'GET') {
            logText += 'request query:  ' + JSON.stringify(req.query) + '\n';
        } else {
            logText += 'request body: ' + '\n' + JSON.stringify(req.body) + '\n';
        }
        //服务器响应时间
        logText += 'response time: ' + endDate + '\n';
        // 接收和响应间隔时间
        logText += 'pass time: ' + (endDate.getTime() - startDate.getTime()) + 'ms\n';
        return logText;
    },
    response: function(ctx:Context, startDate:Date,endDate?:Date) {
        let logText = new String();
        //响应日志开始
        logText += '\n' + '*************** response log start ***************' + '\n';
        //添加请求日志
        logText += formatText.request(ctx.request, startDate,endDate);
        //响应状态码
        logText += 'response status: ' + ctx.status + '\n';
        //响应内容
        logText += 'response body: ' + '\n' + JSON.stringify(ctx.body) + '\n';
        //响应日志结束
        logText += '*************** response log end ***************' + '\n';
        return logText;
    },
    handle: function(info:any) {
        let logText = new String();
        //响应日志开始
        logText += '\n' + '***************info log start ***************' + '\n';
        //响应内容
        logText += 'handle info detail: ' + '\n' + JSON.stringify(info).replace(/\\n/g, '\n') + '\n';
        //响应日志结束
        logText += '*************** info log end ***************' + '\n';
        return logText;
    },
    error: function(ctx:Context, err:Error, resTime = new Date()) {
        let logText = new String();
        //错误信息开始
        logText += '\n' + '*************** error log start ***************' + '\n';
        //添加请求日志
        logText += formatText.request(ctx.request, resTime);
        //错误名称
        logText += 'err name: ' + err.name + '\n';
        //错误信息
        logText += 'err message: ' + err.message + '\n';
        //错误详情
        logText += 'err stack: ' + err.stack + '\n';
        //错误信息结束
        logText += '*************** error log end ***************' + '\n';
        return logText;
    }
}

interface Info {
    [propName:string]:any
}

//封装普通日志
export const logInfo = function(info:Info):void {
    if (info) {
        consoleLogger.info(formatText.info(info));
    }
}
//封装响应日志
export const logResponse = function(ctx:Context, startDate:Date,endDate?:Date):void {
    if (ctx) {
        resLogger.info(formatText.response(ctx, startDate,endDate));
    }
}
//封装操作日志
export const logHandle = function(info:Info):void {
    if (info) {
        handleLogger.info(formatText.handle(info));
    }
}
//封装错误日志
export const logError = function(ctx:Context, error:Error, resTime?:Date):void {
    if (ctx && error) {
        errorLogger.error(formatText.error(ctx, error, resTime));
    }
}
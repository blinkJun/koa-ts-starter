import 'reflect-metadata';

export const methodMetaKey = Symbol('routePath')

export interface RouteConfig {
    method:'get'|'post'|'put'|'delete'|'options',
    path:string
}

export type decoratorHandler = (target:any,propertyKey:string)=>void
export type decoratorCreator = (method:string,path:string)=>decoratorHandler

const methodDecoratorCreator:decoratorCreator = function(method:string,path:string):PropertyDecorator{
    return (target,propertyKey)=>{
        Reflect.defineMetadata(methodMetaKey,{
            method,
            path
        },target,propertyKey)
    }
}

export function getMethodMetaData(target:()=>any,propertyKey:string):RouteConfig{
    return Reflect.getMetadata(methodMetaKey,target,propertyKey)
}

export function GET(path:string):decoratorHandler{
    return methodDecoratorCreator('get',path)
} 
export function POST(path:string):decoratorHandler{
    return methodDecoratorCreator('post',path)
} 
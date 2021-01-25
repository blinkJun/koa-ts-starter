import "reflect-metadata";

export const methodMetaKey:symbol = Symbol('routePath')

export interface routeConfig {
    method:'get'|'post'|'put'|'delete'|'options',
    path:string
}

const methodDecoratorCreator = function(method:string,path:string){
    return (target:object,propertyKey:string)=>{
        Reflect.defineMetadata(methodMetaKey,{
            method,
            path
        },target,propertyKey)
    }
}

export function getMethodMetaData(target:object,propertyKey:string):routeConfig{
    return Reflect.getMetadata(methodMetaKey,target,propertyKey)
}

export function GET(path:string){
    return methodDecoratorCreator('get',path)
} 
import 'reflect-metadata';

const controllerMetaKey = Symbol('routeBasePath')

export type ControllerInstance = new ()=>any

export const Controller = (path:string)=>{
    return (target:ControllerInstance):void=>{
        Reflect.defineMetadata(controllerMetaKey,path,target)
    }
}

export const getControllerMetaData = (target:ControllerInstance):string|undefined=>{
    return Reflect.getMetadata(controllerMetaKey,target)
}
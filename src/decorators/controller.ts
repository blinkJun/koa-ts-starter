import "reflect-metadata";

const controllerMetaKey:symbol = Symbol('routeBasePath')

export type ControllerInstance = new  ()=>{}

export const Controller = (path:string)=>{
    return (target:ControllerInstance)=>{
        Reflect.defineMetadata(controllerMetaKey,path,target)
    }
}

export const getControllerMetaData = (target:ControllerInstance)=>{
    return Reflect.getMetadata(controllerMetaKey,target)
}
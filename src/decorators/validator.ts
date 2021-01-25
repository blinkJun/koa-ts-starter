/*
 * @Author liangjun
 * @LastEditors liangjun
 * @Date 2021-01-25 21:40:16
 * @LastEditTime 2021-01-25 22:45:08
 * @Description 参数验证修饰器
 */
import 'reflect-metadata';
import Scheme from 'async-validator'

export const validatorMetaKey = Symbol('validator')

// 添加元数据
export const Validator = function(descriptor:any){
    return (target:any,propertyKey:string)=>{
        return Reflect.defineMetadata(validatorMetaKey,descriptor,target,propertyKey)
    }
}
// 获取元数据
export const getDescriptor = function(target:any,propertyKey:string){
    return Reflect.getMetadata(validatorMetaKey,target,propertyKey)
}

// 进行验证
export const validate = async function(descriptor:any,data:any) {
    const validator = new Scheme(descriptor)
    const validateResult = await validator.validate(data);
    return validateResult
}
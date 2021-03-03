import {FormatResBodyHandle} from '../middlewares/format-res-body'

declare module 'koa' {
    interface DefaultState {
        stateProperty: boolean;
    }

    // 扩展自定义属性到koa context
    interface DefaultContext extends FormatResBodyHandle {
        [propName:string]:any
    }
}
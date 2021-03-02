import {FormatResBodyHandle} from '../middlewares/format-res-body'

declare module 'koa' {
    interface DefaultState {
        stateProperty: boolean;
    }

    interface DefaultContext extends FormatResBodyHandle {
        [propName:string]:any
    }
}
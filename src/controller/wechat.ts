import {Context} from 'koa'
import {Controller} from '../decorators/controller'
import {GET} from '../decorators/methods'
import http from 'https'
import sha1 from 'sha1'

const appId = 'wx0a6c14eccd76ea7a'
const secret = '19ca474fdbbebd9319dca17f01741c24'

interface TokenJson {
    access_token:string
    expires_in:number
}
interface TicketJson {
    'errcode':number,
    'errmsg':string,
    'ticket':string,
    'expires_in':number
}

const createNonceStr = function ():string {
    return Math.random().toString(36).substr(2, 15);
};
const createTimestamp = function ():string {
    return parseInt(new Date().getTime()/1000 + '') + '';
};
const raw = function (args:any) {
    let keys = Object.keys(args);
    keys = keys.sort()
    const newArgs:any = {};
    keys.forEach(function (key) {
        newArgs[key.toLowerCase() as string] = args[key];
    });
  
    let string = '';
    for (const k in newArgs) {
        string += '&' + k + '=' + newArgs[k];
    }
    string = string.substr(1);
    return string;
};
const getAccessToken = ():Promise<TokenJson> =>{
    return new Promise((resolve)=>{
        http.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${secret}`,(res)=>{
            let data = ''
            res.on('data',(chunk)=>{
                data+=chunk
            })
            res.on('end',()=>{
                const tokenJson = JSON.parse(data.toString()) as TokenJson
                resolve(tokenJson)
            })
        })
    })
}
const getTicket = (access_token:string):Promise<TicketJson> =>{
    return new Promise((resolve)=>{
        http.get(`https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${access_token}&type=jsapi`,(res)=>{
            let data = ''
            res.on('data',(chunk)=>{
                data+=chunk
            })
            res.on('end',()=>{
                const ticketJson = JSON.parse(data.toString()) as TicketJson
                resolve(ticketJson)
            })
        })
    })
}

@Controller('/wechat')
export default class Index {
    @GET('/code')
    async validate(ctx:Context):Promise<void>{
        const {signature,timestamp,nonce,echostr} = ctx.request.query
        const token = 'wechat-code'
        const sortParams = [token,timestamp,nonce].sort()
        const sortParamsString = sortParams.join('')
        const encodeParams = sha1(sortParamsString)
        if(encodeParams === signature){
            ctx.status = 200
            ctx.body = echostr
        }else{
            ctx.fail('验证失败')
        }
    }
    @GET('/signature')
    async signature(ctx:Context):Promise<void>{
        let {url} = ctx.request.query
        url = decodeURIComponent(url as string)
        const {access_token} = await getAccessToken()
        const {ticket} = await getTicket(access_token)
        const ret = {
            jsapi_ticket: ticket,
            noncestr: createNonceStr(),
            timestamp: createTimestamp(),
            url: url
        };
        const retString = raw(ret)
        const signature = sha1(retString)
        ctx.success('获取签名成功！',{
            ...ret,
            signature,
            retString
        })
    }
}
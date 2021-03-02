/*
 * @Author liangjun
 * @LastEditors liangjun
 * @Date 2021-03-01 18:38:40
 * @LastEditTime 2021-03-02 14:25:58
 * @Description 加密和解密
 */
import crypto from 'crypto'

const algorithm = 'aes-256-ctr';
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr4';
const iv = crypto.randomBytes(16);

export interface Hash {
    iv:string
    content:string
}

export const encrypt = (text:string):Hash => {

    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    };
};

export const decrypt = (hash:Hash):string => {

    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));

    const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);

    return decrpyted.toString();
};
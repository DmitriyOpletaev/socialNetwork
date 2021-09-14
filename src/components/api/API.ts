import axios from "axios";


let ApiKey1= "ddd34d7b-5bde-46d5-b8d8-2b839d07f9fe"///original
let ApiKey2 = '73aec165-f90f-4772-8479-da0b6db5ab8a'


export const instance = axios.create({

    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": ApiKey1
    }

})

export enum ResultCodeEnum{
    Success = 0,
    Error = 1,
}
export enum ResultCodeForCaptchaEnum{
    ErrorNeedCaptcha = 10
}


export type Response<D = {}, RC = ResultCodeEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}
export type GetItems<I={}>={
    items:I
    totalCount: number
    error: string | null
    uniqueUrlName: string | null
}
export type MeResponseData = {id: number, email: string, login: string }
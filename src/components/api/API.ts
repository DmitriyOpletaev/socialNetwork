import axios from "axios";


export const instance = axios.create({

    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "ddd34d7b-5bde-46d5-b8d8-2b839d07f9fe"
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
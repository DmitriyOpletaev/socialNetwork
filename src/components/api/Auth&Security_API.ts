import {instance, MeResponseData, Response, ResultCodeEnum, ResultCodeForCaptchaEnum} from "./API";





type GetCaptchaType = {
    url: string
}
type MeResponse ={
    id:number
}
export const authAPI = {

    authMe() {
        return instance.get<Response<MeResponseData>>(`auth/me`).then(res => res.data)
    },

    logInMe(eMail: string, password: string, rememberMe: boolean, captcha: null | string = null) {

        return instance.post<Response<MeResponse,ResultCodeEnum|ResultCodeForCaptchaEnum>>(`/auth/login`, {
            email: eMail,
            password, rememberMe, captcha
        }).then(res => res.data)
    },

    logOutMe() {
        return instance.delete<Response>(`/auth/login`).then(res => res.data)
    },

}
export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<GetCaptchaType>(`/security/get-captcha-url`).then(res => res.data)
    },
}
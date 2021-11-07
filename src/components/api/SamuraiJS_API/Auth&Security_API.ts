import {instanceSamuraiJS, MeResponseData, Response, ResultCodeEnum, ResultCodeForCaptchaEnum} from "./API";





type GetCaptchaType = {
    url: string
}
type MeResponse ={
    id:number
}
export const authAPI = {

    authMe() {
        return instanceSamuraiJS.get<Response<MeResponseData>>(`auth/me`).then(res => res.data)
    },

    logInMe(eMail: string, password: string, rememberMe: boolean, captcha: null | string = null) {

        return instanceSamuraiJS.post<Response<MeResponse,ResultCodeEnum|ResultCodeForCaptchaEnum>>(`/auth/login`, {
            email: eMail,
            password, rememberMe, captcha
        }).then(res => res.data)
    },

    logOutMe() {
        return instanceSamuraiJS.delete<Response>(`/auth/login`).then(res => res.data)
    },

}
export const securityAPI = {
    getCaptchaUrl() {
        return instanceSamuraiJS.get<GetCaptchaType>(`/security/get-captcha-url`).then(res => res.data)
    },
}
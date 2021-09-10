import {AppStateType} from "../redux-store";


export function getIsAuth(state:AppStateType){
    return state.auth.isAuth
}
export function getAuthorizedId(state:AppStateType){
    return state.auth.id
}
export function getOwnLogin(state:AppStateType){
    return state.auth.login
}
export function getOwnEmail(state:AppStateType){
    return state.auth.email
}
export function getAuthIsFetching(state:AppStateType){
    return state.auth.isFetching
}
export function getAuthErrorText(state:AppStateType){
    return state.auth.errorText
}
export function getCaptchaUrl(state:AppStateType){
    return state.auth.captchaUrl
}







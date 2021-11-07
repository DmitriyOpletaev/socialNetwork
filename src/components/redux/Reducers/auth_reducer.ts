import {ResultCodeEnum, ResultCodeForCaptchaEnum} from "../../api/SamuraiJS_API/API";
import { BaseThunkType, InferActionsTypes} from "../redux-store";
import {authAPI, securityAPI} from "../../api/SamuraiJS_API/Auth&Security_API";
import {FormikValues} from "formik";





const authReducer = (state = initialState, action: ActionsType): InitialStateType => {


    switch (action.type) {
        case 'SET_USER_DATA':
            return {
                ...state,
                ...action.payload,
            }
        case 'SET_CAPTCHA_URL':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}



const actions = {
    setAuthUserData: (id: number | null, login: string | null, email: string | null, isAuth: boolean) => ({
        type: "SET_USER_DATA", payload: {id, login, email, isAuth}
    } as const),

    getCaptchaSuccess: (captchaUrl: string) => ({
        type: "SET_CAPTCHA_URL",
        payload: {captchaUrl}
    } as const)
}





export const getAuthUserData = (): ThunkType => async (dispatch) => {

    let meData = await authAPI.authMe()

    if (meData.resultCode === ResultCodeEnum.Success) {
        let {id, login, email} = meData.data;      //порядок id, login, email - ВАЖЕН!!!! // data из API и data из Redux//
        dispatch(actions.setAuthUserData(id, login, email, true))
    }
}

//const setErrorServer = (errorText) => ({type: SET_ERROR_SERVER, errorText:{errorText}});
export const logInMe = ( values:FormikValues ): ThunkType => async (
    dispatch) => {
    let loginData = await authAPI.logInMe(values.eMail, values.password, values.rememberMe, values.captcha)

    if (loginData.resultCode === ResultCodeEnum.Success) {
        await dispatch(getAuthUserData())
        dispatch(actions.getCaptchaSuccess(''))
    } else if (loginData.resultCode === ResultCodeForCaptchaEnum.ErrorNeedCaptcha) {
        await dispatch(getCaptchaUrl())
        //setStatus("Введите каптчу")
       // setSubmitting(false)



    } else {
        let errorText = loginData.messages.length > 0 ? loginData.messages[0] : "Some ErrorNotification"
        //setSubmitting(false)
        //setStatus(errorText)
    }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const captchaData = await securityAPI.getCaptchaUrl()
    dispatch(actions.getCaptchaSuccess(captchaData.url))

}

export const logOutMe = (): ThunkType => async (dispatch) => {
    let logOutData = await authAPI.logOutMe();
    if (logOutData.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false));
    }
}

export default authReducer;




//Types
let initialState = {
    id: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: false,
    isFetching: false,
    errorText: null as string | null,
    captchaUrl: null as string | null,
}
export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType =BaseThunkType<ActionsType>
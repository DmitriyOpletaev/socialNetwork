import {AppStateType, InferActionsTypes} from "../redux-store";

let initialState = {
    initializedGoogle: false,
    google_Access_token: null as string|null,
    facebook_Access_token:null as string|null
}

export function getInitializedGoogle(state: AppStateType) {
    return state.mainAuthReducer.initializedGoogle
}
export function getAccessToken(state: AppStateType) {
    return state.mainAuthReducer.google_Access_token
}
export const MainAuthSelelector = {
    facebook_Access_token:({mainAuthReducer}:AppStateType)=>mainAuthReducer.facebook_Access_token,
    google_Access_token:({mainAuthReducer}:AppStateType)=>mainAuthReducer.google_Access_token,
}

type InitialStateType = typeof initialState
const mainAuthReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "Google/SET_GOOGLE_LOGIN":
            return {
                ...state,
                initializedGoogle: true,
                google_Access_token: action.google_Access_token
            }
            case "Google/SET_GOOGLE_LOGOUT":
            return {
                ...state,
                initializedGoogle: false,
                google_Access_token: null
            }
            case "Facebook/SET_FACEBOOK_LOGIN":
            return {
                ...state,
                facebook_Access_token: action.facebook_Access_token
            }
            case "Facebook/SET_FACEBOOK_LOGOUT":
            return {
                ...state,
                facebook_Access_token: null
            }


        default:
            return state
    }
}


export const actionsAuthReducer = {
    setGoogleLogin: (google_Access_token: string,) => ({
        type: 'Google/SET_GOOGLE_LOGIN',
        google_Access_token

    } as const),
    setGoogleLogout: () => ({
        type: "Google/SET_GOOGLE_LOGOUT"
    } as const),
    setFacebookLogin: (facebook_Access_token: string,) => ({
        type: 'Facebook/SET_FACEBOOK_LOGIN',
        facebook_Access_token
    } as const),
    setFacebookLogout: () => ({
        type: 'Facebook/SET_FACEBOOK_LOGOUT'
    } as const),


}







export default mainAuthReducer;


type ActionsType = InferActionsTypes<typeof actionsAuthReducer>
//type ThunkType = BaseThunkType<ActionsType>
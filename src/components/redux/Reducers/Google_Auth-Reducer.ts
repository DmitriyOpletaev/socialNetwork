import {AppStateType, InferActionsTypes} from "../redux-store";






let initialState = {
    initializedGoogle: false,
    access_token: null as string|null

}

export function getInitializedGoogle(state: AppStateType) {
    return state.googleAuth.initializedGoogle
}
export function getAccessToken(state: AppStateType) {
    return state.googleAuth.access_token
}


type InitialStateType = typeof initialState
const googleAuthReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {

        case "Google/SET_GOOGLE_LOGIN":

            return {
                ...state,
                initializedGoogle: true,
                access_token: action.payload.access_token
            }
            case "Google/SET_GOOGLE_LOGOUT":

            return {
                ...state,
                initializedGoogle: false,
                access_token: null
            }


        default:
            return state
    }
}


export const actionsGoogleAuth = {
    setGoogleLogin: (access_token: string,) => ({
        type: "Google/SET_GOOGLE_LOGIN",
        payload: {access_token}

    } as const),
    setGoogleLogout: () => ({
        type: "Google/SET_GOOGLE_LOGOUT",

    } as const),


}








export default googleAuthReducer;


type ActionsType = InferActionsTypes<typeof actionsGoogleAuth>
//type ThunkType = BaseThunkType<ActionsType>
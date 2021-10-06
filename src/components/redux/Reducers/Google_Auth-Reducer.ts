import {AppStateType, BaseThunkType, InferActionsTypes} from "../redux-store";
import firebase from "firebase/compat";
import {authGoogle} from "../../api/Google_API_Auth";
import {YoutubeAPI} from "../../api/Youtube_API";


type UserDetails={
    name:string|null,
    email: string|null ,
    photo: string|null,
    accessToken: string|null,
}
let initialState = {
    initializedGoogle: false,
    isLoading: false,
    user: null as UserDetails|null

}

export function getInitializedGoogle(state: AppStateType) {
    return state.googleAuth.initializedGoogle
}

export function getGoogleUser(state: AppStateType) {
    return state.googleAuth.user
}

export function getIsLoading(state: AppStateType) {
    return state.googleAuth.isLoading
}
export function getaccessToken(state: AppStateType) {
    return state.googleAuth.user?.accessToken
}


type InitialStateType = typeof initialState
const googleAuthReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {

        case "Google/INITIALIZED":

            return {
                ...state,
                initializedGoogle: action.payload.initialized
            }
        case "Google/SET_USER_DETAILS":

            return {
                ...state,
                user: action.payload.user
            }
        case "Google/SET_IS_LOADING":

            return {
                ...state,
                isLoading: action.payload.isLoading,
            }


        default:
            return state
    }
}


const actions = {
    initialized: (initialized: boolean,) => ({
        type: "Google/INITIALIZED",
        payload: {initialized}

    } as const),
    setUser: (user: UserDetails|null) => ({
        type: "Google/SET_USER_DETAILS",
        payload: {user}

    } as const),
    setIsLoading: (isLoading: boolean) => ({
        type: "Google/SET_IS_LOADING",
        payload: {isLoading}

    } as const),

}


export const loginGoogle = (): ThunkType =>
    async (dispatch) => {
        dispatch(actions.setIsLoading(true))
        const provider = new firebase.auth.GoogleAuthProvider()
        const user1 = await authGoogle.signInWithPopup(provider)
        const {user}= user1
        dispatch(actions.setIsLoading(false))
        if(user){

            let userDetails = {
                photo:user.photoURL,
                name: user.displayName,
                email: user.email,
                // @ts-ignore
                accessToken:user._delegate.accessToken
            }
            dispatch(actions.setUser(userDetails))
        }
        console.log(user1)
        dispatch(actions.initialized(true))
        console.log(user)
    }
export const logOutGoogle = (): ThunkType =>
    async (dispatch) => {
        dispatch(actions.setIsLoading(true))
        await authGoogle.signOut()
        dispatch(actions.initialized(false))
        dispatch(actions.setUser(null))
        dispatch(actions.setIsLoading(false))



    }






export default googleAuthReducer;


type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>
import {getAuthUserData} from "./auth_reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "../redux-store";


let initialState = {
    initialized: false,     //идет проверка авторизован ли пользователь
}
type InitialStateType = typeof initialState
const appReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {

        case "SN/APP/INITIALIZED_SUCCESS":

            return {
                ...state,
                initialized: true
            }


        default:
            return state
    }
}

type ActionsType = InferActionsTypes<typeof actions>
const actions = {
    initializedSuccess: () => ({type: "SN/APP/INITIALIZED_SUCCESS"}as const)
}




export const initializeApp = (): ThunkAction<Promise<void>, AppStateType, unknown, ActionsType> =>
    async (dispatch) => {
        await dispatch(getAuthUserData())
         dispatch(actions.initializedSuccess())
    }


export default appReducer;

import {AppStateType, InferActionsTypes} from "../redux-store";


let initialState = {
    themeMode: 'light' as 'dark'|'light',
}
//----Selector
export function getThemeMode(state:AppStateType){
    return state.theme.themeMode


}
type InitialStateType = typeof initialState
const themeReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {

        case "SET_THEME":

            return {
                ...state,
                themeMode: action.payload.theme
            }


        default:
            return state
    }
}

type ActionsType = InferActionsTypes<typeof actions>
export const actions = {
    selectTheme: (theme:'dark'|'light') => ({type: "SET_THEME", payload:{theme}}as const)
}




export default themeReducer;
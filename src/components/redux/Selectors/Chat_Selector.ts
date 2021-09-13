import {AppStateType} from "../redux-store";


export function getChat(state:AppStateType){
    return state.chat.messages
}
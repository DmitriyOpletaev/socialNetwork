import {AppStateType} from "../redux-store";


export function getChat(state:AppStateType){
    return state.chat.messages
}
export function getStatusChat(state:AppStateType){
    return state.chat.status
}

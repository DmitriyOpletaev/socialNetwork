import {AppStateType} from "../redux-store";

export function getProfileInformation(state:AppStateType){
    return state.profilePage.profile
}
export function getProfileUserStatus(state:AppStateType){
    return state.profilePage.status
}
export function getIsFetchingStatus(state:AppStateType){
    return state.profilePage.isFetching
}
import {ResultCodeEnum} from "../../api/API";
import {PhotosType, ProfileType} from "../../../types/types";
import { BaseThunkType, InferActionsTypes} from "../redux-store";
import {profileAPI} from "../../api/profile_API";




let initialState = {
    profile: null as ProfileType|null,
    status: "",
}
export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action:Actions):InitialStateType => {


    switch (action.type) {

        case 'SN/PROFILE/SET_USERS_PROFILE':
            return {
                ...state, profile: action.profile
            }

        case 'SN/PROFILE/SET_STATUS':
            return {
                ...state, status: action.status
            }
        case 'SN/PROFILE/SET_PHOTO_SUCCESS':
            return {

                ...state, profile: {...state.profile, photos: action.photos} as ProfileType
            }


        default:
            return state
    }
}

type Actions=InferActionsTypes<typeof actions>
type ThunkType =BaseThunkType<Actions>



export const actions ={
      setUserProfile : (profile:ProfileType) => ({type: 'SN/PROFILE/SET_USERS_PROFILE', profile} as const),
      setStatus : (status:string) => ({type: 'SN/PROFILE/SET_STATUS', status} as const),
      savePhotoSuccess : (photos:PhotosType) => ({type: 'SN/PROFILE/SET_PHOTO_SUCCESS', photos} as const),
}

export const getUserProfile = (userId:number):ThunkType => async (dispatch) => {
    if(userId){
    let profileData = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(profileData))}
}
export const getUserStatus = (userId:number):ThunkType => async (dispatch) => {
    if(userId ){
    let response = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(response.data))
}}


export const updateUserStatus = (status:string):ThunkType=> async (dispatch) => {
    let responseData = await profileAPI.updateStatus(status)
    if (responseData.resultCode === 0) {           //resultCode === 0 - все хорошо; resultCode === 1 - ошибка
        dispatch(actions.setStatus(status))
    }
}

export const savePhoto = (file:File):ThunkType => async (dispatch) => {
    let photoData = await profileAPI.savePhoto(file)
    if (photoData.resultCode === ResultCodeEnum.Success) {
        let photos = photoData.data.photos
        dispatch(actions.savePhotoSuccess(photos))
    }
}



export default profileReducer
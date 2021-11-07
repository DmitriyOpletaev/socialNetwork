import {ResultCodeEnum} from "../../api/SamuraiJS_API/API";
import {PhotosType, ProfileType} from "../../../types/types";
import { BaseThunkType, InferActionsTypes} from "../redux-store";
import {profileAPI} from "../../api/SamuraiJS_API/profile_API";
import {bool} from "yup";




let initialState = {
    profile: null as ProfileType|null,
    status: "",
    isFetching: false
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
            case 'SN/PROFILE/SET_IS_FETCHING':
            return {

                ...state, isFetching: action.isFetching
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
      setIsFetching : (isFetching:boolean) => ({type: 'SN/PROFILE/SET_IS_FETCHING', isFetching} as const),
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
    dispatch(actions.setIsFetching(true))
    let responseData = await profileAPI.updateStatus(status)
    if (responseData.resultCode === 0) {
        //resultCode === 0 - все хорошо; resultCode === 1 - ошибка
        dispatch(actions.setStatus(status))
    }
    dispatch(actions.setIsFetching(false))
}

export const saveUserDetails = (userDetails:any):ThunkType=> async (dispatch) => {
    dispatch(actions.setIsFetching(true))
    debugger
    let responseData = await profileAPI.updateUserDetails(userDetails)
    if(responseData.resultCode === ResultCodeEnum.Success){
        dispatch(getUserProfile(userDetails.userId))
    }

    dispatch(actions.setIsFetching(false))
}

export const savePhoto = (file:File):ThunkType => async (dispatch) => {

   dispatch(actions.setIsFetching(true))
    let photoData = await profileAPI.savePhoto(file)
    if (photoData.resultCode === ResultCodeEnum.Success) {
        let photos = photoData.data.photos
        dispatch(actions.savePhotoSuccess(photos))
    }
    dispatch(actions.setIsFetching(false))
}



export default profileReducer
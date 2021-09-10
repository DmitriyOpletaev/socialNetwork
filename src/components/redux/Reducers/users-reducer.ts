import {Response, ResultCodeEnum} from "../../api/API"
import {updateObjectInArray} from "../../utils/validators/object-helpers"
import {UserType} from "../../../types/types"
import {BaseThunkType, InferActionsTypes} from "../redux-store";
import {Dispatch} from "redux";
import {usersAPI} from "../../api/users_API";


let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>,  //array of users ids
    filter: {
        term: '',
        friend: null as null| boolean
    }
}


const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {


    switch (action.type) {
        case 'FOLLOW':

            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }
        case 'SET_USERS':
            return {
                ...state, users: action.users
            }
        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.currentPage
            }
        case 'SET_TOTAL_USERS_COUNT':
            return {
                ...state, totalUsersCount: action.count
            }
        case 'TOGGLE_IS_FETCHING':
            return {
                ...state, isFetching: action.isFetching
            }
        case 'TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)    //фильтрация уже вернет новый массив(деструктуризация не нужна[...]
            }
        case 'SN/USERS/SET_FILTER':
            return {
                ...state, filter: action.payload
            }

        default:
            return state
    }
}




export const actions = {

    followSuccess: (userId: number) => ({type: 'FOLLOW', userId} as const),

    unfollowSuccess: (userId: number) => ({type: 'UNFOLLOW', userId} as const),

    setUsers: (users: Array<UserType>) => ({type: 'SET_USERS', users} as const),

    setCurrentPage: (currentPage: number) => ({
        type: 'SET_CURRENT_PAGE',
        currentPage: currentPage
    } as const),
    setTotalUsersCount: (totalUsersCount: number) => ({
        type: 'SET_TOTAL_USERS_COUNT',
        count: totalUsersCount
    } as const),
    toggleIsFetching: (isFetching: boolean) => ({
        type: 'TOGGLE_IS_FETCHING',
        isFetching
    } as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({
        type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
        isFetching,
        userId
    } as const),
    setFilter: (filter: Filter) => ({type: 'SN/USERS/SET_FILTER', payload: filter} as const),


}


//Зарефакторили:




export const requestUsers = (currentPage: number, pageSize: number, filter: Filter): ThunkType =>
    async (dispatch) => {
        dispatch(actions.toggleIsFetching(true))
        dispatch(actions.setFilter(filter))
        let data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend)
        dispatch(actions.setUsers(data.items))
        dispatch(actions.setTotalUsersCount(data.totalCount))
        dispatch(actions.setCurrentPage(currentPage))
        dispatch(actions.toggleIsFetching(false))
    }


let _followUnfollowFlow = async (dispatch: Dispatch<ActionsType>, userId: number,
                                 apiMethod: (userId: number) => Promise<Response>,
                                 actionCreator: (userId: number) => ActionsType) => {
    dispatch(actions.toggleFollowingProgress(true, userId))
    let followUnfollowData = await apiMethod(userId)
    if (followUnfollowData.resultCode === ResultCodeEnum.Success) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleFollowingProgress(false, userId))
}
export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess)
    }
}
export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess)
    }
}


export default usersReducer

export type InitialStateType = typeof initialState
export type Filter = typeof initialState.filter
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>
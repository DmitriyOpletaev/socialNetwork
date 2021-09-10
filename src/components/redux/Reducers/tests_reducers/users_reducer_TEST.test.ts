import usersReducer, {actions, follow, InitialStateType, requestUsers, unfollow} from "../users-reducer";
import {usersAPI} from '../../../api/users_API';
import {Response, ResultCodeEnum} from "../../../api/API";
import exp from "constants";



jest.mock('../../../api/users_API') //подменили usersAPI
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>
const dispatchMock = jest.fn()
const getStateMock = jest.fn()



const result : Response={
    resultCode:ResultCodeEnum.Success,
    messages:[],
    data:{}
}



let state:InitialStateType

beforeEach(()=>{
    state={
        users: [
            {id:0, name:'Dima', followed: false, status:'StatusDimicha',
                photos:{small:null,large:null},},
            {id:1, name:'Kolya', followed: false, status:'StatusKoli',
                photos:{small:null,large:null}},
            {id:2, name:'Zen', followed: true, status:'StatusZen',
                photos:{small:null,large:null}},
            {id:3, name:'Анна', followed: true, status:'StatusAnna',
                photos:{small:null,large:null}}
        ] ,
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [],
        filter: {term: '', friend: null}
    }
})

test('follow success',()=>{
    const newState = usersReducer(state, actions.followSuccess(1))
    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})
test('unfollow success',()=>{
    const newState = usersReducer(state, actions.unfollowSuccess(3))
    expect(newState.users[3].followed).toBeFalsy()
    expect(newState.users[2].followed).toBeTruthy()
})



test('follow Thunk',async ()=>{

    usersAPIMock.follow.mockReturnValue(Promise.resolve(result));
    const thunk = follow(0)



    await thunk(dispatchMock,getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1,actions.toggleFollowingProgress(true, 0))
    expect(dispatchMock).toHaveBeenNthCalledWith(2,actions.followSuccess( 0))
    expect(dispatchMock).toHaveBeenNthCalledWith(3,actions.toggleFollowingProgress(false, 0))

})
test('unfollow Thunk',async ()=>{

    usersAPIMock.unfollow.mockReturnValue(Promise.resolve(result));
    const thunk = unfollow(3)



    await thunk(dispatchMock,getStateMock,{})

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1,actions.toggleFollowingProgress(true, 3))
    expect(dispatchMock).toHaveBeenNthCalledWith(2,actions.unfollowSuccess( 3))
    expect(dispatchMock).toHaveBeenNthCalledWith(3,actions.toggleFollowingProgress(false, 3))
})


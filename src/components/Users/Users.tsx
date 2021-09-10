import mU from "./Users.module.css";
import photoUserNull from "../../assets/images/photoUserNull.png";
import React, {useEffect} from "react";
import {NavLink} from "react-router-dom";
import friendImg from "../../assets/images/friend.png"
import Paginator from "./Paginator";
import {UserType} from "../../types/types";
import UsersSearchForm from "./Users_Search"
import {Filter, follow, requestUsers} from "../redux/Reducers/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage, getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from "../redux/Selectors/User_Selector";
import {getAuthorizedId, getIsAuth} from "../redux/Selectors/Auth_Selector";


type PropsType = {

}


export const Users: React.FC<PropsType> = React.memo(props => {

        const users = useSelector(getUsers)
        const totalUsersCount = useSelector(getTotalUsersCount)
        const currentPage = useSelector(getCurrentPage)
        const pageSize = useSelector(getPageSize)
        const filter = useSelector(getUsersFilter)
        const followingInProgress = useSelector(getFollowingInProgress)
        const isAuth = useSelector(getIsAuth)
        const authorizedId = useSelector(getAuthorizedId)


        const dispatch = useDispatch()

        useEffect(() => {
            dispatch(requestUsers(1, pageSize, filter))
        }, [])


        const onPageChanged = (pageNumber: number) => {
            dispatch(requestUsers(pageNumber, pageSize, filter))
        }
        const onFilterChanged = (filter: Filter) => {
            dispatch(requestUsers(1, pageSize, filter))
        }
        const follow = (userId: number) => {
            dispatch(follow(userId))
        }
        const unfollow = (userId: number) => {
            dispatch(unfollow(userId))
        }


        return <div className={mU.wrapper}>
            <div className={mU.mainTitle}>
                <a className={mU.usersTitleGeneral} href='https://www.google.com.ua/?hl=ru'>Users</a>
                {totalUsersCount === 0
                    ? <div style={{color: 'white', fontSize: '2em'}}>Пользователи не найдены</div>
                    : <Paginator totalUsersCount={totalUsersCount} pageSize={pageSize}
                                 currentPage={currentPage} onPageChanged={onPageChanged}
                    />}

            </div>
            <div>
                <UsersSearchForm onFilterChanged={onFilterChanged}/>
            </div>


            <div className={mU.wrapper_of_Users}>
                {users.map(u =>
                    <div className={mU.userContainer} style={u.id === authorizedId ? {background: 'beige'} : {}}
                         key={u.id}>
                        <div className={mU.button_and_photo_container}>
                            <div className={mU.photoContainer}>
                                <NavLink to={'/profile/' + u.id}>
                                    <img src={u.photos.large || photoUserNull}
                                         alt='' className={mU.userPhoto}/>
                                </NavLink>
                            </div>
                            {isAuth && <div>
                                {u.followed
                                    ? <button className={mU.button_unfollow}
                                              disabled={followingInProgress.some(id => id === u.id) || u.id === authorizedId || !isAuth}
                                              onClick={() => {
                                                  unfollow(u.id);
                                              }}>
                                        Удалить из друзей
                                    </button>
                                    : <button className={mU.button_follow}
                                              disabled={followingInProgress.some(id => id === u.id) || u.id === authorizedId || !isAuth}
                                              onClick={() => {
                                                  follow(u.id);
                                              }}>
                                        Добавить в друзья
                                    </button>
                                }</div>}
                        </div>
                        <div className={mU.user_Info_Container}>
                            <div className={mU.user_fullname}>
                                <NavLink to={'/profile/' + u.id}>{u.name}</NavLink>

                            </div>
                            <div className={mU.user_status}>{u.status}</div>

                        </div>
                        <div className={mU.user_moreInfo}>
                            {u.followed ?
                                <div className={mU.friends_or_not}><img src={friendImg} alt='Friend'/></div> : null}
                            <div className={mU.location}>
                                <div>{"city"}</div>
                                <div>{"country"}</div>
                            </div>

                        </div>
                    </div>
                )}</div>
            <div className={mU.mainTitle}>
                <Paginator totalUsersCount={totalUsersCount} pageSize={pageSize}
                           currentPage={currentPage} onPageChanged={onPageChanged}/>
            </div>
        </div>
    }
)


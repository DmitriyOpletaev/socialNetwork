import React, {useEffect, useState} from "react";
import 'antd/dist/antd.css';
import m from './Header.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {getIsAuth, getOwnLogin} from "../redux/Selectors/Auth_Selector";
import {actions, getThemeMode} from "../redux/Reducers/theme-reducer";
import {Avatar, Button, Switch, Tooltip} from "antd";
import {NavLink} from "react-router-dom";
import {useAudio} from "../Video/Audio_Player/useAudio";
import { AudioPlayer } from "../Video/Audio_Player/AudioPlayer";
import {HeaderPlayer} from "./Header_Player";
import {
    getGoogleUser,
    getInitializedGoogle,
    getIsLoading,
    loginGoogle,
    logOutGoogle
} from "../redux/Reducers/Google_Auth-Reducer";
import { GoogleOutlined } from '@ant-design/icons';



type Props = {}

export const MyHeader: React.FC<Props> = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector(getIsAuth)
    const login = useSelector(getOwnLogin)
    const theme = useSelector(getThemeMode)




    function setThemeMode() {
        if (theme === 'dark') dispatch(actions.selectTheme('light'))
        else {
            dispatch(actions.selectTheme('dark'))
        }
    }

    return (
        <article className={`${m.header_wrapper} ${theme === 'dark' && m.header_wrapper_dark_mode}`}>
            <Switch className={m.switch_theme} checkedChildren="dark" unCheckedChildren="light"
                    checked={theme === 'dark'} onChange={setThemeMode}/>
            <div className={m.player_container}>
                <HeaderPlayer/>
            </div>

            <div>
                {isAuth ? login : <NavLink to={'/login'}>login</NavLink>}

                   <GoogleAuthBlock/>

            </div>
        </article>
    )
}

function GoogleAuthBlock(){
    const dispatch = useDispatch()
    const isInitialized = useSelector(getInitializedGoogle)
    const isLoading = useSelector(getIsLoading)
    const userDetails = useSelector(getGoogleUser)

    function login(){
        dispatch(loginGoogle())
    }
 function logOut(){
        dispatch(logOutGoogle())
    }

    return(
        <div>
            {isInitialized ?
                <div>
                    <Avatar src={userDetails?.photo}/>
                    {userDetails?.name}
                    <Button onClick={logOut}>
                        Выйти
                    </Button>
                </div>
            :
                <div>
                    <Tooltip title='googleLogin'>
                        <Button size='large' icon={<GoogleOutlined/>} loading={isLoading} onClick={login}>
                             Войти
                        </Button>
                    </Tooltip>
                </div>
            }
        </div>
    )
}





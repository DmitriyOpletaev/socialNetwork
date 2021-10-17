
import 'antd/dist/antd.css';
import m from './Header.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {getIsAuth, getOwnLogin} from "../redux/Selectors/Auth_Selector";
import {actions, getThemeMode} from "../redux/Reducers/theme-reducer";
import {Avatar, Button, Switch, Tooltip} from "antd";
import {NavLink} from "react-router-dom";

import {HeaderPlayer} from "./Header_Player";
import {
    actionsGoogleAuth, getInitializedGoogle,
} from "../redux/Reducers/Google_Auth-Reducer";

import {GoogleLogin, GoogleLogout,} from 'react-google-login';
import {useState} from "react";
import {GoogleOutlined} from "@ant-design/icons";



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

            </div>
            <GOOGLE_LOGIN/>

        </article>
    )
}


function GOOGLE_LOGIN(){
    const dispatch = useDispatch()
    const theme = useSelector(getThemeMode)
    const isInitialized = useSelector(getInitializedGoogle)
    const [userName,setUserName]= useState('')
    const [userImage,setImage]= useState('')

function responseGoogleSuccess (response: any){
    dispatch(actionsGoogleAuth.setGoogleLogin(response.accessToken))
    setUserName(response.profileObj.email)
    setImage(response.profileObj.imageUrl)
}
function responseGoogleFailure(response:any){
  console.log('error')

}
function logout(){
        dispatch(actionsGoogleAuth.setGoogleLogout())
}
    return(<>
            {isInitialized?<>

                <GoogleLogout
                    clientId="205239420469-a77bsbiec4k1mpu3lb4nfl05krmm6262.apps.googleusercontent.com"
                               onLogoutSuccess={logout} buttonText='LogOut'
                    render={renderProps => (
                        <Button type={theme==='dark'? 'dashed':'primary'} className={m.login_button} onClick={renderProps.onClick} disabled={renderProps.disabled}
                                icon={<Avatar src={userImage}/>}>
                            LogOut
                        </Button>
                    )}
                />
                </>
                :
                <GoogleLogin
                    clientId="205239420469-a77bsbiec4k1mpu3lb4nfl05krmm6262.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={responseGoogleSuccess}
                    onFailure={responseGoogleFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                    render={renderProps => (
                        <Tooltip title='login'>
                            <Button type={theme==='dark'? 'dashed':'primary'} className={m.login_button} size='large' onClick={renderProps.onClick} disabled={renderProps.disabled}
                                    icon={<GoogleOutlined style={{fontSize:'22px'}}/>}>
                                Login
                            </Button>
                        </Tooltip>

                    )}
                />
            }
        </>
    )

}

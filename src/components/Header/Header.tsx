import 'antd/dist/antd.css';
import m from './Header.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {getIsAuth, getOwnLogin} from "../redux/Selectors/Auth_Selector";
import {actions, getThemeMode} from "../redux/Reducers/theme-reducer";
import {Switch} from "antd";
import {NavLink} from "react-router-dom";
import {HeaderPlayer} from "./Header_Player";
import {FC} from "react";
import {GoogleLoginButton} from "../common/Google_Login/Google_Login_Button";
import {FacebookLoginButton} from "../common/Facebook_Login_Button";


type Props = {}

export const MyHeader: FC<Props> = () => {
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
              <FacebookLoginButton/>
            <GoogleLoginButton/>


        </article>
    )
}

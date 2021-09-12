
import React, {useState} from "react";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import 'antd/dist/antd.css';
import {Header} from "antd/lib/layout/layout";
import { NavLink } from "react-router-dom";
import h from './Header.module.css'
import {useSelector} from "react-redux";
import {getIsAuth, getOwnLogin} from "../redux/Selectors/Auth_Selector";

type Props = {
    collapsed: boolean
    toggle: ()=>void
}

export const MyHeader: React.FC<Props> = ({ collapsed, toggle}) => {

    let [isSetting, SettingShow] = useState(false)

    const isAuth = useSelector(getIsAuth)
    const login = useSelector(getOwnLogin)

    return (<div>
            <Header className={h.header_container}>
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger', style:{color:'white'},
                    onClick: toggle,
                })}
                <div className={h.loginContainer}>
                {isAuth && <NavLink to={'/my_account'}>{login}</NavLink>}
                </div>
            </Header>

</div>
        /* <header className={classes.header}>




             <NavLink className={classes.homePageLink} to='/homepage'>
                 <img className={`${classes.header_logo2} ${classes.active}`}
                      alt="HomePage Logo" src="https://img.icons8.com/cotton/2x/home.png"/>
             </NavLink>
             <NavLink className={classes.facebook}
                      to={'/login/facebook'}>Facebook</NavLink>
             <div>
                 <div className={classes.loginBlock}>
                     {isAuth ?
                         <NavLink to={'/my_account'}>{login}</NavLink>
                         :
                         <NavLink to={'/login'}>Login</NavLink>
                     }

                 </div>

                 {isAuth && <div onClick={() => {
                     SettingShow(!isSetting)
                 }} className={classes.settingIconBlock}>
                     <img src={settingIcon} alt={'Setting'} className={classes.settingIcon}/>
                 </div>}
             </div>
             {isSetting && isAuth &&
             <AccountSettingBlock SettingShow={SettingShow} isSetting={isSetting} logOut={logOut}/>}

         </header>*/
    )
}




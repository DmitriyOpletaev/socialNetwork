import classes from './Header.module.css';
import {NavLink} from "react-router-dom";
import settingIcon from "../../assets/images/Icons/setting-icon-2.jpg"
import React, {useState} from "react";

type Props = {
    isAuth: boolean
    logOut: () => void
    login: string|null
}

let Header:React.FC<Props>=({isAuth, logOut, login,}) =>{

    let [isSetting, SettingShow] = useState(false)

    return (
        <header className={classes.header}>

            <NavLink className={classes.homePageLink} to=''>
                <img className={`${classes.header_logo1} ${classes.active}`}
                     alt="logo Home-Page"
                     src="https://static.rfstat.com/renderforest/images/v2/logo-homepage/gradient_3.png"/>
            </NavLink>


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

        </header>
    )
}

type SettingsType={
    logOut:()=>void
    SettingShow:(isSetting:boolean)=>void
    isSetting:boolean
}
let AccountSettingBlock:React.FC<SettingsType>=({logOut, SettingShow, isSetting})=> {

    return (
        <div className={classes.SettingBlockContainer}>
            <button>Setting</button>
            <button>BLA-BLA</button>
            <button>Console</button>
            <button onClick={() => {
                SettingShow(!isSetting);
                logOut()
            }}>EXIT
            </button>
        </div>
    )

}


export default Header;
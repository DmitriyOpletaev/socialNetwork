
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

    return (
            <Header className={h.header_container}>
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger', style:{color:'white'},
                    onClick: toggle,
                })}
                <div className={h.loginContainer}>
                {isAuth && <NavLink to={'/my_account'}>{login}</NavLink>}
                </div>
            </Header>
    )
}




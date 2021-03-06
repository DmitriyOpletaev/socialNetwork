import n from './Nav.module.css';
import {NavLink, useHistory} from "react-router-dom";
import {Menu} from "antd";
import {
    MoneyCollectOutlined, PieChartOutlined, UserOutlined, HddOutlined, TeamOutlined, MessageOutlined, CameraOutlined,
    CustomerServiceOutlined, PartitionOutlined, VideoCameraOutlined
} from "@ant-design/icons";
import React from "react";
import './Nav.module.css';
import SubMenu from 'antd/lib/menu/SubMenu';
import {useDispatch, useSelector} from "react-redux";
import {logOutMe} from "../redux/Reducers/auth_reducer";
import {getIsAuth, getOwnLogin} from "../redux/Selectors/Auth_Selector";
import {getThemeMode} from "../redux/Reducers/theme-reducer";


function Nav() {
    const isAuth = useSelector(getIsAuth)
    const login = useSelector(getOwnLogin)
    const theme = useSelector(getThemeMode)

    const dispatch = useDispatch()
    const quit = () => {
        dispatch(logOutMe());
    }
    const history = useHistory()
    let keyFromHistory = history.location.pathname.substr(1)


    return (

        <>
            <Menu theme={theme} mode="inline" /*defaultOpenKeys={['1']}*/ defaultSelectedKeys={[keyFromHistory]}
                  className={n.Menu}>

                {isAuth ?
                    <SubMenu key="1" title='Profile' icon={<UserOutlined/>}>

                        <Menu.Item key="profile" icon={<UserOutlined/>}>
                            <NavLink to="/profile">
                                {login}
                            </NavLink>
                        </Menu.Item>


                        <Menu.Item key="setting" icon={<UserOutlined/>}>
                            Setting
                        </Menu.Item>
                        <Menu.Item onClick={quit} key="1.3" icon={<UserOutlined/>}>
                            Quit
                        </Menu.Item>

                    </SubMenu>
                    :
                    <Menu.Item key="login" icon={<UserOutlined/>}>
                        <NavLink to="/login">
                            Login
                        </NavLink>
                    </Menu.Item>
                }

                <Menu.Item key="photos" icon={<CameraOutlined/>}>
                    <NavLink to="/photos">
                        Photos
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="videos" icon={<VideoCameraOutlined/>}>
                    <NavLink to="/videos">
                        Videos
                    </NavLink>
                </Menu.Item>

                <Menu.Item key="users" icon={<TeamOutlined/>}>
                    <NavLink to="/users">
                        Users
                    </NavLink>
                </Menu.Item>

                <Menu.Item key="usersFacebook" icon={<TeamOutlined/>}>
                    <NavLink to="/usersFacebook">
                        usersFacebook
                    </NavLink>
                </Menu.Item>

                <Menu.Item key="chat" icon={<MessageOutlined/>}>
                    <NavLink to="/chat">
                        Chat
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="groups" icon={<MoneyCollectOutlined/>}>
                    <NavLink to="/groups">
                        Groups
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="News" icon={<HddOutlined/>}>
                    <NavLink to="/news">
                        News
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="music" icon={<CustomerServiceOutlined/>}>
                    <NavLink to="/music">
                        Music
                    </NavLink>
                </Menu.Item>
                <Menu.Item key='praktika' icon={<PieChartOutlined/>}>
                    <NavLink to='/praktika'>
                        praktika
                    </NavLink>
                </Menu.Item>

            </Menu>
        </>

    )
}

export default Nav;
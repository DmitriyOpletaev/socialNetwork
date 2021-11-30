import {useDispatch, useSelector} from "react-redux";
import m from './Menu.module.scss';
import {Avatar, Menu} from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import {useEffect, useMemo} from "react";
import {
    CompassOutlined,
    LikeOutlined,
    VideoCameraAddOutlined,
    ClockCircleOutlined,
    DislikeOutlined,
    FireOutlined,
    VideoCameraOutlined,
    CustomerServiceOutlined,
    DribbbleOutlined,
    DesktopOutlined, ContainerOutlined, PlayCircleOutlined,
} from "@ant-design/icons";
import {
    actionsMainVideoReducer,
    getSubscribesChannels,
    getSubscriptionsChannels, getUserChannel
} from "../../redux/Reducers/Video_Page_Reducers/videoMainReducer";
import {useVideo} from "../Video_Components/useVideo";
import {useSearchVideos} from "../Video_Components/useSearchVideos";
import {SearchVideosSelector, MainVideoSelector} from "../../redux/Selectors/Videos_Selector";
import {getAccessToken} from "../../redux/Reducers/Auth-Reducer";
import {GoogleLoginButton} from "../../common/Google_Login/Google_Login_Button";

const navigatorCategories = [
    {name: 'В тренде', index: 'trends', icon: <FireOutlined/>},
    {name: 'Фильмы и анимация', index: '1', icon: <VideoCameraOutlined/>},
    {name: 'Музыка', index: '10', icon: <CustomerServiceOutlined/>},
    {name: 'Спорт', index: '17', icon: <DribbbleOutlined/>},
    {name: 'Игры', index: '20', icon: <DesktopOutlined/>},
    {name: 'Юмор', index: '23', icon: <CustomerServiceOutlined/>},
    {name: 'Новости и политика', index: '25', icon: <ContainerOutlined/>},
] as const
const menuItems = [
    {name: 'Мои видео', index: 'userVideos', icon: <VideoCameraAddOutlined/>,canBeDisabled:true},
    {name: 'Понравившиеся', index: 'likesVideos', icon: <LikeOutlined/>,canBeDisabled:true},
    {name: 'Не понравившиеся', index: 'dislikesVideos', icon: <DislikeOutlined/>,canBeDisabled:true},
] as const


export function VideosPageMenu() {
    const dispatch = useDispatch()
    const {accessToken, openChannel} = useVideo()
    const userChannel = useSelector(MainVideoSelector.userChannel)
    const {searchCategory} = useSearchVideos()
    const {categoryId} = useSelector(SearchVideosSelector.searchDetails)
    useEffect(() => {
        accessToken && dispatch(getSubscribesChannels(accessToken))
        !accessToken && dispatch(actionsMainVideoReducer.setSubscriptionChannels(null))
    }, [accessToken])

    useEffect(() => {
        searchCategory('trends')
    }, [])
    useEffect(() => {
        if (!userChannel && accessToken) dispatch(getUserChannel(accessToken))
    }, [accessToken])
    const NavigatorItems = useMemo(() => {
        return navigatorCategories.map(({name,icon,index}) => (
            <Menu.Item key={index}
                       onClick={() => index !== categoryId && searchCategory(index)}
                       className={m.menu_item}
                       icon={icon}>
                {name}
            </Menu.Item>
        ))
    }, [categoryId])
    const MenuItems = useMemo(() => {
        return menuItems.map(({canBeDisabled,icon,index,name}) => (
            <Menu.Item key={index}
                       disabled={canBeDisabled && !accessToken}
                       onClick={() => index !== categoryId && searchCategory(index)}
                       className={m.menu_item}
                       icon={icon}>
                {name}
            </Menu.Item>
        ))
    }, [categoryId, accessToken])
    return (
        <div className={m.menu_container}>
            <Menu mode="inline"
                  className={m.menu}
                  selectedKeys={[categoryId ? categoryId : '']}
                  defaultOpenKeys={['navigator', 'subscribersChannels']}
            >
                <UserChannelMenuItem/>
                <SubMenu key={'navigator'}
                         title='Навигатор'
                         className={m.submenu}
                         icon={<CompassOutlined/>}>
                    {NavigatorItems}
                </SubMenu>
                {MenuItems}
                {accessToken && <SubscribersChannelsBlock/>}
            </Menu>
        </div>
    )
}


function SubscribersChannelsBlock() {
    const {openChannel} = useVideo()
    const subscribersChannels = useSelector(getSubscriptionsChannels)
    const SubscribersChannels = useMemo(() => {
        return (subscribersChannels.map(c => (
                <Menu.Item className={m.menu_item}
                           key={c.channelId}
                           onClick={() => openChannel(c.channelId)}
                           icon={<Avatar src={c.channelLogo}/>}
                >
                    {c.title}
                </Menu.Item>
            ))
        )
    }, [subscribersChannels, openChannel])

    return (
        <Menu.ItemGroup title='Подписки'
                        className={m.submenu}
                        children={SubscribersChannels}/>
    )
}


function UserChannelMenuItem() {
    const accessToken = useSelector(getAccessToken)
    const userChannel = useSelector(MainVideoSelector.userChannel)
    const {openChannel} = useVideo()
    if(!accessToken){
        return (
            <Menu.Item>
                <div className={m.user_channel_menu_item}>
                    <GoogleLoginButton/>
                </div>
            </Menu.Item>
        )
    }
    if (userChannel && accessToken) {
        const {channelLogo, channelId, title,} = userChannel
        return (
            <Menu.Item onClick={() => openChannel(channelId)}>
                <div className={m.user_channel_menu_item}>
                    <Avatar src={channelLogo} size='large'/>
                    <span>{title}</span>
                </div>
            </Menu.Item>
        )
    }
    return <></>
}


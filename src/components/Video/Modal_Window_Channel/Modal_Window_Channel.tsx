import { Tabs} from "antd"
import m from './Modal_Window_Channel.module.scss'
import {useSelector} from "react-redux";
import {
    getIsLoadingCurrentChannelSelector,
    getMultipleChannelsSelector
} from "../../redux/Selectors/Videos_Selector";
import {ChannelHeader} from "./Channel_Header";
import { AboutChannel } from "./Channel_Tabs/About_Channel";
import {ChannelMainPage} from "./Channel_Tabs/Channel_Main_Page";
import {MultipleChannel} from "./Channel_Tabs/Multiple_Channel";
import {PlaylistsPage} from "./Channel_Tabs/PlaylistsPage";
import Preloader from "../../common/preloader/preloader";
import { ChannelVideos } from "./Channel_Tabs/ChannelVideos";

export const ChannelPopup = () => {
    const isLoading = useSelector(getIsLoadingCurrentChannelSelector)
    const { TabPane } = Tabs;
    const multipleChannelsSection=useSelector(getMultipleChannelsSelector)
    if(isLoading)return <Preloader/>
    return (
        <>
            <ChannelHeader/>
            <Tabs  defaultActiveKey='1' centered>
                <TabPane tab={<span className={m.tabs_title}>Главная</span>} key="1">
                    <ChannelMainPage/>
                </TabPane>
                <TabPane tab={<span className={m.tabs_title}>Видео</span>} key="2">
                    <ChannelVideos/>
                </TabPane>
                <TabPane tab={<span className={m.tabs_title}>Плейлисты</span>} key="3">
                    <PlaylistsPage/>
                </TabPane>
                <TabPane tab={<span className={m.tabs_title}>Каналы</span>} key="4">
                    <MultipleChannel multipleChannelsSection={multipleChannelsSection}/>
                </TabPane>
                <TabPane tab={<span className={m.tabs_title}>О канале</span>} key="5">
                    <AboutChannel/>
                </TabPane>
            </Tabs>
        </>
    )
}

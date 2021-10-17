import {Button, Image, Modal, Tabs, Tooltip} from "antd"
import {FC} from "react";
import m from './Modal_Window_Channel.module.scss'
import {useSelector} from "react-redux";
import {getCurrentChannelInfoSelector} from "../../redux/Selectors/Videos_Selector";
import {YoutubeAPI} from "../../api/Youtube_API";
import {YoutubeOutlined} from "@ant-design/icons";
import {ChannelHeader} from "./Channel_Header";
import { AboutChannel } from "./About_Channel";


type ChannelPopupProps = {
    visiblePopup: 'video' | 'channel' | null
    setVisiblePopup: (visiblePopup: 'video' | 'channel' | null) => void
}

export const Channel_Popup: FC<ChannelPopupProps> = ({visiblePopup, setVisiblePopup}) => {
    const {id} = useSelector(getCurrentChannelInfoSelector)
    const { TabPane } = Tabs;



    return (
        <Modal
            title={'channel'} centered style={{marginTop: '20px'}} visible={visiblePopup === 'channel'} width={1100}
            footer={false}
            onCancel={() => {setVisiblePopup(null)}}
        >
            { id &&
                <div className={m.youtube_channel_modal_wrapper}>
                    <ChannelHeader/>
                    <Tabs defaultActiveKey="1" centered>
                        <TabPane tab={<span className={m.tabs_title}>Главная</span>} key="1">
                            Главная
                        </TabPane>
                        <TabPane tab={<span className={m.tabs_title}>Видео</span>} key="2">
                            Видео
                        </TabPane>
                        <TabPane tab={<span className={m.tabs_title}>Плейлисты</span>} key="3">
                            Плейлисты
                        </TabPane>
                        <TabPane tab={<span className={m.tabs_title}>Каналы</span>} key="4">
                            Каналы
                        </TabPane>
                        <TabPane tab={<span className={m.tabs_title}>О канале</span>} key="5">
                            <AboutChannel/>
                        </TabPane>
                    </Tabs>


                </div>
            }

        </Modal>
    )
}
import m from "./Modal_Window_Channel.module.scss";
import {Button} from "antd";
import {YoutubeOutlined} from "@ant-design/icons";
import {YoutubeAPI} from "../../api/Youtube_API";
import {useSelector} from "react-redux";
import {getCurrentChannelInfoSelector} from "../../redux/Selectors/Videos_Selector";


export const ChannelHeader=()=>{
    const {title, banner, image, id, description,channelStatistics} = useSelector(getCurrentChannelInfoSelector)
    function open() {
        YoutubeAPI.getSections(id)
    }

    return(
        <div className={m.modal_header}>

            <div className={m.logo_channel_container} onClick={open}>
                <img src={image}/>
            </div>
            <div className={m.title_and_info_container}>

                <div className={m.title}>
                    {title}
                </div>

                <div className={m.subscribersCount_and_button_container}>
                    {!channelStatistics.hiddenSubscriberCount &&
                    <div className={m.subscribersCount}>
                        {channelStatistics.subscriberCount} подписчиков
                    </div>
                    }
                    <div>
                        <Button type='primary' icon={<YoutubeOutlined/>}>
                            Подписаться
                        </Button>
                    </div>

                </div>


            </div>


        </div>
    )
}
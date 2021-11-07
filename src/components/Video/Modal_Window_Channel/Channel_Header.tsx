import m from "./Modal_Window_Channel.module.scss";
import {useSelector} from "react-redux";
import {getCurrentChannelInfoSelector} from "../../redux/Selectors/Videos_Selector";
import {SubscribeChannelButton} from "../Video_Components/Youtube_Subscribe_Button/YouTube_Subscribe_Button";



export const ChannelHeader=()=>{
    const {title, image, id,channelStatistics} = useSelector(getCurrentChannelInfoSelector)

    return(
        <div className={m.modal_header}>
            <div className={m.logo_channel_container}>
                <img src={image} alt='channel logo'/>
            </div>
            <div className={m.title_and_info_container}>

                <div className={m.title}>
                    {title}
                </div>

               { channelStatistics.hiddenSubscriberCount &&
                   <div className={m.subscribersCount_and_button_container}>
                    <div className={m.subscribersCount}>
                        {channelStatistics.subscriberCount} подписчиков
                    </div>
                </div>}
            </div>
            <div className={m.subscribe_button_container}>
                <SubscribeChannelButton channelId={id} channelTitle={title}/>
            </div>


        </div>
    )
}
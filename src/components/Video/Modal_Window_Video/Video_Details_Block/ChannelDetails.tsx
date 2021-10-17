import React, {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentVideoChannel} from "../../../redux/Selectors/Videos_Selector";
import {countReformat2} from "../../../utils/validators/string_formatting";
import m from "../Modal_Window_Styles.module.scss";
import {Avatar, Tooltip} from "antd";
import {YoutubeFilled} from "@ant-design/icons";
import {getCurrentChannelInfo} from "../../../redux/Reducers/Video_Page_Reducers/Current_Channel_Reducer";

type ChannelDetailsBlockProps = {
    setVisiblePopup: (visiblePopup: 'video' | 'channel' | null) => void
}
export const ChannelDetailsBlock: FC<ChannelDetailsBlockProps> = ({setVisiblePopup}) => {
    const {title, subscribersCount, imgUrl ,channelId} = useSelector(getCurrentVideoChannel)
    const subscribes = countReformat2(subscribersCount)
    const channelLink = `https://www.youtube.com/channel/${channelId}`
    const dispatch = useDispatch()

    function openChannel() {
        setVisiblePopup('channel')
        dispatch(getCurrentChannelInfo(channelId))
    }

    return (
        <div className={m.channelDetails_container}>
            <div onClick={openChannel}>
                <Tooltip placement="left" title={title}>
                    <Avatar className={m.channel_avatar} src={imgUrl}/>
                </Tooltip>
            </div>
            <div className={m.channelInformation_container}>
                <Tooltip placement="top" title={title}>
                    <div className={m.channel_title} onClick={openChannel}>
                        {title}
                    </div>
                </Tooltip>
                <div className={m.channel_subscribersCount}>
                    {subscribes} подписчиков
                </div>
            </div>
            <div className={m.youtube_channel_link}>
                <Tooltip placement="right" title={'Открыть канал на сайте youtube.com'}>
                    <a href={channelLink} target='_blank' rel="noreferrer"><YoutubeFilled/></a>
                </Tooltip>
            </div>

        </div>
    )
}
import {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    getChannelAllVideos,
} from "../../../redux/Reducers/Video_Page_Reducers/Current_Channel_Reducer";
import {
    getAllChannelVideos,
    getCurrentChannelInfoSelector
} from "../../../redux/Selectors/Videos_Selector";
import {VideoPreview} from "../../Video_Components/Video_Preview";
import m from "./Channel_Tabs.module.scss";
import {Button} from "antd";
import {SmallDashOutlined} from "@ant-design/icons";
import Preloader from "../../../common/preloader/preloader";


export const ChannelVideos = () => {

    const dispatch = useDispatch()

    function getVideos(channelId: string, pageToken: string | null = null) {
        dispatch(getChannelAllVideos(channelId, pageToken))
    }


    const {id} = useSelector(getCurrentChannelInfoSelector) // Current Channel Id
    useEffect(() => {
        getVideos(id)
    }, [id])
    const {isLoading, channelVideos, otherDetails} = useSelector(getAllChannelVideos)
    const {nextPageTokenChannelVideos, totalVideoCount} = otherDetails

    const Videos = useMemo(() => {
        return channelVideos.map((v) => (
            <div className={m.videoContainer}>
                <VideoPreview video={v}/>
            </div>
        ))
    }, [channelVideos])
    if (channelVideos.length === 0 && isLoading) return <Preloader/>

    return (
        <div>
            <h2>
                {totalVideoCount ?
                    <span>{totalVideoCount} видео</span>
                    :
                    <span>На канале нет загруженных видео</span>
                }
            </h2>
            <div className={m.channelVideos_wrapper}>
                {Videos}
                {nextPageTokenChannelVideos &&
                <div className={m.videoContainer}>
                    <Button type='dashed' block  loading={isLoading} className={m.button_more}
                            onClick={() => getVideos(id, nextPageTokenChannelVideos)}>
                        Ещё видео
                    </Button>
                </div>
                }
            </div>
        </div>
    )
}
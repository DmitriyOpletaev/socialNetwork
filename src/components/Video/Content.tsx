import {useSelector} from "react-redux";
import React, {FC, useMemo} from "react";
import m from "./Video.module.scss";
import {CaretRightOutlined, PlayCircleOutlined,MenuUnfoldOutlined} from "@ant-design/icons";
import {Button, Empty, Tooltip} from "antd";
import {useVideo} from "./Video_Components/useVideo";
import {
    countReformat1,
    dateReformat,
    parseISO8601Duration,

} from "../utils/validators/string_formatting";
import {SearchVideosSelector} from "../redux/Selectors/Videos_Selector";
import {useSearchVideos} from "./Video_Components/useSearchVideos";
import {Channel, Playlist, Video} from "../redux/Reducers/Video_Page_Reducers/Videos_Search_Reducer";
import {SubscribeChannelButton} from "./Video_Components/Youtube_Subscribe_Button/YouTube_Subscribe_Button";


export function VideosContent() {
    const {videos,playlists,channels} = useSelector(SearchVideosSelector.searchResult)
    const {nextPage,searchDetails}=useSearchVideos()
    const{totalResults}=searchDetails

    const VideosElements = useMemo(() => {
        return videos?.map(video => (
            <VideoElement video={video} key={video.videoId}/>
        ))
    }, [videos])
    const ChannelElements = useMemo(()=>{
        return channels?.map(channel=>(
            <ChannelElement channel={channel} key={channel.channelId}/>
        ))
    },[channels])
    const PlaylistElements = useMemo(()=>{
        return playlists?.map(playlist=>(
            <PlaylistElement playlist={playlist} key={playlist.playlistId}/>
        ))
    },[playlists])

    if (videos && videos.length === 0) return (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'Видео не найдены'}/>
    )
    return (
            <div className={m.videos_preview_wrapper}>
                {ChannelElements}
                {PlaylistElements}
                {VideosElements}
                {videos && totalResults > videos.length &&
                <Button block type='dashed' size='large' className={m.button_more} onClick={nextPage}>
                    Ещё видео
                </Button>
                }

            </div>
    )
}


type ChannelElementProps={channel:Channel}
const ChannelElement:FC<ChannelElementProps>=({channel})=>{
    const{title,channelId,logo,hiddenSubscriberCount,subscriberCount}=channel
    const {openChannel} = useVideo()
    return(
        <div className={`${m.search_element_container} ${m.channel}`}>
            <div className={m.img_preview_container}>
                <Tooltip title={title} placement='left'>
                    <div className={m.channel_preview}>
                        <img src={logo} alt='channel' className={m.preview}  onClick={() => openChannel(channelId)}/>
                    </div>
                </Tooltip>
            </div>
            <div className={m.details_container}>
                <div className={m.video_title}>
                    {title}
                </div>
                <div className={m.statistics_container}>
                    {hiddenSubscriberCount ?
                        <div>Подписчики скрыты</div>
                        :
                    <div>{countReformat1(subscriberCount)} подписчиков</div>
                    }
                    <div className={m.subscribe_button_container}>
                        <SubscribeChannelButton channelId={channelId} channelTitle={title}/>
                    </div>
                </div>
            </div>
        </div>
    )
}




type VideoElementProps={video:Video}
const VideoElement:FC<VideoElementProps>=({video})=>{
    const{videoId,channelTitle,title,channelId,previewImg,publishTime,totalViews,duration}=video
    const {openVideo, openChannel} = useVideo()
    return(
        <div className={m.search_element_container}>
            <div className={m.img_preview_container}>
                <img src={previewImg} alt='video' className={m.preview}/>
                <div className={m.play_button} onClick={() => openVideo(videoId)}>
                    <span><PlayCircleOutlined/></span>
                    <span>Воспроизвести</span>
                </div>
                {duration &&
                <div className={m.videoDuration}>{parseISO8601Duration(duration)}</div>
                }
            </div>
            <div className={m.details_container}>
                <div className={m.video_title}>
                    {title}
                </div>
                {totalViews &&
                <div className={m.statistics_container}>
                    {countReformat1(totalViews)} просмотров
                </div>
                }
                <div className={m.channel_title} onClick={() => openChannel(channelId)}>
                    <CaretRightOutlined/>
                    {channelTitle}
                </div>
                <div className={m.video_publish_time}>
                    {dateReformat(publishTime)}
                </div>

            </div>
        </div>
    )
}


type PlaylistElementProps={playlist:Playlist}
const PlaylistElement:FC<PlaylistElementProps>=({playlist})=>{
    const{channelTitle,title,channelId,playlistId,videoCount,preview}=playlist
    const {openChannel} = useVideo()
    return(
        <div className={m.search_element_container}>
            <div className={m.img_preview_container}>
                <img src={preview} alt='playlist' className={m.preview}/>
                <div className={m.play_button}>
                    <span><PlayCircleOutlined/></span>
                    <span>Воспроизвести все</span>
                </div>
                <div className={m.playlist_video_count}>
                    <div>{videoCount} видео</div>
                    <div><MenuUnfoldOutlined /></div>
                </div>
            </div>
            <div className={m.details_container}>
                <div className={m.video_title}>
                    {title}
                </div>
                <div className={m.statistics_container}>
                    Плейлист
                </div>
                <div className={m.channel_title} onClick={() => openChannel(channelId)}>
                    <CaretRightOutlined/>
                    {channelTitle}
                </div>
            </div>
        </div>
    )
}
import {useDispatch, useSelector} from "react-redux";
import {
    getContentCategory,
    getPrevNextPageToken,
    getSearchError, getSearchTerm,
    getVideosDetails
} from "../redux/Selectors/Videos_Selector";
import React, {useEffect, useMemo, useState} from "react";
import m from "./Video.module.scss";
import {CaretRightOutlined} from "@ant-design/icons";
import {VideoPopup} from "./Modal_Window_Video/Video_Modal_Window";
import {Button, message} from "antd";
import {getMostPopularVideos, getVideosBySearch} from "../redux/Reducers/Video_Page_Reducers/Videos_Search_Reducer";
import {setCurrentVideo} from "../redux/Reducers/Video_Page_Reducers/Current_Video_Reducer";
import {Channel_Popup} from "./Modal_Window_Channel/Modal_Window_Channel";


export function VideosContent() {
    const dispatch = useDispatch()
    const [visiblePopup, setVisiblePopup] = useState(null as 'video'|'channel'|null);

    const error = useSelector(getSearchError)
    useEffect(() => {
        if (error) {
            message.error(
                <span dangerouslySetInnerHTML={{__html: error.message}}/>
            )
        }
    }, [error])

    const pageToken = useSelector(getPrevNextPageToken)
    const category = useSelector(getContentCategory)
    const searchTerm = useSelector(getSearchTerm)
   function nextPage(){
        if(category==='search'){
            dispatch(getVideosBySearch(searchTerm, pageToken.nextPageTokenSearch ))
        }else if(category==='trends') {
            dispatch(getMostPopularVideos(pageToken.nextPageTokenSearch))
        }
   }
   function openVideo(id:string){
       setVisiblePopup('video')
       dispatch(setCurrentVideo(id))
   }

    const videos = useSelector(getVideosDetails)

    const VideosElements = useMemo(() => {
        return videos?.map(v => (
            <div className={m.video_preview_container} key={v.videoId}>
                <div className={m.img_preview_container}>
                    <img src={v.videoPreviewImg} alt='видео' onClick={()=>openVideo(v.videoId)}/>
                </div>
                <div className={m.video_details_container}>
                    <div className={m.video_title}>
                        {v.title}
                    </div>
                    <div className={m.video_description}>
                        {v.totalViews} просмотров ; duration:{v.videoDuration}
                    </div>
                    <div className={m.channel_title_video_publish_time_container}>
                         <span className={m.channel_title}>
                              <CaretRightOutlined/>
                             {v.channelTitle}
                         </span>
                         <span className={m.video_publish_time}>
                                Видео загружено: {v.publishTime}
                          </span>

                    </div>

                </div>
            </div>
        ))
    }, [videos])



    return (
        <>
            <div className={m.videos_preview_wrapper}>
                {VideosElements}
                {videos.length>0 &&
                <Button block type='dashed' size='large' className={m.button_more} onClick={nextPage}>
                    Больше видео {pageToken.nextPageTokenSearch}
                </Button>
                }
            </div>
            {visiblePopup === 'video' &&
            <VideoPopup visiblePopup={visiblePopup} setVisiblePopup={setVisiblePopup}/>
            }
            {visiblePopup === 'channel' &&
            <Channel_Popup visiblePopup={visiblePopup} setVisiblePopup={setVisiblePopup}/>
            }

        </>
    )
}
import {RelatedVideosType} from "../../../types/Videos_Types";
import React, {useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getRelatedVideoDetails} from "../../redux/Selectors/Videos_Selector";
import m from "./Modal_Window_Styles.module.scss";
import {setCurrentVideo} from "../../redux/Reducers/Video_Page_Reducers/Current_Video_Reducer";




export const RelatedVideos: React.FC = () => {
    const dispatch = useDispatch()
    function openVideo(id:string){
        dispatch(setCurrentVideo(id))
    }
    const relatedVideo = useSelector(getRelatedVideoDetails)
    const RelatedVideosBlock = useMemo(() => {
        return relatedVideo.map((v: RelatedVideosType) => (
            <div key={v.videoId} className={m.video_container}>
                <div className={m.img_container}>
                    <img src={v.videoPreviewImg} alt={v.channelTitle} onClick={()=>openVideo(v.videoId)}/>
                </div>
                <div className={m.title}>
                    {v.title}
                </div>
            </div>
        ))
    }, [relatedVideo])

    return (
        <div className={m.related_videos_wrapper}>
            {RelatedVideosBlock}
        </div>
    )
}


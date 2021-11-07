import React, {useMemo} from "react";
import {useSelector} from "react-redux";
import {getRelatedVideoDetails} from "../../redux/Selectors/Videos_Selector";
import m from "./Modal_Window_Styles.module.scss";
import {VideoPreview} from "../Video_Components/Video_Preview";




export const RelatedVideos: React.FC = () => {

    const relatedVideo = useSelector(getRelatedVideoDetails)
    const RelatedVideosBlock = useMemo(() => {
        return relatedVideo.map((v) => (
            <div key={v.videoId} className={m.video_container}>
                <VideoPreview video={v}/>
            </div>
        ))
    }, [relatedVideo])

    return (
        <div className={m.related_videos_wrapper}>
            {RelatedVideosBlock}
        </div>
    )
}


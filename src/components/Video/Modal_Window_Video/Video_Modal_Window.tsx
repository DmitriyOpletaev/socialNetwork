import {useSelector} from "react-redux";
import {getCurrentVideo, getIsLoadingCurrentVideoDetails} from "../../redux/Selectors/Videos_Selector";
import {Spin} from "antd";
import m from "./Modal_Window_Styles.module.scss";
import ReactPlayer from "react-player";
import {CommentsBlock} from "./Comments/Video_Comments";
import {RelatedVideos} from "./Related_Videos";
import {VideoDetailsBlock} from "./Video_Details_Block/Video_Details";
import Preloader from "../../common/preloader/preloader";


const config = {
    youtube:{
        playerVars:{
            autoplay: 0,
        }
    }
}



export const VideoPopup = () => {

    const currentVideo = useSelector(getCurrentVideo)
    const isLoading = useSelector(getIsLoadingCurrentVideoDetails)
    if (isLoading) return <Preloader/>
    return (
        <div className={m.current_video_container}>
            <div className={m.player_container}>
                <ReactPlayer className={m.videosElement} width='100%' height='100%' controls
                             config={config}
                             url={`https://www.youtube.com/watch?v=${currentVideo.videoId}`}
                />
            </div>

            <div className={m.other_information_wrapper}>
                <div className={m.details_and_comments_wrapper}>
                    <VideoDetailsBlock/>
                    <CommentsBlock currentVideoId={currentVideo.videoId}/>
                </div>
                <RelatedVideos/>
            </div>
        </div>
    )
}



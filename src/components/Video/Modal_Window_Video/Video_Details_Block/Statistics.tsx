import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentUserRating,
    getCurrentVideo,
    getCurrentVideoStatistics
} from "../../../redux/Selectors/Videos_Selector";
import {countReformat1, dateReformat} from "../../../utils/validators/string_formatting";
import m from "../Modal_Window_Styles.module.scss";
import {DislikeOutlined, LikeOutlined, LikeFilled, DislikeFilled} from "@ant-design/icons";
import React from "react";
import {setUserRating} from "../../../redux/Reducers/Video_Page_Reducers/Current_Video_Reducer";
import {useVideo} from "../../Video_Components/useVideo";
import {ComplainsButton} from "./Complains_Button";
import {useGoogleUnauthorizedPopover} from "../../../common/Google_Login/useUnauthorizedGooglePopover";


type StatisticsProps = {
    publishedAt: string
}

export const VideoStatisticsBlock = ({publishedAt}: StatisticsProps) => {
    const {viewCount} = useSelector(getCurrentVideoStatistics)
    const date = dateReformat(publishedAt)
    const views = countReformat1(viewCount)
    return (
        <div className={m.video_statistics}>
            <div>
                <span className={m.video_count}>{views} просмотров</span>
                <span className={m.margin_symbol}>&#8226;</span>
                <span className={m.publishedAt} dangerouslySetInnerHTML={{__html: date}}/>
            </div>
            <div className={m.rating_and_complains_wrapper}>
                <VideoRating/>
                <ComplainsButton/>
            </div>
        </div>
    )
}

const VideoRating = () => {
    const {likeCount, dislikeCount} = useSelector(getCurrentVideoStatistics)
    const likes = countReformat1(likeCount)
    const dislikes = countReformat1(dislikeCount)
    const userRating = useSelector(getCurrentUserRating)
    const {videoId} = useSelector(getCurrentVideo)
    const {accessToken} = useVideo()
    const dispatch = useDispatch()

    function setVideoRating(rating: 'none' | 'dislike' | 'like') {
        if (accessToken) dispatch(setUserRating(videoId, rating, accessToken))
    }
    function likeVideo(){
        setVideoRating('like')
    }
    function dislikeVideo(){
        setVideoRating('dislike')
    }
    const likeButton = useGoogleUnauthorizedPopover(
        <div className={m.like}><LikeOutlined/>{likes}</div>,
        likeVideo
    )
    const dislikeButton = useGoogleUnauthorizedPopover(
        <div className={m.dislike}><DislikeOutlined/>{dislikes}</div>,
        dislikeVideo
    )

    return (
        <div className={m.likes_container}>
            {userRating === 'like' ?
                <div className={m.like} key={'none'}  onClick={() => setVideoRating('none')}>
                    <LikeFilled/>
                    <span>
                        {likes}
                    </span>
                </div>
                :
                likeButton
            }
            {userRating === 'dislike' ?
                <div className={m.dislike} onClick={() => setVideoRating('none')}>
                    <DislikeFilled/>
                    <span>{dislikes}</span>
                </div>
                :
                dislikeButton
            }
        </div>
    )
}



import {useSelector} from "react-redux";
import {getCurrentVideoStatistics} from "../../../redux/Selectors/Videos_Selector";
import {countReformat1, dateReformat} from "../../../utils/validators/string_formatting";
import m from "../Modal_Window_Styles.module.scss";
import {DislikeOutlined, LikeOutlined} from "@ant-design/icons";
import React from "react";

type StatisticsProps = {
    publishedAt: string
}
export const VideoStatisticsBlock = ({publishedAt}: StatisticsProps) => {
    const {likeCount, dislikeCount, viewCount} = useSelector(getCurrentVideoStatistics)
    const date = dateReformat(publishedAt)
    const views = countReformat1(viewCount)
    const likes = countReformat1(likeCount)
    const dislikes = countReformat1(dislikeCount)

    return (
        <div className={m.video_statistics}>
            <div>
                <span className={m.video_count}>{views} просмотров</span>
                <span className={m.margin_symbol}>&#8226;</span>
                <span className={m.publishedAt} dangerouslySetInnerHTML={{__html: date}}/>
            </div>
            <div className={m.likes_container}>
                <span className={m.like}><LikeOutlined/>{likes}</span>
                <span className={m.dislike}><DislikeOutlined/>{dislikes}</span>
            </div>
        </div>
    )
}







import React, {FC} from "react";
import {useSelector} from "react-redux";
import {getCurrentVideo,} from "../../../redux/Selectors/Videos_Selector";
import m from "../Modal_Window_Styles.module.scss";
import { ChannelDetailsBlock } from "./ChannelDetails";
import {DescriptionBlock} from "./Descriptions";
import {VideoStatisticsBlock} from "./Statistics";


export const VideoDetailsBlock = () => {
    const {title, publishedAt, tags, description} = useSelector(getCurrentVideo)
    return (
        <>
            <div className={m.title}>
                <span>{title}</span>
            </div>
            <VideoStatisticsBlock publishedAt={publishedAt}/>
            <ChannelDetailsBlock/>
            <DescriptionBlock description={description} tags={tags}/>
        </>
    )
}





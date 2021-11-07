import {Tooltip} from "antd";
import {truncateString} from "../../utils/validators/string_formatting";
import {FC} from "react";
import {PreviewVideo} from "../../../types/Videos_Types";
import m from './Video_Prewiew.module.scss'
import {CaretRightOutlined} from "@ant-design/icons";
import {useVideo} from "./useVideo";

interface VideoPreviewProps {
    video: PreviewVideo
}

export const VideoPreview: FC<VideoPreviewProps> = ({video}) => {

    const {openVideo} = useVideo()

    const {preview, videoId, title} = video
    return (
        <div className={m.video_container} onClick={() => openVideo(videoId)}>
            <div className={m.preview_container}>
                <img src={preview} alt='Смотреть видео'/>
                <div className={m.play_button}>
                    <span className={m.playIcon}><CaretRightOutlined/></span>
                    <span>Воспроизвести</span>
                </div>
            </div>
            <Tooltip placement='bottom' title={title}>
                <div className={m.title}
                     dangerouslySetInnerHTML={{__html: truncateString(title, 50, true)}}/>
            </Tooltip>


        </div>
    )
}
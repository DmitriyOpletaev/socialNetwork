import {message, Popconfirm} from "antd"
import {FlagOutlined} from "@ant-design/icons"
import m from "../Modal_Window_Styles.module.scss"
import React, {FC, useEffect, useState} from "react"
import {useGoogleUnauthorizedPopover} from "../../../common/Google_Login/useUnauthorizedGooglePopover"
import {useDispatch, useSelector} from "react-redux";
import {
    actionsCurrentVideo,
    markCommentAsSpam
} from "../../../redux/Reducers/Video_Page_Reducers/Current_Video_Reducer";
import {getAccessToken} from "../../../redux/Reducers/Auth-Reducer";
import {
    CurrentVideoSelector
} from "../../../redux/Selectors/Videos_Selector";

type MarkAsSpamButtonProps = {
    commentId: string
}
export const MarkAsSpamButton: FC<MarkAsSpamButtonProps> = ({commentId}) => {
    const dispatch = useDispatch()
    const accessToken = useSelector(getAccessToken)
    const [abusedComment,setAbusedComment]=useState(null as string|null)
    useEffect(()=>{
        accessToken && abusedComment && dispatch(markCommentAsSpam(commentId, accessToken))
    },[abusedComment])
    const videoReportAbuseButton = useGoogleUnauthorizedPopover(<FlagOutlined/>)
    const {commentsStatus} = useSelector(CurrentVideoSelector.videoComments)
    const okButtonProps = {
        onClick: ()=>setAbusedComment(commentId),
        loading: commentsStatus === 'loadingAbuseComment'
    }
    const markAsSpamSuccessMessage = () => {
        message.success({
            content: 'Жалоба отправлена',
        })
    }
    useEffect(() => {
        if (commentsStatus === 'abuseCommentCompleted') {
            abusedComment && markAsSpamSuccessMessage()
            setAbusedComment(null)
            dispatch(actionsCurrentVideo.setCommentsStatus(null))
        }
    }, [commentsStatus])
    return (
        <div className={m.spam_button}>
            {accessToken ?
                <Popconfirm okButtonProps={okButtonProps}
                            okText='Пожаловаться'
                            cancelText='Отмена'
                            title={<span>Отметить комментарий как спам?</span>}>
                    {videoReportAbuseButton}
                </Popconfirm>
                :
                videoReportAbuseButton
            }
        </div>
    )
}

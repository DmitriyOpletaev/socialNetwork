import m from "../Modal_Window_Styles.module.scss"
import {Avatar, Button, Comment, Input} from "antd"
import React, {FC, useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux";
import {CurrentVideoSelector, MainVideoSelector} from "../../../redux/Selectors/Videos_Selector";
import {useVideo} from "../../Video_Components/useVideo";
import {actionsCurrentVideo, insertComment} from "../../../redux/Reducers/Video_Page_Reducers/Current_Video_Reducer";
import {useGoogleUnauthorizedPopover} from "../../../common/Google_Login/useUnauthorizedGooglePopover"
import {ArrowRightOutlined} from "@ant-design/icons";


type CommentInputProps = { videoId: string }
export const CommentInput: FC<CommentInputProps> = ({videoId}) => {
    const {accessToken} = useVideo()
    const {channelId} = useSelector(CurrentVideoSelector.channel)
    const userChannel = useSelector(MainVideoSelector.userChannel)
    const [term, setTerm] = useState('')
    const [comment, setComment] = useState(null as string | null)
    const dispatch = useDispatch()
    const {commentsStatus} = useSelector(CurrentVideoSelector.videoComments)
    const loadingInsertComment = commentsStatus === 'loadingInsertComment'
    useEffect(() => {
        if (comment && accessToken) {
            dispatch(insertComment(videoId, channelId, comment, accessToken))
        }
    }, [comment])
    useEffect(() => {
        if (commentsStatus === 'commentInsert') {
            setTerm('')
            setComment(null)
            dispatch(actionsCurrentVideo.setCommentsStatus(null))
        }
    }, [commentsStatus])
    const Login = useGoogleUnauthorizedPopover(<span>Войдите</span>, () => {
    }, 'top', '')
    if (!accessToken || !userChannel) return (
        <div className={m.comment_if_user_unauthorized}>
            <div>
                {Login}
            </div>
            ,чтобы оставить комментарий
        </div>
    )
    return (
        <Comment className={m.comment_container}
                 avatar={<Avatar src={userChannel.channelLogo}/>}
                 content={
                     <div className={m.input_container}>
                         <Input.TextArea autoSize={{minRows: 1, maxRows: 6}} value={term}
                                         className={m.input_comment}
                                         placeholder='Написать комментарий'
                                         onChange={(e) => setTerm(e.currentTarget.value)}
                                         disabled={loadingInsertComment}
                         />
                         {term.length > 0 &&
                         <div className={m.comment_input_buttons_container}>
                             <Button type='link' onClick={() => setTerm('')}>
                                 Отмена
                             </Button>
                             <Button type='link'
                                     icon={<ArrowRightOutlined/>}
                                     loading={loadingInsertComment}
                                     onClick={() => setComment(term)}>
                                 Отправить
                             </Button>
                         </div>
                         }

                     </div>
                 }
        />
    )
}
import React, {FC, useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    CurrentVideoSelector,
    getCurrentVideoChannel, getCurrentVideoStatistics,
} from "../../../redux/Selectors/Videos_Selector";
import {getVideoComments} from "../../../redux/Reducers/Video_Page_Reducers/Current_Video_Reducer";
import {Button, Dropdown, Menu} from "antd";
import m from "../Modal_Window_Styles.module.scss";
import {DownCircleOutlined} from "@ant-design/icons";
import catGif from '../../../../assets/images/sleepCat.gif'
import {VideoComment} from "./Comment";
import {CommentsSortedButton} from "./Sorted_Button";


interface VideoComments {
    currentVideoId: string
}

export const CommentsBlock: FC<VideoComments> = ({currentVideoId}) => {
    const dispatch = useDispatch()
    const {channelId} = useSelector(getCurrentVideoChannel)
    const {comments, nextPageCommentsToken, commentsStatus} = useSelector(CurrentVideoSelector.videoComments)
    const [currentSorting, setCurrentSorting] = useState('relevance' as 'relevance' | 'time')
    function moreComments() {
        dispatch(getVideoComments(currentVideoId, nextPageCommentsToken, currentSorting))
    }
    const Comments = useMemo(() => {
        return comments.map(comment => (
            <VideoComment comment={comment} channelId={channelId} key={comment.commentId}/>))
    }, [comments])
    const {commentCount} = useSelector(CurrentVideoSelector.videoStatistics)

    if (commentsStatus === 'commentsDisabled') return <CommentsDisabled/>
    if (commentCount === '0') return <div>Список комментариев пуст</div>
    return (
        <div className={m.comments_wrapper}>
            {commentCount} комментариев
            <CommentsSortedButton currentVideoId={currentVideoId} currentSorting={currentSorting}
                                  setCurrentSorting={setCurrentSorting}/>
            {Comments}
            {nextPageCommentsToken &&
            <div className={m.more_comments_button_container}>
                <Button onClick={moreComments} icon={<DownCircleOutlined/>} loading={commentsStatus === 'loading'}>
                    Больше комментариев
                </Button>
            </div>
            }
        </div>
    )
}

function CommentsDisabled(){
    return(
        <div>
            <img alt='' style={{width: '20%', transform: 'translate(192.5px,13px)', userSelect: 'none'}} src={catGif}/>
            <div>
                <span>Комментарии отключены. </span>
                <a rel='noreferrer' href='https://support.google.com/youtube/answer/9706180?hl=ru' target='_blank'>
                    Подробнее
                </a>
            </div>
        </div>
    )
}


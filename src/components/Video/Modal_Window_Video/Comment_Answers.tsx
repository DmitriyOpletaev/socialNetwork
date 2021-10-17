import React, {FC, useEffect, useMemo} from "react";
import m from "./Modal_Window_Styles.module.scss";
import {Avatar, Comment, Tooltip} from "antd";
import {DislikeOutlined, LikeOutlined} from "@ant-design/icons";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {getVideoCommentAnswers} from "../../redux/Selectors/Videos_Selector";
import {getCommentAnswers} from "../../redux/Reducers/Video_Page_Reducers/Current_Video_Reducer";

interface CommentAnswers {
    parentCommentId: string
    firstOpenAnswers: Array<string>
    setFirstOpenAnswers: (firstOpenAnswers: Array<string>) => void
    totalReplyCount: number
    channelId: string
    close:(parentCommentId:string)=>void
}

export const CommentsAnswers: FC<CommentAnswers> = (props) => {
    const {parentCommentId, firstOpenAnswers, setFirstOpenAnswers, totalReplyCount, channelId,close} = props
    const dispatch = useDispatch()

    useEffect(() => {
        if (!firstOpenAnswers.includes(parentCommentId)) {
            dispatch(getCommentAnswers(parentCommentId))
            setFirstOpenAnswers([...firstOpenAnswers, parentCommentId])
        }
    }, [])

    const {commentAnswers,loadingAnswers} = useSelector(getVideoCommentAnswers)
    const answers = commentAnswers.find(c => c.parentId === parentCommentId)

    const CommentAnswers = useMemo(() => {
        return (answers &&
            answers.answersArray.map(c => (
                <Comment className={m.comment_container} key={c.commentId} style={{marginLeft: '60px'}}
                         author={<a
                             className={`${m.name} ${channelId === c.authorChannelId && m.nameOwner}`}>{c.authorDisplayName}</a>}
                         avatar={
                             <Avatar size='large'
                                     src={c.authorProfileImageUrl}
                             />
                         }
                         content={
                             <>
                                 <p dangerouslySetInnerHTML={{__html: c.text}}/>
                                 <p>
                                     <span><LikeOutlined/></span>
                                     <span style={{marginLeft: '5px'}}>{c.likeCount}</span>
                                     <span style={{marginLeft: '8px'}}><DislikeOutlined/></span>
                                 </p>
                             </>


                         }
                         datetime={
                             <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                 <span>{moment().from(c.publishedAt)}</span>

                             </Tooltip>
                         }
                />
            ))
        )
    }, [answers, commentAnswers])

    function moreAnswers() {
        console.log(answers && answers.nextPageToken)
        if (answers) dispatch(getCommentAnswers(parentCommentId, answers.nextPageToken))
    }
    return (
        <>

            {CommentAnswers}

            <div className={m.more_close_answers_button_container}>

                {answers &&
                <span onClick={()=>close(parentCommentId)} className={m.open_close_answers_button}>Скрыть ответы</span>
                }

                {answers && answers.answersArray.length < totalReplyCount &&
                <span className={m.answers_button_more} onClick={moreAnswers}>Еще</span>
                }
            </div>


        </>
    )
}



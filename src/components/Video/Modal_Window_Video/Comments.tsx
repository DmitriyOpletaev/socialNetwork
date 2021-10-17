import React, {FC, useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentVideoChannel, getCurrentVideoStatistics,
    getVideoCommentAnswers,
    getVideoCommentsSelector
} from "../../redux/Selectors/Videos_Selector";
import { getVideoComments} from "../../redux/Reducers/Video_Page_Reducers/Current_Video_Reducer";
import {Avatar, Button, Comment, Dropdown, Menu, Tooltip} from "antd";
import m from "./Modal_Window_Styles.module.scss";
import {DislikeOutlined, LikeOutlined, LoadingOutlined,SortAscendingOutlined,DownCircleOutlined} from "@ant-design/icons";
import moment from "moment";
import {CommentsAnswers} from "./Comment_Answers";
import catGif from '../../../assets/images/sleepCat.gif'


interface VideoComments {
    currentVideoId: string

}

export const CommentsBlock:FC<VideoComments> = ({currentVideoId}) => {
    const dispatch = useDispatch()

    const [currentSorting, setCurrentSorting] = useState('relevance' as 'relevance' | 'time')
    function moreComments() {
        dispatch(getVideoComments(currentVideoId, nextPageCommentsToken,currentSorting))
    }

    const [opensAnswers, setOpensAnswers] = useState([] as Array<string>)
    const [firstOpenAnswers, setFirstOpenAnswers] = useState([] as Array<string>)
    function open(id: string) {
        setOpensAnswers([...opensAnswers, id])
    }
    function close(id: string) {
        let newOpenAnswers = opensAnswers.filter((i) => i !== id)
        setOpensAnswers(newOpenAnswers)
    }

    const {channelId} = useSelector(getCurrentVideoChannel)
    const {comments, nextPageCommentsToken,commentsStatus} = useSelector(getVideoCommentsSelector)
    const Comments = useMemo(() => {
        return comments.map(c => (
            <div>
                <Comment className={m.comment_container} key={c.commentId}
                         author={
                             <div className={`${m.name} ${channelId === c.authorChannelId && m.nameOwner}`}>
                                 <a>{c.authorDisplayName}</a>
                             </div>
                         }
                         avatar={
                             <Avatar size='large'
                                     src={c.authorProfileImageUrl}
                             />
                         }
                         content={
                             <>
                                 <p dangerouslySetInnerHTML={{__html:c.text}}/>
                                 <p>
                                     <span><LikeOutlined/></span>
                                     <span style={{margin: '5px'}}>{c.likeCount}</span>
                                     <span style={{margin: '8px'}}><DislikeOutlined/></span>

                                     {c.totalReplyCount > 0 &&
                                     <OpenCloseAnswers commentId={c.commentId} open={open} close={close}
                                                       opensAnswers={opensAnswers} totalReplyCount={c.totalReplyCount}
                                     />
                                     }
                                 </p>
                             </>
                         }
                         datetime={
                             <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                 <span>{moment().from(c.publishedAt)}</span>

                             </Tooltip>
                         }
                />
                {opensAnswers.includes(c.commentId) &&
                <>
                    <CommentsAnswers parentCommentId={c.commentId} firstOpenAnswers={firstOpenAnswers} totalReplyCount={c.totalReplyCount}
                                     setFirstOpenAnswers={setFirstOpenAnswers}  channelId={channelId} close={close}/>
                    </>

                }

            </div>
        ))

    }, [comments, opensAnswers])

    const {commentCount} = useSelector(getCurrentVideoStatistics)

    if(commentsStatus==='commentsDisabled')return(
        <div>
            <img style={{width:'20%',transform:'translate(192.5px,13px)',userSelect:'none'}} src={catGif}/>
            <div>
                <span>Комментарии отключены. </span>
                <a href='https://support.google.com/youtube/answer/9706180?hl=ru' target='_blank'>Подробнее</a>
            </div>

        </div>
    )
    if(commentCount==='0')return <div>Список комментариев пуст</div>
    return (
        <div className={m.comments_wrapper}>
            {commentCount} комментариев

            <CommentsSortedButton currentVideoId={currentVideoId} currentSorting={currentSorting}
                                  setCurrentSorting={setCurrentSorting}/>
            {Comments}
            {nextPageCommentsToken &&
                <div className={m.more_comments_button_container}>
                    <Button onClick={moreComments} icon={<DownCircleOutlined />} loading={commentsStatus==='loading'} >
                        Больше комментариев
                    </Button>
                </div>

            }

        </div>
    )
}


type OpenCloseAnswersProps = {
    commentId: string
    open: (commentId: string) => void
    close: (commentId: string) => void
    opensAnswers: Array<string>
    totalReplyCount: number
}


const OpenCloseAnswers = ({open, close, commentId, opensAnswers, totalReplyCount}: OpenCloseAnswersProps) => {
    const {loadingAnswers} = useSelector(getVideoCommentAnswers)
    if(loadingAnswers===commentId)return  <span style={{margin: '40px', color: 'blue'}}><LoadingOutlined/></span>
    return (
        <span className={m.open_close_answers_button}>
            {opensAnswers.includes(commentId) ?
                <span style={{margin: '15px', color: 'blue', cursor: 'pointer'}}
                      onClick={() => close(commentId)}>Скрыть ответы </span>
                :
                <span style={{ color: 'blue', cursor: 'pointer'}}
                      onClick={() => open(commentId)}>Показать {totalReplyCount} ответов</span>
            }

        </span>
    )
}


type CommentsSortedButtonProps={
    currentVideoId:string
    currentSorting:'relevance' | 'time'
    setCurrentSorting:( currentSorting:'relevance' | 'time')=>void
}
const CommentsSortedButton:FC<CommentsSortedButtonProps>=(props)=>{
    const {currentVideoId, currentSorting,  setCurrentSorting} = props
    const dispatch  = useDispatch()
    useEffect(()=>{
        dispatch(getVideoComments(currentVideoId,null,currentSorting))
    },[currentSorting])
    const style ={
        color: 'blue'
    }
    const menu = (
        <Menu>
            <Menu.Item onClick={()=>setCurrentSorting('time')}>
                <span style={currentSorting=== 'time' ? style : {}}>
                    По дате
                </span>
            </Menu.Item>
            <Menu.Item onClick={()=>setCurrentSorting('relevance')}>
                <span style={currentSorting=== 'relevance' ? style : {}}>
                    По релевантности
                </span>
            </Menu.Item>
        </Menu>
    )
    return(
        <Dropdown overlay={menu} placement="bottomCenter" >
            <Button type='link' className={m.comments_sorted_Button} icon={<SortAscendingOutlined/>}>
                Упорядочить
            </Button>
        </Dropdown>
    )
}

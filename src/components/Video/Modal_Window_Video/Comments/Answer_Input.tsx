import {Avatar, Button, Comment, Input} from "antd";
import m from "../Modal_Window_Styles.module.scss";
import React, {FC, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {CurrentVideoSelector, MainVideoSelector} from "../../../redux/Selectors/Videos_Selector";
import {actionsCurrentVideo, insertAnswer} from "../../../redux/Reducers/Video_Page_Reducers/Current_Video_Reducer";
import {useVideo} from "../../Video_Components/useVideo";
import {ArrowRightOutlined} from "@ant-design/icons";

type AnswerInputProps = {
    parentId: string
    setIsShowInput:(isShowInput:boolean)=>void
}

export const AnswerInput: FC<AnswerInputProps> = ({parentId,setIsShowInput}) => {
    const [term, setTerm] = useState('')
    const [answer, setAnswer] = useState(null as string | null)
    const userChannel = useSelector(MainVideoSelector.userChannel)
    const {commentsStatus} = useSelector(CurrentVideoSelector.videoComments)
    const loadingInsertAnswer = commentsStatus === 'loadingInsertAnswer'
    const {accessToken} = useVideo()
    const dispatch = useDispatch()
    useEffect(() => {
        if (answer && accessToken) {
            dispatch(insertAnswer(parentId, answer, accessToken))
        }
    }, [answer])
    useEffect(() => {
        if (commentsStatus === 'answerInsert') {
            setAnswer(null)
            setTerm('')
            setIsShowInput(false)
            dispatch(actionsCurrentVideo.setCommentsStatus(null))
        }
    }, [commentsStatus])
    function closeInput(){
        setIsShowInput(false)
    }
    if (!userChannel) {
        return <div>a</div>
    }
    return (
        <Comment className={m.comment_container}
                 avatar={<Avatar src={userChannel.channelLogo}/>}
                 content={
                     <div className={m.input_container}>
                         <Input.TextArea autoSize={{minRows: 1, maxRows: 6}} value={term}
                                         className={m.input_comment}
                                         placeholder='Написать комментарий'
                                         onChange={(e) => setTerm(e.currentTarget.value)}
                                         disabled={loadingInsertAnswer}
                         />
                         <div className={m.comment_input_buttons_container}>
                             <Button type='link' onClick={closeInput}>
                                 Отмена
                             </Button>
                             <Button type='link'
                                     disabled={term.length===0}
                                     onClick={()=>setAnswer(term)}
                                     loading={loadingInsertAnswer}
                                     icon={<ArrowRightOutlined />}>
                                 Отправить
                             </Button>
                         </div>
                     </div>
                 }
        />
    )
}
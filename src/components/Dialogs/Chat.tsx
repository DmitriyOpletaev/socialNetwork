import m from './Chat.module.css'
import {Avatar, Button, Comment, Input, Tooltip} from 'antd';
import React, {useEffect, useRef, useState,} from "react";
import {UserOutlined} from "@ant-design/icons";
import moment from "moment";
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {sendMessageChat, startMessagesListening, stopMessagesListening} from "../redux/Reducers/Chat_reducer";
import {getChat, getStatusChat} from "../redux/Selectors/Chat_Selector";

type Props = {}

export type ChatMessageAPIType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}


export const Chat: React.FC<Props> = () => {


    const dispatch = useDispatch()

    const status = useSelector(getStatusChat)

    useEffect(() => {
        dispatch(startMessagesListening())
        console.log(status)
        return () => {
            dispatch(stopMessagesListening())///startMessage...ILI  stopMess...
        }
    }, [dispatch])


    return (
        <div className={m.Chat_Wrapper}>
            {status === 'error' && <div style={{color:'red',fontSize:'3em'}}>ERROR ERROR ERROR !!!! REFRESH PAGE</div>}

                    <Messages/>
                    <AddMessageForm/>


        </div>
    )
}


const Messages = () => {
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const messages = useSelector(getChat)

    const [autoScroll, setAutoScroll] = useState(true)


    useEffect(()=>{
        if (autoScroll){
            messagesAnchorRef.current?.scrollIntoView({behavior:'smooth'})
        }

    },[messages,autoScroll])

    function scrollHandler(e:React.UIEvent<HTMLDivElement, UIEvent>){
        let element = e.currentTarget
        if(Math.abs(element.scrollHeight - element.scrollTop)- element.clientHeight<300){
           !autoScroll&& setAutoScroll(true)

        }else{
            autoScroll && setAutoScroll(false)
        }
    }


    return (
        <div className={m.Messages_Wrapper} onScroll={scrollHandler}>
            {messages.map((m) => <Message key={m.id} message={m}/>)}
            <div ref={messagesAnchorRef}>___</div>
        </div>
    )
}


const Message: React.FC<{ message: ChatMessageAPIType }> = React.memo(({message}) => {

    return (
        <Comment className={m.Comment_Container}
                 author={<NavLink to={'/profile/' + message.userId} className={m.author}>{message.userName}</NavLink>}
                 avatar={
                     message.photo ?
                         <Avatar size='large'
                                 src={message.photo}
                                 alt="author photo"
                         /> :
                         <Avatar icon={<UserOutlined/>}/>
                 }
                 content={
                     <p>
                         {message.message}
                     </p>
                 }
                 datetime={
                     <Tooltip className={m.datetime} title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                         <span>{moment().fromNow()}</span>
                     </Tooltip>
                 }
        />)

})


const AddMessageForm = () => {
    const {TextArea} = Input;
    const [message, setMessage] = useState('')
    const status = useSelector(getStatusChat)

    const dispatch = useDispatch()


    const sendMessage = () => {
        if (!message) return
        dispatch(sendMessageChat(message))
        setMessage('')

    }
    let smile = '\u{1F4A9}'
    return (
        <div className={m.AddMessageForm_Wrapper}>
            <TextArea onChange={(e) => setMessage(e.currentTarget.value)}
                      value={message} className={m.textarea} rows={6}/>
            <span onClick={() => setMessage(smile)}>{smile}</span>
            <Button onClick={sendMessage} disabled={status !== 'ready'}
                    className={m.button_send} type="primary" size={"large"}>
                Send
            </Button>
        </div>

    )
}
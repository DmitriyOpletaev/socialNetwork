import m from './Chat.module.css'
import {Avatar, Button, Comment, Input, Tooltip} from 'antd';
import React, {useEffect, useState} from "react";
import {UserOutlined} from "@ant-design/icons";
import moment from "moment";
import {NavLink} from 'react-router-dom';
import App from "../../App";
import ProfileContainer from "../Profile/Profile_container";
import {useDispatch, useSelector} from "react-redux";
import {sendMessageChat, startMessagesListening} from "../redux/Reducers/Chat_reducer";
import {getChat} from "../redux/Selectors/Chat_Selector";

type Props = {}

export type ChatMessage = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}


export const Chat: React.FC<Props> = () => {


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(startMessagesListening())
        }
    },[])


    return (
        <div className={m.Chat_Wrapper}>
            <Messages />
            <AddMessageForm />
        </div>
    )
}


const Messages: React.FC<{ }> = () => {

    const messages = useSelector(getChat)

    return (
        <div className={m.Messages_Wrapper}>
            {messages.map((m, index) => <Message key={index} message={m}/>)}
        </div>
    )
}


const Message: React.FC<{ message: ChatMessage }> = ({message}) => {


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

}


const AddMessageForm: React.FC<{ }> = () => {
    const {TextArea} = Input;
    const [message, setMessage] = useState('')
    const [isReadyWS, setReadyWS] = useState<'pending' | 'ready'>("pending")

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
            <Button onClick={sendMessage}
                    className={m.button_send} type="primary" size={"large"}>
                Send
            </Button>
        </div>

    )
}
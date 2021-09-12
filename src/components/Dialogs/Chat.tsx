import m from './Chat.module.css'
import {Avatar, Button, Comment, Input, Tooltip} from 'antd';
import React, {useEffect, useState} from "react";
import {UserOutlined} from "@ant-design/icons";
import moment from "moment";
import {NavLink} from 'react-router-dom';

type Props = {}

export type ChatMessage = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}


export const Chat: React.FC<Props> = () => {

    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)

    useEffect(() => {
        let ws: WebSocket
        const closeHandler = () => {
            setTimeout(createChannel, 2000)
            console.log('close')
        }

        function createChannel() {

            ws?.removeEventListener('close', closeHandler)
            ws?.close()
            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            ws.addEventListener('close', closeHandler)
            setWsChannel(ws)
            console.log('ready')
            console.log(ws)

        }

        createChannel()
        return () => {
            ws.removeEventListener('close', closeHandler)
            ws.close()
        }
    }, [])


    return (
        <div className={m.Chat_Wrapper}>
            <Messages wsChannel={wsChannel}/>
            <AddMessageForm wsChannel={wsChannel}/>
        </div>
    )
}


const Messages: React.FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {

    const [messages, setMessages] = useState<ChatMessage[]>([]);
    useEffect(() => {

        let messageHandler = (e: MessageEvent) => {

            let newMessages = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        };
        wsChannel?.addEventListener('message', messageHandler)
        return () => wsChannel?.removeEventListener('message', messageHandler)


    }, [wsChannel])


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


const AddMessageForm: React.FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {
    const {TextArea} = Input;
    const [message, setMessage] = useState('')
    const [isReadyWS, setReadyWS] = useState<'pending' | 'ready'>("pending")
    useEffect(() => {
        let openHandler = () => {
            setReadyWS('ready')
        };
        wsChannel?.addEventListener('open', openHandler)
        return () => {
            wsChannel?.removeEventListener('open', openHandler)
        }
    }, [wsChannel])
    const sendMessage = () => {
        if (!message) return
        wsChannel?.send(message)
        setMessage('')

    }
    let smile = '\u{1F4A9}'
    return (
        <div className={m.AddMessageForm_Wrapper}>
            <TextArea onChange={(e) => setMessage(e.currentTarget.value)}
                      value={message} className={m.textarea} rows={6}/>
            <span onClick={() => setMessage(smile)}>{smile}</span>
            <Button onClick={sendMessage} disabled={wsChannel == null || isReadyWS !== 'ready'}
                    className={m.button_send} type="primary" size={"large"}>
                Send
            </Button>
        </div>

    )
}
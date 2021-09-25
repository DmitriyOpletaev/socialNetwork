import m from './Chat.module.css'
import {Avatar, Button, Comment, Input, Tooltip} from 'antd';
import React, {useEffect, useRef, useState,} from "react";
import {UserOutlined} from "@ant-design/icons";
import moment from "moment";
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {sendMessageChat, startMessagesListening, stopMessagesListening} from "../redux/Reducers/Chat_reducer";
import {getChat, getStatusChat} from "../redux/Selectors/Chat_Selector";
import { SmileTwoTone } from '@ant-design/icons';
import Picker, {IEmojiData, SKIN_TONE_MEDIUM_DARK, SKIN_TONE_NEUTRAL} from "emoji-picker-react";

type Props = {}

export type ChatMessageAPIType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}


export const Chat: React.FC<Props> = () => {
    console.log('Pererisovka ----- Chat')

    const dispatch = useDispatch()

    const status = useSelector(getStatusChat)

    useEffect(() => {
        dispatch(startMessagesListening())
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
    console.log('Pererisovka ----- messageSSS')
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
    console.log('Pererisovka ----- message(1)')
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
                     <p style={{textAlign:'left'}}>
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
    const [isPickerOpen, setPickerOpen] = useState(false)
    const status = useSelector(getStatusChat)

    const dispatch = useDispatch()



    const emojiChoose = (e: React.MouseEvent, emojiObject:IEmojiData)=>{
        setMessage(valueInput=>valueInput+emojiObject.emoji)
    }

    const sendMessage = () => {
        if (!message) return
        dispatch(sendMessageChat(message))
        setMessage('')

    }

    return (
        <div className={m.AddMessageForm_Wrapper}>
            <TextArea onChange={(e) => setMessage(e.currentTarget.value)}
                      onPressEnter={sendMessage}
                      value={message} className={m.textarea} rows={6}/>
            <SmileTwoTone onClick={()=>setPickerOpen(!isPickerOpen)} className={m.Smile} />
            <div className={m.smile_picker} >
                {isPickerOpen && <Picker  disableSearchBar onEmojiClick={emojiChoose} skinTone={SKIN_TONE_NEUTRAL}/>}

            </div>
            <Button onClick={sendMessage} disabled={status !== 'ready'}
                    className={m.button_send} type="primary" size={"large"}>
                Send
            </Button>
        </div>

    )
}
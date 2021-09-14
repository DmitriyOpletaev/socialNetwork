
import {BaseThunkType, InferActionsTypes} from "../redux-store";
import {chatAPI, ChatMessage, Status} from "../../api/chat_API";
import {Dispatch} from "redux";
import {v1} from 'uuid'
import {ChatMessageAPIType} from "../../Dialogs/Chat";


type ChatMessageType = ChatMessageAPIType & {id:string}

let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as Status
}

const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {


    switch (action.type) {
        case 'SN/CHAT/SET_MESSAGE':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map(m=>({...m, id:v1() } )) ]
                    .filter((m, index, array)=>index>=array.length-100)
            }
            case 'SN/CHAT/STATUS_CHANGED':
            return {
                ...state,
               status: action.payload.status
            }
        default:
            return state
    }
}


const actions = {
    setMessages: (messages: ChatMessage[]) => ({
        type: "SN/CHAT/SET_MESSAGE", payload: {messages}
    } as const),
    setStatus: (status:Status) => ({
        type: "SN/CHAT/STATUS_CHANGED", payload: {status}
    } as const)
}

let _newMessageHandler: ((messages: ChatMessage[]) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.setMessages(messages))
        }
    }
    return _newMessageHandler
}

let _newStatusChangedHandler: ((status: Status) => void) | null = null

const newStatusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_newStatusChangedHandler === null) {
        _newStatusChangedHandler = (status) => {
            dispatch(actions.setStatus(status))
        }
    }
    return _newStatusChangedHandler
}


export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.startChannel()
    chatAPI.subscribe('messages-received',newMessageHandlerCreator(dispatch))
    chatAPI.subscribe('status-changed',newStatusChangedHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe('status-changed', newStatusChangedHandlerCreator(dispatch))
    chatAPI.stopChannel()
}

export const sendMessageChat= (message:string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}

export default chatReducer;




//Types

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

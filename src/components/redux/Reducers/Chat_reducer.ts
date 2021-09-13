import {ResultCodeEnum, ResultCodeForCaptchaEnum} from "../../api/API";
import {BaseThunkType, InferActionsTypes} from "../redux-store";
import {authAPI, securityAPI} from "../../api/Auth&Security_API";
import {FormikValues} from "formik";
import {chatAPI, ChatMessage} from "../../api/chat_API";
import {message} from "antd";
import {Dispatch} from "redux";


const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {


    switch (action.type) {
        case 'SN/CHAT/SET_MESSAGE':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            }
        default:
            return state
    }
}


const actions = {
    setMessages: (messages: ChatMessage[]) => ({
        type: "SN/CHAT/SET_MESSAGE", payload: {messages}
    } as const)
}
let _newMessageHandler: ((messages: ChatMessage[]) => void) | null = null

const newMessageHandler = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.setMessages(messages))
        }
    }
    return _newMessageHandler
}


export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.startChannel()
    chatAPI.subscribe(newMessageHandler(dispatch))
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe(newMessageHandler(dispatch))
    chatAPI.startChannel()
}

export const sendMessageChat= (message:string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}

export default chatReducer;


//Types
let initialState = {
    messages: [] as ChatMessage[]
}
export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>
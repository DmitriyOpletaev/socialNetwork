import {DialogsData} from "../../../types/types";
import {InferActionsTypes} from "../redux-store";




let initialState = {
    dialogsData: [

        {
            id: 'Dima',
            name: 'Dima Opl',
            dateOnline: 'вчера 22:30',
            message: '1',
        },
        {
            id: 'Kolya',
            name: 'Kolya Zinchuk',
            dateOnline: 'Онлайн',
            message: '2',
        },
        {
            id: 'Zelda',
            name: 'Zelda',
            dateOnline: '2 часа назад',
            message: 'e',
        },
        {
            id: 'Sveta',
            name: 'Sveta Nagibator',
            dateOnline: '5 лет назад',
            message: '4',
        },
        {
            id: 'Anna',
            name: 'Anna',
            dateOnline: 'позавчера в 15:09',
            message: 'j',
        },
        {
            id: 'Vasiliy',
            name: 'Vasiliy',
            dateOnline: 'час назад',
            message: 'k',
        },
        {
            id: 'Georgiy',
            name: 'Georgiy',
            dateOnline: 'вчера 22:30',
            message: 'l',
        },
        {
            id: 'Janna',
            name: 'Janna',
            dateOnline: '12:45',
            message: ';kjlhk',
        },
        {
            id: 'Konstantin',
            name: 'Konstantin',
            dateOnline: 'Онлайн',
            message: 'gfh',
        },
        {
            id: 'Valeriy',
            name: 'Valeriy',
            dateOnline: 'умер... ',
            message: 'fgdg',
        },
        {
            id: 'Lera',
            name: 'Lera',
            dateOnline: 'вчера 22:30 ',
            message: 'fdg',
        },
        {
            id: 'Oleg',
            name: 'Oleg',
            dateOnline: 'год назад ',
            message: 'jkjk',
        },
        {
            id: 'Zahar',
            name: 'Zahar',
            dateOnline: '10 лет назад',
            message: '0000000000000',
        },
    ] as Array<DialogsData>,
    newMessageBody: '',
}
export type InitialStateType = typeof initialState

const messagesReducer = (state = initialState, action:Actions):InitialStateType => {



    switch (action.type) {
        case 'UPDATE_NEW_MESSAGE_BODY':
            return{
                ...state,
                newMessageBody: action.newText
            }
        case 'SEND_MESSAGE':
            return{
                ...state,
                newMessageBody: '',
                dialogsData: [...state.dialogsData, { id: 'Dima', message: state.newMessageBody,} ]
            }


        default:
            return state
    }
}


export const actions={
     sendMessageCreator : () => ({type: 'SEND_MESSAGE'} as const),
     updateNewMessageBodyCreator : (body:string) => ({type: 'UPDATE_NEW_MESSAGE_BODY', newText: body} as const)
}


export default messagesReducer


type Actions = InferActionsTypes<typeof actions>
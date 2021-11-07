

const subscribes = {
    'messages-received': [] as MessagesReceivedSubscriberType[],
    'status-changed': [] as  StatusChangedSubscriberType[]
}

let ws: WebSocket|null = null


function cleanUp(){
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)

}

function createChannel() {
    cleanUp()
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    subscribes['status-changed'].forEach(s=>s('pending'))
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('open', openHandler)
    ws.addEventListener('error', errorHandler)
    console.log('ready')
}

//---------------------------------------------------------------------//

//---------------------------------------------------------------------//

const notifySubscribesAboutStatus = (status:Status)=>{
    subscribes['status-changed'].forEach(s=>s(status))
}

const closeHandler = () => {
    notifySubscribesAboutStatus('pending')
    console.log('close')
    setTimeout(createChannel, 2000)
}
const messageHandler = (e: MessageEvent) => {
    let newMessages = JSON.parse(e.data);
    subscribes['messages-received'].forEach(s => s(newMessages))
}
const openHandler = () => {
    console.log('ready')
    notifySubscribesAboutStatus('ready')
}
const errorHandler = () => {
    console.log('error')
    console.error("RESTART PAGE MOTHERFUCKER")
    notifySubscribesAboutStatus('error')
}

//---------------------------------------------------------------------//


//---------------------------------------------------------------------//
export const chatAPI = {
    startChannel(){
        createChannel()
    },
    subscribe(eventName:EventsNames,callback: MessagesReceivedSubscriberType|StatusChangedSubscriberType) {
        // @ts-ignore
        subscribes[eventName].push(callback)
        return (() => {
            // @ts-ignore
            subscribes[eventName] = subscribes[eventName].filter(s => s !== callback)
        })
    },
    unsubscribe(eventName:EventsNames,callback: MessagesReceivedSubscriberType|StatusChangedSubscriberType) {
        // @ts-ignore
        subscribes[eventName] = subscribes[eventName].filter(s => s !== callback)  //
    },
    sendMessage(message:string){
        ws?.send(message)
    },
    stopChannel(){
        cleanUp()
        ws?.close()
        subscribes['messages-received']=[]
        subscribes['status-changed']=[]


    }

}

//---------------------------------------------------------------------//





type MessagesReceivedSubscriberType = (messages: ChatMessage[]) => void
type StatusChangedSubscriberType = (status: Status) => void
export type ChatMessage = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}
export type Status = 'pending' | 'ready'| 'error';
type EventsNames='messages-received'|'status-changed'
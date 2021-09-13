let subscribes = [] as Subscriber[]

let ws: WebSocket|null = null

function createChannel() {

    ws?.removeEventListener('close', closeHandler)
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
}

const closeHandler = () => {
    setTimeout(createChannel, 2000)
}
const messageHandler = (e: MessageEvent) => {
    let newMessages = JSON.parse(e.data);
    subscribes.forEach(s => s(newMessages))
}

export const chatAPI = {
    startChannel(){
        createChannel()
    },
    subscribe(callback: Subscriber) {
        subscribes.push(callback)
        return (() => {
            subscribes = subscribes.filter(s => s !== callback)
        })
    },
    unsubscribe(callback: Subscriber) {                     ///просто еще один вариант
        subscribes = subscribes.filter(s => s !== callback)  //
    },
    sendMessage(message:string){
        ws?.send(message)
    },
    stopChannel(){
        subscribes=[]
        ws?.removeEventListener('close', closeHandler)
        ws?.removeEventListener('message', messageHandler)
        ws?.close()
    }

}


type Subscriber = (messages: ChatMessage[]) => void
export type ChatMessage = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}
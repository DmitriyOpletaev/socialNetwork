import {FC} from "react";
import {Button, Popconfirm} from "antd";
import {QuestionCircleTwoTone, YoutubeOutlined} from "@ant-design/icons";
import m from './Youtube_Subscribe_Button.module.scss'
import {useVideo} from "../useVideo";
import {useDispatch, useSelector} from "react-redux";
import {
    unSubscribeChannel, getIsLoadingSubscribe,
    getSubscriptionsChannels,
    subscribeChannel, SubscriptionChannel
} from "../../../redux/Reducers/Video_Page_Reducers/videoMainReducer";
import {useGoogleUnauthorizedPopover} from "../../../common/Google_Login/useUnauthorizedGooglePopover";


export const SubscribeChannelButton: FC<YouTubeSubscribeButton> = ({channelId, channelTitle}) => {
    const {accessToken} = useVideo()
    const subscriptionsChannels = useSelector(getSubscriptionsChannels)
    const loadingId = useSelector(getIsLoadingSubscribe)
    const subscriptionChannel = subscriptionsChannels.find(c => c.channelId === channelId)

    return (subscriptionChannel ?
            <UnsubscribeButton accessToken={accessToken} channelId={channelId} loadingId={loadingId}
                               subscriptionChannel={subscriptionChannel} channelTitle={channelTitle}
            />
            :
            <SubscribeButton accessToken={accessToken} channelId={channelId} loadingId={loadingId}/>
    )
}


const SubscribeButton: FC<SubscribeButtonProps> = ({accessToken, channelId, loadingId}) => {
    const dispatch = useDispatch()


    function subscribe() {
        if (accessToken) dispatch(subscribeChannel(channelId, accessToken))
    }

    const buttonYoutube =(
        <Button className={m.subscribe_button} type='primary' icon={<YoutubeOutlined/>}
                 loading={channelId === loadingId}
        >
            <span className={m.title}>Подписаться</span>
        </Button>
    )
    const subscribeButton =useGoogleUnauthorizedPopover(buttonYoutube,subscribe)
    return (
        <>
            {subscribeButton}
        </>
    )
}


const UnsubscribeButton: FC<UnSubscribeButtonProps> = (props) => {
    const {accessToken, channelId, loadingId, channelTitle, subscriptionChannel} = props
    const dispatch = useDispatch()

    function unsubscribe() {
        if (subscriptionChannel && accessToken) {
            dispatch(unSubscribeChannel(subscriptionChannel, accessToken))
        }
    }

    const title = <span>Отписаться от канала<span className={m.channelTitle}> {channelTitle}</span></span>
    const icon = <QuestionCircleTwoTone twoToneColor={'#3d7acb'} style={{fontSize: '21px'}}
                                        className={m.iconQuestion}/>
    const okButtonProps = {
        loading: loadingId === channelId,
        onClick: unsubscribe
    }
    return (
        <Popconfirm title={title} okText='Отписаться' cancelText='Отменить' icon={icon}
                    okButtonProps={okButtonProps}
        >
            <Button className={m.unsubscribe_button + ' ' + m.subscribe_button} type='primary'
                    icon={<YoutubeOutlined/>}>
                <span className={m.title}>Вы подписаны</span>
            </Button>
        </Popconfirm>
    )
}


interface YouTubeSubscribeButton {
    channelId: string,
    channelTitle: string
}

type SubscribeButtonProps = {
    accessToken: string | null
    channelId: string
    loadingId: string | null
}
type UnSubscribeButtonProps = {
    accessToken: string | null
    channelId: string
    loadingId: string | null
    channelTitle: string
    subscriptionChannel: SubscriptionChannel
}
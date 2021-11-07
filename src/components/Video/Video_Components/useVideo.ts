import {useDispatch, useSelector} from "react-redux";
import {
    actionsMainVideoReducer,
    getOpenedModalWindowSelector
} from "../../redux/Reducers/Video_Page_Reducers/videoMainReducer";
import {
    setCurrentVideo
} from "../../redux/Reducers/Video_Page_Reducers/Current_Video_Reducer";
import {getCurrentChannelInfo} from "../../redux/Reducers/Video_Page_Reducers/Current_Channel_Reducer";
import {getAccessToken} from "../../redux/Reducers/Auth-Reducer";
import {useCallback} from "react";



export function useVideo() {
    const dispatch = useDispatch()
    const accessToken = useSelector(getAccessToken)
    const openedModalWindow = useSelector(getOpenedModalWindowSelector)
    const openVideo=useCallback((videoId:string)=> {
        dispatch(actionsMainVideoReducer.setOpenedModalWindow('video'))
        dispatch(setCurrentVideo(videoId,accessToken))
    },[dispatch])
    const openChannel=useCallback((channelId: string)=> {
        dispatch(actionsMainVideoReducer.setOpenedModalWindow('channel'))
        dispatch(getCurrentChannelInfo(channelId))
    },[dispatch])
    const closeWindow=useCallback(()=> {
        dispatch(actionsMainVideoReducer.setOpenedModalWindow(null))
    },[dispatch])


    return {openedModalWindow,openVideo,openChannel,closeWindow,accessToken}
}
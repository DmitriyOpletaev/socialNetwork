import {useDispatch, useSelector} from "react-redux";
import {useEffect, useMemo} from "react";
import {
    getAllChannelPlaylists,
} from "../../../redux/Reducers/Video_Page_Reducers/Current_Channel_Reducer";
import {
    getCurrentChannelInfoSelector,
    getAllChannelPlaylistsSelector
} from "../../../redux/Selectors/Videos_Selector";
import m from './Channel_Tabs.module.scss'
import {Button, Tooltip} from "antd";
import {truncateString} from "../../../utils/validators/string_formatting";
import {MenuUnfoldOutlined, CaretRightOutlined} from "@ant-design/icons";


export const PlaylistsPage = () => {
    const dispatch = useDispatch()
    const {id} = useSelector(getCurrentChannelInfoSelector)
    const {playlists,nextPageToken} = useSelector(getAllChannelPlaylistsSelector)

    function getVideos(){
        dispatch(getAllChannelPlaylists(id,nextPageToken))
    }

     useEffect(()=>{
         getVideos()
     },[id,dispatch])


    const PlaylistsBlocks = useMemo(() => {
        return playlists.map(p => (
            <div key={p.playlistId} className={m.playlist_container}>
                <div className={m.playlist_preview_container}>
                    <img src={p.playlistPreview} alt='playlist preview'/>
                    <div className={m.playlist_info_container}>
                        <div className={m.playlist_info}>
                            <div>
                                {p.totalVideoCount}
                            </div>
                            <div>
                                <MenuUnfoldOutlined/>
                            </div>
                        </div>
                    </div>
                    <div className={m.play_button}>
                        <span>
                           <CaretRightOutlined/>
                        </span>
                        <span>
                            Воспроизвести все
                        </span>
                    </div>
                </div>
                <Tooltip title={p.playlistTitle} placement='bottom'>
                    <div className={m.title}
                         dangerouslySetInnerHTML={{__html: truncateString(p.playlistTitle, 65, true)}}/>
                </Tooltip>
            </div>
        ))
    }, [playlists])
    return (
        <div className={m.playlists_wrapper}>
            {PlaylistsBlocks}
            {nextPageToken &&
            <div className={m.playlist_container}>
                <Button className={m.button_more} block onClick={getVideos}>
                    Ещё
                </Button>
            </div>
            }

        </div>
    )
}
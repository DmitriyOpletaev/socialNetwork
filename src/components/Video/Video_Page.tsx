import {BackTop, Modal} from "antd";
import m from './Video.module.scss'
import {VideosContent} from "./Content";
import {VideoPopup} from "./Modal_Window_Video/Video_Modal_Window";
import {ChannelPopup} from "./Modal_Window_Channel/Modal_Window_Channel";
import {useVideo} from "./Video_Components/useVideo";
import {VideoSearchBar} from "./Search_Bar/Search_Bar";
import {VideosPageMenu} from "./Menu/Menu";

export const VideoPage = () => {
    const {openedModalWindow, closeWindow} = useVideo()
    return (
        <div className={m.body_videos_page}>
            <div className={m.searchBar_and_content_wrapper}>
                    <VideoSearchBar/>
                <div className={m.content_wrapper}>
                    <VideosContent/>
                    <BackTop className={m.button_up_container}>
                        <div className={m.Up_Button}>UP</div>
                    </BackTop>
                </div>

            </div>
            <VideosPageMenu/>
            {openedModalWindow &&
            <Modal className={m.modal_window}
                   width={1100} centered
                   footer={false} visible
                   onCancel={closeWindow}
            >
                <div className={m.modal_content_wrapper}>
                    {openedModalWindow === 'video' && <VideoPopup/>}
                    {openedModalWindow === 'channel' && <ChannelPopup/>}
                </div>
            </Modal>
            }
        </div>
    )
}







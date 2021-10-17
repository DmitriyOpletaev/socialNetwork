import {useSelector} from "react-redux";
import {getCurrentVideo, getIsLoadingCurrentVideoDetails} from "../../redux/Selectors/Videos_Selector";
import { Modal, Spin} from "antd";
import m from "./Modal_Window_Styles.module.scss";
import ReactPlayer from "react-player";
import {CommentsBlock} from "./Comments";
import {RelatedVideos} from "./Related_Videos";
import {VideoDetailsBlock} from "./Video_Details_Block/Video_Details";
import {FC} from "react";


type VideoPopupProps = {
    visiblePopup: 'video'|'channel'|null
    setVisiblePopup: (visiblePopup: 'video'|'channel'|null) => void
}

export const VideoPopup: FC<VideoPopupProps> = (props) => {

    const {setVisiblePopup, visiblePopup} = props
    const currentVideo = useSelector(getCurrentVideo)
    const isLoading = useSelector(getIsLoadingCurrentVideoDetails)

    return (
        <>{currentVideo &&
        <Modal
            title={currentVideo.title} centered style={{marginTop: '20px'}} visible={visiblePopup==='video'} width={1100}
            footer={false}
            onCancel={() => {
                setVisiblePopup(null)
            }
            }
        >

            <div className={m.current_video_container}>
                {isLoading ?
                    <div className={m.loading}>
                        <Spin size="large" tip='Загрузка' />
                    </div>
                    :
                    <>
                        <div className={m.player_container}>
                            <ReactPlayer className={m.videosElement} width='100%' height='100%' controls autoplay={true}
                                         url={`https://www.youtube.com/watch?v=${currentVideo.id}`}/>
                        </div>

                        <div className={m.other_information_wrapper}>
                            <div className={m.details_and_comments_wrapper}>
                                <VideoDetailsBlock setVisiblePopup={setVisiblePopup}/>
                                <CommentsBlock currentVideoId={currentVideo.id}/>
                            </div>
                            <RelatedVideos/>
                        </div>
                    </>}
            </div>
        </Modal>
        }

        </>
    );
}



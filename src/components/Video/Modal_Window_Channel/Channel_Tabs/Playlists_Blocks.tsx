import {PlaylistDetails} from "../../../../types/Videos_Types";
import {FC, useState} from "react";
import m from "./Channel_Tabs.module.scss";
import Slider from "react-slick";
import {stringReformat, truncateString} from "../../../utils/validators/string_formatting";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {VideoPreview} from "../../Video_Components/Video_Preview";

interface PlaylistsBlockProps {
    playlists: Array<PlaylistDetails>
}

export const PlaylistsBlock: FC<PlaylistsBlockProps> = ({playlists}) => {
    const settings = {
        infinite: false,
        speed: 700,
        slidesToShow: 4,
        slidesToScroll: 2,
        nextArrow: <SampleNextArrow/>,
        prevArrow: <SamplePrevArrow/>
    };



    const singlePlaylists = playlists.map(p => (
        <div className={m.section_container}>
            <h2 className={m.section_title}>
                {p.playlistTitle}
            </h2>
            <div className={m.section_description}>
                <PlaylistDescription playlistId={p.playlistId} description={p.description}/>
            </div>
            {p.totalVideoCount > settings.slidesToShow &&
            <div className={m.playlist_video_Count}>
                {p.totalVideoCount} видео
            </div>
            }
            {p.videos &&
            <div className={m.slider_container}>
                <Slider {...settings}>
                    {p.videos.map(v => (
                        <div className={m.video_container}>
                            <VideoPreview video={v}/>
                        </div>
                    ))}
                </Slider>
            </div>
            }
        </div>
    ))
    return (
        <>
            {singlePlaylists}
        </>
    )
}

interface PlaylistDescriptionProps{
    playlistId:string
    description:string
}
const PlaylistDescription:FC<PlaylistDescriptionProps>=({playlistId,description})=>{
    const [isOpenDescription, setIsOpenDescription] = useState(false)
    function openCloseDescription() {
        setIsOpenDescription(!isOpenDescription)
    }
    const htmlReformatDescription = stringReformat(description)
    const truncateCount = 150
    const truncatesDescription = truncateString(htmlReformatDescription, truncateCount, true)

    if(isOpenDescription){
        return (
            <div>
                <span dangerouslySetInnerHTML={{__html:htmlReformatDescription}}/>
                <span onClick={openCloseDescription}  className={m.open_button}>Свернуть</span>
            </div>
        )
    }else{
        return (
            <div>
                <span dangerouslySetInnerHTML={{__html: truncatesDescription}}/>
                {htmlReformatDescription.length>truncateCount &&
                <span onClick={openCloseDescription} className={m.open_button}>Ещё</span>
                }
            </div>
        )
    }
}

function SampleNextArrow(props: any) {
    const {className, onClick} = props;
    return (
        <div
            className={`${className} ${m.button_next_prev}`}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props: any) {
    const {className, onClick} = props;
    return (
        <div
            className={`${className} ${m.button_next_prev}`}
            onClick={onClick}
        />
    );
}
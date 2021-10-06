import {useAudio} from "../Video/Audio_Player/useAudio";
import {Button, Slider} from "antd";
import m from "./Header_Player.module.scss";
import React, {MutableRefObject, useEffect, useRef, useState} from "react";
import {
    BorderOutlined, DownCircleOutlined, FilterOutlined, LeftCircleOutlined, PauseCircleOutlined, PlayCircleOutlined,
    RightCircleOutlined, SoundOutlined, UpCircleOutlined, CustomerServiceOutlined, SearchOutlined,
} from "@ant-design/icons";
import {useSelector} from "react-redux";
import {getThemeMode} from "../redux/Reducers/theme-reducer";
import {Tabs} from 'antd';


export const HeaderPlayer = () => {
    const {
        playAudio,
        stop,
        pauseAudio,
        isPlaying,
        prev,
        next,
        mute,
        isAudioMute,
        audioVolume,
        setAudioVolume, currentSongDetails
    } = useAudio()

    function volumeSlider(value = audioVolume) {

        setAudioVolume(value / 100)
        return `${value}%`;
    }

    const [isShowPlaylist, setIsShowPlaylist] = useState(false)

    const theme = useSelector(getThemeMode)
    const buttonType = theme === 'dark' ? 'default' : 'text'


    const playlistRef = useRef() as MutableRefObject<HTMLDivElement>;
    useEffect(() => {
        const onClick = (e: any) => {
            if (playlistRef.current) {
               // playlistRef.current.contains(e.target) || ()=>{};
            }
        }
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);


    }, []);

    return (
        <div ref={playlistRef}>
            <div className={m.player_wrapper}>
                <div className={m.controls_button_container}>
                    <Button type={buttonType} size='large' icon={<LeftCircleOutlined/>} onClick={prev}/>
                    {isPlaying ?
                        <Button type={buttonType} size='large' className={m.play_pause_button}
                                icon={<PauseCircleOutlined/>}
                                onClick={pauseAudio}/>
                        :
                        <Button type={buttonType} size='large' className={m.play_pause_button}
                                icon={<PlayCircleOutlined/>}
                                onClick={playAudio}/>


                    }
                    <Button type={buttonType} size='large' icon={<RightCircleOutlined/>} onClick={next}/>
                    <Button type={buttonType} size='large' icon={<BorderOutlined/>} onClick={stop}/>
                    <Slider className={`${m.volume_slider} ${isAudioMute && m.muted}`} tipFormatter={volumeSlider}
                            defaultValue={75}/>

                    <Button type={buttonType} shape='circle'
                            icon={isAudioMute ? <FilterOutlined rotate={90}/> : <SoundOutlined/>}
                            onClick={mute}/>

                </div>
                <div className={m.songNameContainer}>
                    <span>{currentSongDetails.artist} - {currentSongDetails.title_short}</span>

                    {/*----------поменять на button------------*/}
                    <Button type={buttonType}  onClick={() => setIsShowPlaylist(!isShowPlaylist)} size='middle'
                            shape='circle' icon={isShowPlaylist ? <UpCircleOutlined/> : <DownCircleOutlined/>}/>
                </div>
            </div>
            {isShowPlaylist &&
            <div className={m.songsList_buttons_wrapper} >
                <Playlist/>
            </div>
            }

        </div>
    )
}

function Playlist() {
    const {TabPane} = Tabs;

    return (
        <div className={m.songsList_container}>
            <Tabs defaultActiveKey="1">
                <TabPane className={m.tab_content_wrapper}
                         tab={<span><CustomerServiceOutlined/>Мой плейлист</span>} key="1">

                    <MySongs/>

                </TabPane>
                <TabPane className={m.tab_content_wrapper} tab={<span><SearchOutlined/>Поиск</span>} key="2">

                    <SearchSongs/>

                </TabPane>
            </Tabs>


        </div>
    )
}

function MySongs() {
    const {mySongsPlaylist} = useAudio()
    const mySongs = mySongsPlaylist.map(a => (
        <div key={a.id} className={m.song}>
            {a.artist} - {a.title_short}
        </div>
    ))

    return (
        <div>
            {mySongs}
        </div>
    )
}

function SearchSongs() {
    const {searchPlaylist} = useAudio()
    const searchSongs = searchPlaylist.map(a => (
        <div key={a.id} className={m.song}>
            {a.artist.name} - {a.title_short}
        </div>
    ))
    return (
        <div>
            {searchSongs}
        </div>
    )
}
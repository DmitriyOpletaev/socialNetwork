import {Button, Input, Slider, Tooltip} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getNextOrPrevPage, getSongsBySearch} from "../redux/Reducers/Music_Reducer";
import {
    getErrorMusic,
    getIsLoading,
    getNextPageToken,
    getPlaylist,
    getPrevPageToken
} from "../redux/Selectors/Music_Selector";
import m from './Music.module.scss'
import {
    FilterOutlined, BorderOutlined, SoundOutlined, RightCircleOutlined, PauseCircleOutlined, LeftCircleOutlined,
    PlayCircleOutlined,
} from '@ant-design/icons';
import {log} from "util";


export const MusicPage = () => {
    const playlist = useSelector(getPlaylist)
    const error = useSelector(getErrorMusic)

    const isLoading = useSelector(getIsLoading)
    const nextPageToken = useSelector(getNextPageToken)
    const prevPageToken = useSelector(getPrevPageToken)
    const dispatch = useDispatch()


    //---Search Songs
    const [searchTerm, setSearchTerm] = useState('Eminem')
    const [term, setTerm] = useState(null as string | null)
    useEffect(() => {
        if (term) dispatch(getSongsBySearch(term))

    }, [term])


    //-----Current Songs
    const [autoPlay, setAutoPlay] = useState(false)
    const [index, setIndex] = useState(0)
    const [currentSong, setCurrentSong] = useState(playlist[index])
    const [status, setStatus] = useState('pause')
    const [audio, setAudio] = useState(new Audio('#'))
    const [isMuted, setIsMuted] = useState(false)
    const [volumeAudio, setVolumeAudio] = useState(0.5)
    const [time, setTime] = useState(0)
    let slider = useRef()


    useEffect(() => {
        if (status === 'pause') audio.pause()
        if (status === 'play') audio.play()
    }, [status])

    useEffect(() => {
        setStatus('pause')
        setCurrentSong(playlist[index])
    }, [index, playlist.length])

    useEffect(() => {
        if (currentSong) setAudio(new Audio(currentSong.preview))
        if (autoPlay) setStatus('play')


    }, [currentSong])

    useEffect(() => {
        if (isMuted) audio.muted = true
        if (!isMuted) audio.muted = false
    }, [isMuted, audio])

    useEffect(() => {
        audio.volume = volumeAudio
    }, [volumeAudio, audio])


    useEffect(() => {
        audio.addEventListener('ended', () => {
            next()
        })
        audio.addEventListener('timeupdate', () => {
            setTime(audio.currentTime)
        })
    }, [audio])


    let nextPageSearch = nextPageToken?.substring(nextPageToken?.indexOf('s', 11))
    let prevPageSearch = prevPageToken?.substring(prevPageToken?.indexOf('s', 11))

    function searchMore() {
        if (nextPageSearch) dispatch(getNextOrPrevPage(nextPageSearch))
    }

    function play() {
        setStatus('play')
        setAutoPlay(true)
    }

    function pause() {
        setStatus('pause')
        setAutoPlay(false)
    }

    function stop() {
        setStatus('pause')
        setAutoPlay(false)
        audio.currentTime = 0.0
    }

    function next() {
        if (status === 'play') setAutoPlay(true)
        if (index === playlist.length - 1) {
            setIndex(() => (0))
        } else {
            setIndex((prev) => (prev + 1))
        }
        setTime(0)

    }

    function prev() {
        if (status === 'play') setAutoPlay(true)
        if (index !== 0) {
            setIndex((prev) => (prev - 1))
        }
        setTime(0)
    }

    function mute() {
        setIsMuted(!isMuted)
    }

    function volumeSlider(value = volumeAudio) {
        setVolumeAudio(value / 100)
        return `${value}%`;
    }

    function timeSlider(value = time) {
        let progress = Math.floor(audio.currentTime)
        return `${progress} sec`;
    }


    const Playlist = playlist.length > 0 && playlist.map(a => (
        <div key={a.id} onClick={() => {
            if (status === 'play') setAutoPlay(true)
            setIndex(playlist.indexOf(a))
        }}
             className={index === playlist.indexOf(a) ? m.songs_list_active : m.songs_list}
        >

            <span className={m.song_list_name}>
                {a.artist.name} - {a.title_short}
            </span>
        </div>)
    )
    let MySongs = playlist.length > 0 && playlist.map(a=>(
        <div className={m.mySongs_list}>
            {a.artist.name} - {a.title_short}
        </div>
    ))


    return (


        <div className={m.resultSearch_wrapper}>

            <div>

                <div className={m.audios_container}>
                    <div className={m.search_container}>

                        <Input style={{width: '500px'}} value={searchTerm}
                               onChange={e => setSearchTerm(e.currentTarget.value)}/>
                        <Tooltip title='search'>
                            <Button type='primary' icon={<SearchOutlined/>} loading={isLoading}
                                    onClick={() => setTerm(searchTerm)}>
                                Search
                            </Button>
                        </Tooltip>
                    </div>
                    {Playlist}
                    {playlist.length > 0 &&
                    <div>
                        <Button className={m.button_more} type='primary' block onClick={searchMore}>
                            Ещё
                        </Button>
                    </div>}
                </div>

                <div>{error}</div>
            </div>
            <div className={m.mySongs_CurrentSong_Container}>
                {currentSong &&
                <div className={m.selectedAudioDetails_container}>

                    <div className={m.photoAlbumContainer}>

                        <div>
                            <img src={currentSong.album.cover_big}/>
                        </div>


                    </div>
                    <div className={m.buttons_name_time_container}>
                        <div className={m.title}>
                            {currentSong.artist.name} - {currentSong.title_short}
                        </div>
                        <div className={m.song_details}>
                            <div>Альбом: <a href={currentSong.album.tracklist}>{currentSong.album.title}</a></div>
                            <div>Полная версия трека доступна пo <a href={currentSong.link}>ссылке</a></div>
                            autoplay:{autoPlay ? 'true' : 'false'}
                        </div>
                        <div className={m.buttons_container}>

                            <Button className={m.button} onClick={prev} disabled={index === 0}>
                                <LeftCircleOutlined/>
                            </Button>
                            {status === 'pause' ?
                                <Button className={m.button} onClick={play}>
                                    <PlayCircleOutlined/> Play
                                </Button>
                                :
                                <Button className={m.button} onClick={pause}>
                                    <PauseCircleOutlined/> pause
                                </Button>
                            }

                            <Button className={m.button}
                                    onClick={next}>
                                <RightCircleOutlined/>
                            </Button>
                            <Button className={m.button} onClick={stop}>
                                <BorderOutlined/>
                            </Button>


                        </div>
                        <div className={m.time_container}>
                            <Slider ref={slider} tipFormatter={timeSlider} value={time} className={m.slider_time}
                                    trackStyle={{color: 'red',}} handleStyle={{background: 'greenyellow'}}
                                    max={audio.duration} defaultValue={0} tooltipVisible={time !== 0}/>
                        </div>
                    </div>

                    <div className={m.volume_container}>
                        <Slider className={m.volume_slider} vertical tipFormatter={volumeSlider}
                                defaultValue={volumeAudio * 100}/>
                        {!isMuted ?
                            <Button className={m.muted_button} onClick={mute} icon={<SoundOutlined/>}/>
                            :
                            <Button className={m.muted_button} onClick={mute} icon={<FilterOutlined rotate={90}/>}/>

                        }
                    </div>


                </div>
                }
                <div className={m.mySongsContainer}>
                    <h2 className={m.mySongs_title}>
                        Мои песни
                    </h2>
                    <div className={m.mySongs_list_wrapper}>
                        {MySongs}
                    </div>
                </div>
            </div>

        </div>


    )
}

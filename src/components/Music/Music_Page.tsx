import {Button, Input, Slider, Tooltip} from "antd";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getNextOrPrevPage, getSongsBySearch, SongType} from "../redux/Reducers/Music_Reducer";
import {
    getErrorMusic,
    getIsLoading,
    getNextPageToken,
} from "../redux/Selectors/Music_Selector";
import m from './Music.module.scss'
import {
    FilterOutlined, BorderOutlined, SoundOutlined, RightCircleOutlined, PauseCircleOutlined, LeftCircleOutlined,
    PlayCircleOutlined, PlusCircleOutlined, CloseCircleOutlined, SearchOutlined
} from '@ant-design/icons';
import {getThemeMode} from "../redux/Reducers/theme-reducer";
import {actionsMySongsPlaylist} from "../redux/Reducers/MySongs_Reducer";
import {useAudio} from "../Video/Audio_Player/useAudio";


const MusicPage = () => {
    return (
        <div className={m.musicPage_wrapper}>
            <SearchMusic/>
            <div className={m.mySongs_CurrentSong_Container}>
                <AudioDetails/>
                <MySongsPlaylist/>
            </div>
        </div>
    )
}
export const SearchMusic = () => {
    const error = useSelector(getErrorMusic)
    const theme = useSelector(getThemeMode)
    const isLoading = useSelector(getIsLoading)
    const nextPageToken = useSelector(getNextPageToken)
    //const prevPageToken = useSelector(getPrevPageToken)
    const dispatch = useDispatch()

    //---Search Songs
    const [searchTerm, setSearchTerm] = useState('Eminem')
    const [term, setTerm] = useState(null as string | null)
    useEffect(() => {
        if (term) {
            dispatch(getSongsBySearch(term))
            setTerm(null)
        }
    }, [term])
    let nextPageSearch = nextPageToken?.substring(nextPageToken?.indexOf('s', 11))

    //let prevPageSearch = prevPageToken?.substring(prevPageToken?.indexOf('s', 11))

    function searchMore() {
        if (nextPageSearch) dispatch(getNextOrPrevPage(nextPageSearch))
    }


    const {
        isPlaying,
        setNewAudio,
        searchPlaylist,
        indexSong,
        currentPlaylist, playAudio, pauseAudio,
    } = useAudio()

    function addSongToMyPlaylist(addedSong: SongType) {
        let newSong = {
            id: addedSong.id,
            title_short: addedSong.title_short,
            preview: addedSong.preview,
            artist: addedSong.artist.name,
            artistLink: addedSong.artist.tracklist,
            trackLink: addedSong.link,
            album: addedSong.album.title,
            albumCover: addedSong.album.cover_big,
            albumLink: addedSong.album.tracklist


        }
        dispatch(actionsMySongsPlaylist.setNewMySong(newSong))
    }

    function setCurrentAudio(index: number, autoplay = false) {
        let {id, title_short, preview, artist, album, link} = searchPlaylist[index]
        let newSong = {
            id: id,
            title_short: title_short,
            trackLink: link,
            preview: preview,
            artist: artist.name,
            artistLink: artist.tracklist,
            album: album.title,
            albumCover: album.cover_big,
            albumLink: album.tracklist
        }
        setNewAudio(index, 'searchPlaylist', newSong, autoplay)
    }

    function play(index: number, autoplay = false) {
        if (index === indexSong && currentPlaylist === 'searchPlaylist') {
            playAudio()
        } else {
            setCurrentAudio(index, autoplay)
        }


    }

    const SearchResult = searchPlaylist.length > 0 && searchPlaylist.map(a => (


        <div key={a.id}
             className={`${indexSong === searchPlaylist.indexOf(a) && currentPlaylist === 'searchPlaylist' ? m.songs_list_active : m.songs_list} ${theme === 'dark' && m.dark_theme_list}`}
        >
            <div className={m.song_list_container}>
                {isPlaying && currentPlaylist === 'searchPlaylist' && indexSong === searchPlaylist.indexOf(a) ?
                    <div className={m.icon} onClick={pauseAudio}>
                        <PauseCircleOutlined/>
                    </div>
                    :
                    <div className={m.icon} onClick={() => {
                        play(searchPlaylist.indexOf(a), true)
                    }}>
                        <PlayCircleOutlined/>
                    </div>
                }

                <div className={m.song_title} onClick={() => {
                    setCurrentAudio(searchPlaylist.indexOf(a))
                }}>
                    {a.artist.name} - {a.title}
                </div>
                <div className={m.icon} onClick={() => {
                    addSongToMyPlaylist(a)
                }}>
                    <PlusCircleOutlined/>
                </div>
            </div>
        </div>)
    )
    return (
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
                {SearchResult}
                {searchPlaylist.length > 0 &&
                <div>
                    <Button className={m.button_more} type='primary' block onClick={searchMore}>
                        Ещё
                    </Button>
                </div>}
            </div>

            <div>{error}</div>
        </div>
    )
}
export const MySongsPlaylist = () => {
    const {
        mySongsPlaylist,
        currentPlaylist,
        setNewAudio,
        indexSong,
        playAudio,
        pauseAudio,
        isPlaying,next
    } = useAudio()
    const theme = useSelector(getThemeMode)
    const dispatch = useDispatch()

    function setNewSong(index: number, autoplay = false) {
        debugger
        let {
            id,
            title_short,
            preview,
            artist,
            albumCover,
            artistLink,
            albumLink,
            album,
            trackLink
        } = mySongsPlaylist[index]
        let newSongDetails = {
            id: id,
            title_short: title_short,
            trackLink: trackLink,
            preview: preview,
            artist: artist,
            artistLink: artistLink,
            album: album,
            albumCover: albumCover,
            albumLink: albumLink
        }
        setNewAudio(index, 'mySongs', newSongDetails, autoplay)
    }
    function deleteSong(index:number) {
        if(index===indexSong&&index===mySongsPlaylist.length-1){
            setNewSong(index-1)
        }else if(index===indexSong) {
            setNewSong(index - 1)
        }else if(index===0){
           return
            }
            let id = mySongsPlaylist[index].id
           dispatch(actionsMySongsPlaylist.removeMySong(id))


    }
    function play(index: number, autoplay = false) {
        if (currentPlaylist === "mySongs" && index === indexSong) {
            playAudio()
        } else {
            setNewSong(index, autoplay)
        }
    }

    const mySongs = mySongsPlaylist.map(s => (
        <div
            className={`${m.mySongs_list} ${theme === 'dark' && m.dark_mode} 
            ${currentPlaylist === 'mySongs' && indexSong === mySongsPlaylist.indexOf(s) && m.active}`}>
            {isPlaying && indexSong === mySongsPlaylist.indexOf(s) ?
                <div className={`${m.iconPlay_Pause} ${theme === 'dark' && m.dark_mode}`} onClick={pauseAudio}>
                    <PauseCircleOutlined/>
                </div>
                :
                <div className={`${m.iconPlay_Pause} ${theme === 'dark' && m.dark_mode}`} onClick={() => {
                    play(mySongsPlaylist.indexOf(s), true)
                }}>
                    <PlayCircleOutlined/>
                </div>
            }

            <div className={`${m.songTitle} ${theme === 'dark' && m.dark_mode}`} onClick={() => {
                setNewSong(mySongsPlaylist.indexOf(s))
            }}>
                {s.artist} - {s.title_short}
            </div>
            <div className={`${m.icon_close} ${theme === 'dark' && m.dark_mode}`} onClick={() => {
                deleteSong(mySongsPlaylist.indexOf(s))
            }}>
                <CloseCircleOutlined/>
            </div>

        </div>
    ))
    return (
        <div className={`${m.mySongs_title_list_wrapper} ${theme === 'dark' && m.dark_mode} `}>
            <h2 className={`${m.mySongs_title} ${theme === 'dark' && m.dark_mode}`}>
                Мои песни   {indexSong}
            </h2>

            <div className={`${m.mySongs_list_container} ${m.dark_mode} `}>
                {mySongs}
            </div>

        </div>
    )
}
export const AudioDetails = () => {
    const {
        currentSongDetails,
        currentTime,
        prev,
        isPlaying,
        playAudio,
        pauseAudio,
        next,
        stop,
        audioDuration,
        mute,
        isAudioMute,
        audioVolume,
        setAudioVolume,
    } = useAudio()

    function volumeSlider(value = audioVolume) {

        setAudioVolume(value / 100)
        return `${value}%`;
    }

    function timeSlider(valueTime = currentTime) {
        let progress = Math.floor(valueTime)
        return `${progress} sec`;
    }

    return (
        <div className={m.selectedAudioDetails_container}>

            <div className={m.photoAlbumContainer}>

                <div>
                    <img src={currentSongDetails.albumCover} alt={currentSongDetails.album}/>
                </div>


            </div>
            <div className={m.buttons_name_time_container}>
                <div className={m.title}>
                    {currentSongDetails.artist} - {currentSongDetails.title_short}
                </div>
                <div className={m.song_details}>
                    <div>Альбом: <a href={currentSongDetails.albumLink}>{currentSongDetails.album}</a></div>
                    <div>Полная версия трека доступна пo <a href={currentSongDetails.trackLink}>ссылке</a></div>
                    {currentTime}
                </div>
                <div className={m.buttons_container}>

                    <Button className={m.button} onClick={prev}>
                        <LeftCircleOutlined/>
                    </Button>
                    {!isPlaying ?
                        <Button className={m.button} onClick={playAudio}>
                            <PlayCircleOutlined/> Play
                        </Button>
                        :
                        <Button className={m.button} onClick={pauseAudio}>
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
                    <Slider tipFormatter={timeSlider} value={currentTime} className={m.slider_time}
                            trackStyle={{color: 'red',}} handleStyle={{background: 'greenyellow'}}
                            max={audioDuration || 0} defaultValue={currentTime}
                            tooltipVisible={currentTime !== 0}/>
                </div>
            </div>

            <div className={m.volume_container}>
                <Slider className={m.volume_slider} vertical tipFormatter={volumeSlider}
                        defaultValue={75}/>
                {!isAudioMute ?
                    <Button className={m.muted_button} onClick={mute} icon={<SoundOutlined/>}/>
                    :
                    <Button className={m.muted_button} onClick={mute} icon={<FilterOutlined rotate={90}/>}/>

                }
            </div>


        </div>
    )
}

export default MusicPage
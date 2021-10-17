import {useAudio} from "./useAudio";
import {useEffect, useState} from "react";

export const AudioPlayer = () => {
    const {
        isPlaying,
        next,
        autoPlay,
        playAudio,
        setCurrentTime,
        currentPlaylist,
        indexSong,
        mySongsPlaylist,
        searchPlaylist,
        audioVolume, isAudioMute, _setAudioDuration
    } = useAudio()


    const [audio, setAudio] = useState(null as HTMLAudioElement | null)


    useEffect(() => {
        if (currentPlaylist === 'mySongs') {
            if(mySongsPlaylist[indexSong]===undefined){

            }else{
                let newSong = new Audio(mySongsPlaylist[indexSong].preview)
                setAudio(newSong)
                if (autoPlay) playAudio()
            }



        }
        if (currentPlaylist === 'searchPlaylist') {

            let newSong = new Audio(searchPlaylist[indexSong].preview)
            setAudio(newSong)
            if (autoPlay) playAudio()
        }

    }, [indexSong, currentPlaylist])

    const [prevLength, setLenght] = useState(mySongsPlaylist.length)
  /*  useEffect(()=>{
        if(currentPlaylist==='mySongs' && mySongsPlaylist.length<prevLength){
            next()
        }
        setLenght(mySongsPlaylist.length)

    },[mySongsPlaylist.length])*/

    useEffect(() => {
        if (audio) {
            audio.addEventListener('ended', () => {
                next()
            })
            audio.addEventListener('timeupdate', () => {
                setCurrentTime(Math.floor(audio.currentTime))
            })
            audio.addEventListener('durationchange', () => {
                _setAudioDuration(audio.duration)
            })
        }
    }, [audio])
    useEffect(() => {

    }, [indexSong])

    useEffect(() => {
        if (audio) {
            isPlaying && audio.play()
            !isPlaying && audio.pause()
        }
    }, [isPlaying, audio])
    useEffect(() => {
        if (audio) audio.volume = audioVolume
    }, [audioVolume, audio])
    useEffect(() => {
        if (audio) audio.muted = isAudioMute
    }, [audio, isAudioMute])

    return (<></>)
}
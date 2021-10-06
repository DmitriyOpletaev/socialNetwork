import {useDispatch, useSelector} from "react-redux";
import {
    actionsAudioPlayer, CurrentSongType, getAudioDuration,
    getAudioIndex, getAudioMute, getAudioVolume, getAutoPlay,
    getCurrentPlaylist, getCurrentSongDetails, getCurrentTime,
    getIsPlaying
} from "../../redux/Reducers/Audio_Player_Reducer";
import {getMySongsPlaylist} from "../../redux/Reducers/MySongs_Reducer";
import {getSearchPlaylist} from "../../redux/Selectors/Music_Selector";


export function useAudio() {
    const dispatch = useDispatch()
    const currentPlaylist = useSelector(getCurrentPlaylist)
    const indexSong = useSelector(getAudioIndex)
    const mySongsPlaylist = useSelector(getMySongsPlaylist)
    const searchPlaylist = useSelector(getSearchPlaylist)
    const isPlaying = useSelector(getIsPlaying)
    const autoPlay = useSelector(getAutoPlay)
    const currentTime = useSelector(getCurrentTime)
    const audioVolume = useSelector(getAudioVolume)
    const currentSongDetails = useSelector(getCurrentSongDetails)
    const isAudioMute = useSelector(getAudioMute)
    const audioDuration = useSelector(getAudioDuration)



    function setNewAudio(index: number, playlist: 'mySongs' | 'searchPlaylist',songDetails:CurrentSongType,enableAutoplay=false) {

        dispatch(actionsAudioPlayer.setIsPlaying(false))
        if(enableAutoplay)dispatch((actionsAudioPlayer.setAutoplay(true)))
        dispatch(actionsAudioPlayer.setCurrentPlaylist(playlist))
        dispatch(actionsAudioPlayer.setNewAudio(index))
        dispatch(actionsAudioPlayer.setNewCurrentSongDetails(songDetails))
        setCurrentTime(0)
    }
   function _setAudioDuration(audioLenght:number){
        dispatch(actionsAudioPlayer.setAudioDuration(audioLenght))
    }

    function playAudio() {
        dispatch(actionsAudioPlayer.setIsPlaying(true))
        dispatch(actionsAudioPlayer.setAutoplay(true))
    }

    function pauseAudio() {
        dispatch(actionsAudioPlayer.setIsPlaying(false))
        dispatch(actionsAudioPlayer.setAutoplay(false))
    }

    function next() {
        dispatch(actionsAudioPlayer.setIsPlaying(false))
        setCurrentTime(0)
        if (currentPlaylist === 'mySongs') {
            if (indexSong < mySongsPlaylist.length - 1) dispatch(actionsAudioPlayer.setNewAudio(indexSong + 1))
            else {
                dispatch(actionsAudioPlayer.setNewAudio(0))
            }
        }
        if (currentPlaylist === 'searchPlaylist') {
            if (indexSong < searchPlaylist.length - 1) dispatch(actionsAudioPlayer.setNewAudio(indexSong + 1))
            else {
                dispatch(actionsAudioPlayer.setNewAudio(0))
            }
        }

    }
    function prev() {
        dispatch(actionsAudioPlayer.setIsPlaying(false))
        dispatch(actionsAudioPlayer.setCurrentTimeAudio(0))
        if (currentPlaylist === 'mySongs') {
            if (indexSong === 0) dispatch(actionsAudioPlayer.setNewAudio(mySongsPlaylist.length - 1))
            else {
                dispatch(actionsAudioPlayer.setNewAudio(indexSong - 1))
            }
        }
        if (currentPlaylist === 'searchPlaylist') {

            if (indexSong === 0) dispatch(actionsAudioPlayer.setNewAudio(searchPlaylist.length - 1))
            else {
                dispatch(actionsAudioPlayer.setNewAudio(indexSong - 1))
            }
        }

    }



    function setCurrentTime(time:number){
        dispatch(actionsAudioPlayer.setCurrentTimeAudio(time))
    }
    function setAudioVolume(volume:number){

        dispatch(actionsAudioPlayer.setAudioVolume(volume))

    }
    function stop(){
        pauseAudio()
        setCurrentTime(0)

    }
    function mute(){
        dispatch(actionsAudioPlayer.setAudioMute(!isAudioMute))
    }


    return {
        playAudio,
        pauseAudio,
        setNewAudio,
        next,
        prev,
        indexSong,
        isPlaying,
        mySongsPlaylist,
        currentPlaylist,
        searchPlaylist,
        autoPlay,audioDuration,
        currentTime,stop,_setAudioDuration,
        setCurrentTime,audioVolume,setAudioVolume,currentSongDetails,mute,isAudioMute
    }
}

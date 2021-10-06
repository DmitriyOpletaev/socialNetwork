import {AppStateType, BaseThunkType, InferActionsTypes} from "../redux-store";
import {Song} from "./MySongs_Reducer";


type InitialState = typeof initialState
type Actions = InferActionsTypes<typeof actionsAudioPlayer>
type ThunkType = BaseThunkType<Actions>

export function getAudioIndex(state: AppStateType) {
    return state.audioPlayer.audioIndex
}

export function getIsPlaying(state: AppStateType) {
    return state.audioPlayer.isPlayed
}

export function getCurrentPlaylist(state: AppStateType) {
    return state.audioPlayer.currentPlaylist
}

export function getAutoPlay(state: AppStateType) {
    return state.audioPlayer.autoPlay
}

export function getCurrentTime(state: AppStateType) {
    return state.audioPlayer.currentTimeAudio
}

export function getAudioVolume(state: AppStateType) {
    return state.audioPlayer.audioVolume
}

export function getCurrentSongDetails(state: AppStateType) {
    return state.audioPlayer.currentSongDetails
}
export function getAudioMute(state: AppStateType) {
    return state.audioPlayer.audioMute
}
export function getAudioDuration(state: AppStateType) {
    return state.audioPlayer.audioDuration
}


let initialState = {
    currentPlaylist: 'mySongs' as 'mySongs' | 'searchPlaylist',
    audioIndex: 0,
    currentSongDetails: {
        id: 1109731,
        title_short: 'Lose Yourself',
        preview: 'https://cdns-preview-1.dzcdn.net/stream/c-13039fed16a173733f227b0bec631034-12.mp3',
        artist: 'Eminem',
        artistLink: '',
        album: 'Curtain Call: The Hits',
        trackLink: 'https://www.deezer.com/track/1109731',
        albumCover: 'https://cdns-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/500x500-000000-80-0-0.jpg',
        albumLink: '',

    },
    isPlayed: false,
    autoPlay: false,
    currentTimeAudio: 0,
    audioDuration: null as number|null,
    audioVolume: 1,
    audioMute: false
}
export type CurrentSongType = typeof initialState.currentSongDetails

export const audioPlayer = (state = initialState, action: Actions): InitialState => {

    switch (action.type) {

        case 'SET_NEW_AUDIO' :
            return {
                ...state,
                audioIndex: action.payload.index,
            }
        case 'SET_STATUS_AUDIO' :
            return {
                ...state,
                isPlayed: action.payload.isPlaying

            }
        case 'SET_AUTOPLAY' :
            return {
                ...state,
                autoPlay: action.payload.autoplay

            }
        case 'SET_CURRENT_PLAYLIST' :
            return {
                ...state,
                currentPlaylist: action.payload.currentPlaylist

            }
        case 'SET_CURRENT_TIME_AUDIO' :
            return {
                ...state,
                currentTimeAudio: action.payload.currentTime

            }
        case 'SET_AUDIO_VOLUME' :
            return {
                ...state,
                audioVolume: action.payload.audioVolume

            }
        case 'SET_CURRENT_SONG_DETAILS' :
            return {
                ...state,
                currentSongDetails: action.payload.currentSongDetails

            }
        case 'SET_CURRENT_MUTE' :
            return {
                ...state,
                audioMute: action.payload.audioMute

            }
            case 'SET_AUDIO_DURATION' :
            return {
                ...state,
                audioDuration: action.payload.audioDuration

            }


        default:
            return state
    }
}


export const actionsAudioPlayer = {

    setNewAudio: (index: number) => ({
        type: 'SET_NEW_AUDIO',
        payload: {index}
    } as const),
    setIsPlaying: (isPlaying: boolean) => ({
        type: 'SET_STATUS_AUDIO',
        payload: {isPlaying}
    } as const),
    setAutoplay: (autoplay: boolean) => ({
        type: 'SET_AUTOPLAY',
        payload: {autoplay}
    } as const),
    setCurrentPlaylist: (currentPlaylist: 'mySongs' | 'searchPlaylist') => ({
        type: 'SET_CURRENT_PLAYLIST',
        payload: {currentPlaylist}
    } as const),
    setCurrentTimeAudio: (currentTime: number) => ({
        type: 'SET_CURRENT_TIME_AUDIO',
        payload: {currentTime}
    } as const),
    setAudioVolume: (audioVolume: number) => ({
        type: 'SET_AUDIO_VOLUME',
        payload: {audioVolume}
    } as const),
    setNewCurrentSongDetails: (currentSongDetails: CurrentSongType) => ({
        type: 'SET_CURRENT_SONG_DETAILS',
        payload: {currentSongDetails}
    } as const),
    setAudioMute: (audioMute: boolean) => ({
        type: 'SET_CURRENT_MUTE',
        payload: {audioMute}
    } as const),
setAudioDuration: (audioDuration: number) => ({
        type: 'SET_AUDIO_DURATION',
        payload: {audioDuration}
    } as const),

}












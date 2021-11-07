import {PlaylistInfoResponse, PlaylistResponse} from "./Types_Youtube_API/Playlist_Types";
import {instanceYoutube} from "./API";


export const YoutubeAPIPlaylist = {

    getPlaylistVideos(playlistId: string | Array<string>) {
        const params = {
            part: 'snippet,contentDetails,status,id',
            playlistId: playlistId.toString(),
            maxResults: 25
        }
        return instanceYoutube().get<PlaylistResponse>(`playlistItems?`, {params}).then(
            response => response.data
        )
    },

    getPlaylistInfo(
        playlistId: string | Array<string> | null,
        channelId: string | null=null,
        pageToken:string|null=null) {
        const params = {
            part: 'snippet,contentDetails',
            id: playlistId ? playlistId.toString() : null,
            channelId: channelId,
            maxResults: 25,
            pageToken:pageToken
        }
        return instanceYoutube().get<PlaylistInfoResponse>(`playlists?`, {params}).then(
            response => response.data
        )
    },

}
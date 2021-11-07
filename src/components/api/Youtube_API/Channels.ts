import {instanceYoutube} from "./API";
import {
    ChannelBrandingSettings,
    Channels_Types, ChannelSectionsResponse,
    ChannelSnippet,
    ChannelStatistics, ChannelStatus
} from "./Types_Youtube_API/Channels_Types";


export const YoutubeChannelsAPI={

    getUserYoutubeChannel(access_token: string) {
        const params={
            part:'snippet,statistics',
            mine:true,
        }
        return instanceYoutube(access_token).get<Channels_Types<ChannelSnippet, ChannelStatistics>>(
            `channels?`, {params}
        ).then(
            res => res.data
        )
    },
    getChannelsById(id: string | Array<string>) {
        const params = {
            part: 'snippet,statistics',
            id: id.toString()
        }
        return instanceYoutube().get<Channels_Types<ChannelSnippet, ChannelStatistics>>(
            'channels?', {params}).then(res => res.data)
    },

    getFullInfoChannelById(channelId: string | Array<string>) {
        const params = {
            part: 'snippet,statistics,brandingSettings,status',
            id: channelId.toString()
        }
        return instanceYoutube().get<Channels_Types<ChannelSnippet, ChannelStatistics, ChannelBrandingSettings, ChannelStatus>>(
            'channels?', {params}).then(res => res.data)
    },

    getChannelSections(channelId: string) {
        const params = {
            part: 'snippet,id,contentDetails',
            channelId: channelId
        }
        return instanceYoutube().get<ChannelSectionsResponse>(
            'channelSections?', {params}).then(res => res.data
        )
    },

}
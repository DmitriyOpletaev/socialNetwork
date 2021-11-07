import {
    SubscriptionsContentDetails, SubscriptionsListResponse,
    SubscriptionsResource,
    SubscriptionsSnippet
} from "./Types_Youtube_API/Auth_Requests_Types";
import {OrderChannelType} from "./Videos_List";
import {instanceYoutube} from "./API";


export const YouTubeApiSubscriptions = {

    subscribeChannel(channelId: string, access_token: string) {
        const params = {
            part: 'snippet,contentDetails',
        }
        const data = {
            snippet: {resourceId: {channelId: channelId}}
        }
        return instanceYoutube(access_token).post<SubscriptionsResource<SubscriptionsSnippet, SubscriptionsContentDetails>>('subscriptions?', data, {params}).then(
            response => response.data
        )
    },
    unSubscribeChannel(subscriptionId: string, access_token: string) {
        const params = {
            id: subscriptionId,
        }
        return instanceYoutube(access_token).delete<number>('subscriptions?', {params}).then(
            response => response.status
        )
    },
    getSubscriptionsList(access_token: string, pageToken: string | null, order: OrderChannelType = null, channelId: string | null = null) {
        const params = {
            forChannelId: channelId,
            maxResults: 50,  // max-50
            order,
            mine: true,
            part: 'snippet,contentDetails,subscriberSnippet,id',
            pageToken
        }

        return instanceYoutube(access_token).get<SubscriptionsListResponse<SubscriptionsSnippet, SubscriptionsContentDetails>>(
            'subscriptions?', {params}
        ).then(
            response => response.data
        )
    }
}
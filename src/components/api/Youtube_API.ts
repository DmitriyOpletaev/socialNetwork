const youtubeAPIKey = 'AIzaSyBey2mu4mayQvY4yJYoAEc2cFT_PzIKzd4';
const YOUTUBE_VIDEOS_ITEMS_API = 'https://www.googleapis.com/youtube/v3/search'
const clientId =  '205239420469-a77bsbiec4k1mpu3lb4nfl05krmm6262.apps.googleusercontent.com'




export const YoutubeAPI = {
    getVideosByTerm(searchTerm:string,prevPageToken:string|null, nextPageToken:string|null) {
        const pageToken = !prevPageToken&&!nextPageToken? null :`&pageToken=${prevPageToken||nextPageToken||''}`

        return fetch(`${YOUTUBE_VIDEOS_ITEMS_API}?part=snippet&maxResults=5${pageToken}&type=video&q=${searchTerm}&key=${youtubeAPIKey}`).then(
            res => { return res.json()

            }

        )
    }
}

import axios from "axios";

// noinspection SpellCheckingInspection

const credentialsKaiLorenz={
    youtubeAPIKey:'AIzaSyAG8WBGmDGUvvDUkPDb183aXrm2_lq_pog',
    clientId:'152460531765-4vbbcrtdq4sgp4ujmgtpvo9os14b5caj.apps.googleusercontent.com'
}
const credentialsDimaOpletaev={
    youtubeAPIKey:'AIzaSyBey2mu4mayQvY4yJYoAEc2cFT_PzIKzd4',
    clientId:'205239420469-gr8qnte9im8eqqpf7tq5d95qe9knnek3.apps.googleusercontent.com'
}

export const credentials = {
    youtubeAPIKey: credentialsKaiLorenz.youtubeAPIKey,
    clientId: credentialsKaiLorenz.clientId
}

export function instanceYoutube(access_token:string|null=null){
   return  axios.create({
            baseURL: 'https://www.googleapis.com/youtube/v3/',
            params: {
                key: credentials.youtubeAPIKey,
            },
            headers: access_token ? {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            } : null
        }
    )
}


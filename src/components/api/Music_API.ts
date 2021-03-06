import axios from "axios";
import {SongType} from "../redux/Reducers/Music_Reducer";


const instanceMusic = axios.create({
    baseURL: 'https://deezerdevs-deezer.p.rapidapi.com/',
    headers: {
        'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
        'x-rapidapi-key': '9a0f31bd98msh9d7fd39937070e0p1cb9edjsn9ec6b13487da'
    }
})
const instanceMusikNext = axios.create({
    baseURL: 'https://api.deezer.com/',
    headers: {
       // 'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
       // 'x-rapidapi-key': '9a0f31bd98msh9d7fd39937070e0p1cb9edjsn9ec6b13487da'
    }
})
type Error = {
    code:number
    message:string
    type:string
}
type Response = Array<SongType>

export const MusicAPI = {
    getMusicBySearch(searchTerm: string) {
        return instanceMusic.get<any>(`search?q=${searchTerm}`).then(
            res => {
                return res.data
            })
    },
    getNextOrPrevPage(token:string) {
        return instanceMusic.get<any>(`${token}`).then(
            res => {
                console.log(res.data)
                return res.data
            })
    },


}

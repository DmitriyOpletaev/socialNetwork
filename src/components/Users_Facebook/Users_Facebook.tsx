import m from './Facebook_Users.module.scss'
import {useSelector} from "react-redux";
import {MainAuthSelelector} from "../redux/Reducers/Auth-Reducer";
import {Button} from "antd";
import axios from "axios";

const apiKey = '884877782401621'
const instance = axios.create({
    baseURL:`https://graph.facebook.com/`
})

export const FacebookUsers=()=>{

    const facebookAccessToken = useSelector(MainAuthSelelector.facebook_Access_token)

    async function searchPages(){
        if(facebookAccessToken){
            const data = await fetch(`https://graph.facebook.com/pages/search?q=Facebook&fields=id,name,location,link&access_token=${facebookAccessToken}`).then(
                res=>res.json()
            )
            console.log(data)
        }
    }


    return(
        <div>
            <div>
                {facebookAccessToken}
            </div>
           <Button onClick={searchPages}>
               Pages
           </Button>
        </div>
    )
}
import FacebookLogin, {ReactFacebookLoginInfo} from 'react-facebook-login';
import {useDispatch, useSelector} from "react-redux";
import {actionsAuthReducer, MainAuthSelelector} from "../redux/Reducers/Auth-Reducer";
import axios from "axios";
import {Button} from "antd";
import {useState} from "react";


export const FacebookLoginButton = () => {
    const dispatch = useDispatch()

    const[userId,setId]=useState(null as string|null)
    function responseFacebook(response: ReactFacebookLoginInfo) {
        dispatch(actionsAuthReducer.setFacebookLogin(response.accessToken))
        setId(response.userID)
    }
  //  https://graph.facebook.com/search?q=john&access_token={my_app_access_token}

    const apiKey = '884877782401621'
    const instance = axios.create({
        baseURL:`https://graph.facebook.com/`
    })
    function getUsers(accessToken:string){
        return  instance.get(`search?q=john&access_token=${accessToken}`)
    }
    const facebook_Access_Token = useSelector(MainAuthSelelector.facebook_Access_token)

    async function Find (){
        if(facebook_Access_Token&&userId)
        {
            const data = await getUsers(facebook_Access_Token)
            console.log(data)
        }
    }







    return (
        <>
            <FacebookLogin
                appId="884877782401621"
                fields="name,email,picture"
                callback={responseFacebook}
                icon="fa-facebook"
                textButton='facebook'
                scope='user_friends'
            />
            <Button onClick={()=>{
                if(userId)Find()
            }}
                    type={facebook_Access_Token? 'primary':'default'}
            >
                {userId || 'find'}
            </Button>
        </>
    )
}
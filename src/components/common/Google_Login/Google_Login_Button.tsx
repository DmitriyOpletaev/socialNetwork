import {useDispatch, useSelector} from "react-redux";
import {actionsAuthReducer, getInitializedGoogle} from "../../redux/Reducers/Auth-Reducer";
import {useState} from "react";
import {
    GoogleLoginResponse,
    useGoogleLogin,
    useGoogleLogout
} from "react-google-login";
import {Avatar, Button, Tooltip} from "antd";
import m from './Gooogle_Login_Button.module.css';
import googleIcon from "../../../assets/images/Icons/Google.png";
import {credentials} from "../../api/Youtube_API/API";


export const GoogleLoginButton = () => {
    const dispatch = useDispatch()
    const isInitialized = useSelector(getInitializedGoogle)
    const [user, setUser] = useState({} as GoogleUser)

    function onSuccess(response: GoogleLoginResponse) {
        dispatch(actionsAuthReducer.setGoogleLogin(response.accessToken))
        const {googleId, givenName, email, imageUrl} = response.profileObj
        setUser({givenName, imageUrl, email, googleId})
    }

    const {signIn, loaded} = useGoogleLogin({
            clientId: credentials.clientId,
            scope: 'https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube.force-ssl',
            onSuccess:onSuccess,
            isSignedIn: true
        }
    )

    function onLogoutSuccess() {
        dispatch(actionsAuthReducer.setGoogleLogout())
    }

    const {signOut} = useGoogleLogout({
        clientId: credentials.clientId,
        onLogoutSuccess,
    })


    if (isInitialized) return (
        <Tooltip title='Выйти' placement='bottom'>
            <Button type='default' className={m.login_button} onClick={signOut}
                    icon={<Avatar size='small' src={user.imageUrl} alt='=)'/>}
            >
                {user.givenName}
            </Button>
        </Tooltip>
    )
    else return (
        <Button type='default' className={m.login_button} onClick={signIn} loading={!loaded}
                icon={<Avatar className={m.button_image} size='small' src={googleIcon}/>}>
            Войти
        </Button>
    )
}


interface GoogleUser {
    givenName: string
    imageUrl: string
    email: string
    googleId: string
}



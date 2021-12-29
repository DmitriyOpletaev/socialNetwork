import FacebookLogin, {ReactFacebookLoginInfo} from 'react-facebook-login';
import {useDispatch} from "react-redux";
import {actionsAuthReducer} from "../redux/Reducers/Auth-Reducer";


export const FacebookLoginButton = () => {
    const dispatch = useDispatch()

    function responseFacebook(response: ReactFacebookLoginInfo) {
        console.log(response)
        dispatch(actionsAuthReducer.setFacebookLogin(response.accessToken))
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
        </>
    )
}
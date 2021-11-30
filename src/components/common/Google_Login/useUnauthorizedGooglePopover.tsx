import React from "react";
import {useSelector} from "react-redux";
import {getAccessToken} from "../../redux/Reducers/Auth-Reducer";
import {Popover} from "antd";
import m from './Gooogle_Login_Button.module.css'
import {GoogleLoginButton} from "./Google_Login_Button";
import {TooltipPlacement} from "antd/es/tooltip";




export const useGoogleUnauthorizedPopover = (
    wrappedComponent: JSX.Element,
    someFunction: () => void=()=>{},
    placement:TooltipPlacement='bottom',
    text: string = 'Вы не авторизованы !'

) => {
    const accessToken = useSelector(getAccessToken)
        return accessToken ?
            <div onClick={someFunction} className={m.wrapped_component_container}>
                {wrappedComponent}
            </div>
            :
            <Popover trigger='click' placement={placement}  content={
                <div>
                    <div className={m.text}>
                        {text}
                    </div>
                    <div className={m.button_container}>
                        <GoogleLoginButton/>
                    </div>
                </div>
            }>
                <div className={m.wrapped_component_container}>
                    {wrappedComponent}
                </div>

            </Popover>
}

import React from "react";
import {Chat} from "./Chat";
import {Redirect, withRouter} from "react-router-dom";
import {connect, useSelector} from "react-redux";
import {getAuthorizedId} from "../redux/Selectors/Auth_Selector";
import { compose } from "redux";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {initializeApp} from "../redux/Reducers/app-reducer";


const ChatPageHOC:React.FC<Props>=(props)=>{

    let authorizedUserId = useSelector(getAuthorizedId)

    /*if (!authorizedUserId) {
        return <Redirect to='/login'/>
    }*/
    return(

        <Chat/>

    )
}


export default compose<React.ComponentType>(withAuthRedirect)(ChatPageHOC)



type Props={

}
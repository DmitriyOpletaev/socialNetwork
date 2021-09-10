import React from "react";
import {connect} from "react-redux";
import Header from "./Header";
import {logOutMe} from "../redux/Reducers/auth_reducer";
import {AppStateType} from "../redux/redux-store";

type MapState={
    isAuth:boolean
        login:string|null
}
type MapDispatch={
    logOutMe:()=>void
}

let HeaderContainer:React.FC<MapState&MapDispatch>=({isAuth, login, logOutMe})=> {

    function logOut() {
        logOutMe();

    }


    return (
        <Header isAuth={isAuth} logOut={logOut} login={login} />
    )
}


function mapStateToProps(state:AppStateType) {

    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
    }
}


export default connect<MapState,MapDispatch,{},AppStateType>(mapStateToProps, {logOutMe})(HeaderContainer);


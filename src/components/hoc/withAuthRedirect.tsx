import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";
import LoginPage from "../LoginPage/LoginPage";


type MapState={isAuth:boolean}
type DispatchProps={}
let mapStateToPropsForRedirect = (state:AppStateType) => ({
    isAuth: state.auth.isAuth,
}as MapState)


export function withAuthRedirect<WCP>(WrappedComponent:React.ComponentType<WCP>) {

    const RedirectComponent:React.FC<MapState&DispatchProps>=(props)=> {

        let {isAuth, ...restProps}=props
        if (!isAuth) {

            return <LoginPage/>
        }

        return <WrappedComponent {...restProps as WCP}/>


    }


    let ConnectedAuthRedirectComponent = connect<MapState, DispatchProps,WCP,AppStateType>(mapStateToPropsForRedirect,{})(
        RedirectComponent)


    return ConnectedAuthRedirectComponent;
}
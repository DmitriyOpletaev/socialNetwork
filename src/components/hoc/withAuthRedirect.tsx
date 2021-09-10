import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";


type MapState={isAuth:boolean}
type DispatchProps={}
let mapStateToPropsForRedirect = (state:AppStateType) => ({
    isAuth: state.auth.isAuth,
}as MapState)


export function withAuthRedirect<WCP>(WrappedComponent:React.ComponentType<WCP>) {

    const RedirectComponent:React.FC<MapState&DispatchProps>=(props)=> {
        let {isAuth, ...restProps}=props
        if (!isAuth) {
            return <Redirect to={'/login'}/>
        }

        return <WrappedComponent {...restProps as WCP}/>


    }


    let ConnectedAuthRedirectComponent = connect<MapState, DispatchProps,WCP,AppStateType>(mapStateToPropsForRedirect,{})(
        RedirectComponent)


    return ConnectedAuthRedirectComponent;
}
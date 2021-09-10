import React, {ComponentType} from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getUserStatus,
    getUserProfile,
    updateUserStatus,
    savePhoto,
} from "../redux/Reducers/profile-reducer";
import {Redirect, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from "redux";
import {ProfileType} from "../../types/types";
import {AppStateType} from "../redux/redux-store";


type OwnPropsType={
    userId:number
    match: any

}
type MapDispatchPropsType={
    getUserProfile:(id:number)=>void
    getUserStatus:(id:number)=>void
    updateUserStatus:(status:string)=>void
    savePhoto:(file:any)=>void
}
type MapStateToPropsType={
    profile: ProfileType|null
    status: string
    authorizedUserId: number|null
}
type PropsType = MapStateToPropsType & MapDispatchPropsType & OwnPropsType
type StateType={}

function mapStateToProps(state:AppStateType):MapStateToPropsType {

    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.id,
    }

}


class ProfileContainer extends React.Component<PropsType, StateType> {

    refreshProfile() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId
            //userId=19338
        }

        this.props.getUserProfile(userId)
        this.props.getUserStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }


    componentDidUpdate(prevProps:PropsType, prevState:PropsType,) {


        if (this.props.match.params.userId !== prevProps.match.params.userId) {

            this.refreshProfile()
        }




    }

    render() {
        if(!this.props.match.params.userId && !this.props.authorizedUserId){return <Redirect to='/login'/>}

        return (
            <Profile
                {...this.props} status={this.props.status} updateUserStatus={this.props.updateUserStatus}
                savePhoto={this.props.savePhoto}
            />
        )
    }
}





export default compose<React.ComponentType>(
    connect(
        mapStateToProps, {
        getUserProfile,
        savePhoto,
        getUserStatus, updateUserStatus,
    }),
    withRouter
)(ProfileContainer)





import mod from './Profile.module.css';
import ProfileInfo from "./Profile_Info/Profile_info";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import React from "react";
import Preloader from "../common/preloader/preloader";
import {Redirect} from "react-router-dom";
import {ProfileType} from "../../types/types";
import { Spin, Alert } from 'antd';


type PropsType = {
    authorizedUserId: number | null
    match: any
    profile: ProfileType | null
    status: string
    savePhoto: (files: any) => void
    updateUserStatus: (status: string) => void
    setStatus?: (status: string) => void
}

let Profile: React.FC<PropsType> = (props) => {

    if (props.profile == null) {
        return <Spin size='large' tip="Loading...">
            <Alert
                message="Alert message title"
                description="Further details about the context of this alert."
                type="info"
            />
        </Spin>
    }
    if (!props.authorizedUserId && !props.match.params.userId) {
        return <Redirect to={'/login'}/>
    }
    return (


        <article className={mod.mainContent}>
            <ProfileInfo profile={props.profile} status={props.status} updateUserStatus={props.updateUserStatus}
                         savePhoto={props.savePhoto} setStatus={props.setStatus} /*savePhotoSuccess={props.savePhoto}*/
            />
           <MyPostsContainer/>
        </article>

    )
}

export default Profile;


/*profileInfo={props.profileInfo}*/
/*addPost={props.addPost}*/
/*dispatch={props.dispatch}*/
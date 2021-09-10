import pI from "./Profile_info.module.css";
import React, {ChangeEvent, useState} from "react";
/*import youtubeIcon from "../../../assets/images/Icons/youtube.png"
import instagramIcon from "../../../assets/images/Icons/Instagram.png"
import twitterIcon from "../../../assets/images/Icons/twitter.png"
import VKIcon from "../../../assets/images/Icons/vk.png"
import websiteIcon from "../../../assets/images/Icons/website.png"
import githubIcon from "../../../assets/images/Icons/github.png"
import tiktokIcon from "../../../assets/images/Icons/tik_tok_logo-600x700.png"*/
import downloadPhotoIcon from "../../../assets/images/download_photo.png"
import nullPhoto from "../../../assets/images/photoUserNull.png"
import ProfileInfoStatus from "./ProfileInfoStatus";
import {ProfileDataForm} from "./Profile Data User Info";
import {ContactsType, ProfileType} from "../../../types/types";



type PropsType={
    profile: ProfileType
    status: string
    updateUserStatus:(status:string)=>void
    files?:any
    savePhoto:(files:any)=>void
    setStatus?:(status:string)=>void


}


let ProfileInfo:React.FC<PropsType>=(props)=> {

    let profile = props.profile

    let [editMode, setEditMode] = useState(false)


    function mainPhotoSelected(e:ChangeEvent<HTMLInputElement>) {


        if (e.target.files?.length) {

            props.savePhoto(e.target.files[0])
        }
    }

    return (

        <div className={pI.ProfileInfoContainer}>
            <div>
                <img className={pI.imgScenery} alt="Forest"
                     src="https://st2.depositphotos.com/1007283/7112/i/600/depositphotos_71120903-stock-photo-wide-panorama-landscape-in-bavaria.jpg"/>
            </div>


            <div className={pI.userContainer}>
                <div className={pI.container_Photo}>
                    <img className={pI.user_photo} alt='User'
                         src={profile.photos.large || nullPhoto}/>
                    <div className={pI.download_photo}>
                        <input type={'file'} onChange={mainPhotoSelected}/>
                        <img alt='download' src={downloadPhotoIcon}/>
                    </div>

                </div>

                <div className={pI.InfoUser}>
                    {props.profile.fullName}

                    <ProfileInfoStatus status={props.status} updateUserStatus={props.updateUserStatus} />

                    { editMode ?
                        <ProfileDataForm lookingForAJobDescription={props.profile.lookingForAJobDescription}
                                         /*aboutMe={props.profile.aboutMe}*/
                        />
                    :
                        <ProfileData
                            goToEditMode={()=>{setEditMode(true)}} profile={profile}/>
                    }

                </div>`
            </div>

        </div>
    )
}
type ProfileDataPropsType={
    goToEditMode:()=>void
    profile: ProfileType
}
let ProfileData:React.FC<ProfileDataPropsType>=({profile, goToEditMode}) =>{

    return(

        <div>

            <div className={pI.about_me_container}>
                <div>
                    <button onClick={goToEditMode} className={pI.editButton}>
                        Edit
                    </button>

                </div>
                <span>About me: </span>
                {profile.aboutMe}
            </div>

            <div className={pI.looking_for_a_job_container}>
                <span>Looking for a job:</span>
                {profile.lookingForAJobDescription}
            </div>
            <div className={pI.contacts}>
                {Object.keys(profile.contacts).map((key) =>
                    <Contacts contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]}/>)}
            </div>
        </div>)
}


type ContactsProps={
    contactTitle:string
    contactValue:string
}
let Contacts:React.FC<ContactsProps>=({contactTitle, contactValue})=> {
    return <div><b>{contactTitle}</b>: <a href={contactValue}>{contactValue}</a></div>
}



export default ProfileInfo;
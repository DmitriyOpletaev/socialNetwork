import m from './Profile.module.scss'
import {Avatar, Button, Image, Input} from "antd";
import {CameraOutlined, UserOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {
    GithubOutlined, YoutubeOutlined, InstagramOutlined, FacebookOutlined, TwitterOutlined
} from '@ant-design/icons';
import {Link, useHistory, useParams} from "react-router-dom";
import React, {ChangeEvent, useEffect, useState} from "react";
import {
    getUserProfile,
    getUserStatus,
    savePhoto,
    saveUserDetails,
    updateUserStatus
} from "../redux/Reducers/profile-reducer";
import {getProfileInformation, getProfileUserStatus} from "../redux/Selectors/Profile_Selector";
import {getAuthorizedId} from "../redux/Selectors/Auth_Selector";
import {ContactsType, ProfileType} from "../../types/types";
import nullPhoto from '../../assets/images/photoUserNull.png'
import {Field, Form, Formik, FormikValues} from 'formik';


export const Profile = () => {
    const dispatch = useDispatch()
    const authorizedUserId = useSelector(getAuthorizedId)


    let {userId}: any = useParams()
    if (!userId) {
        userId = authorizedUserId
    }

    useEffect(() => {

        dispatch(getUserProfile(userId))
    }, [userId])

    const profile: ProfileType | null = useSelector(getProfileInformation)

    return (<>
            {profile &&
            <div className={m.profileBody}>

                <ProfilesHead profile={profile} userId={userId} authorizedUserId={authorizedUserId}/>

                <InformationBlock contacts={profile.contacts} aboutMe={profile.aboutMe} userId={userId}
                                  authorizedUserId={authorizedUserId}
                                  lookingForAJobDescription={profile.lookingForAJobDescription}/>

            </div>
            }
        </>
    )
}
type ProfilesHeadProps = {
    profile: ProfileType
    userId: number
    authorizedUserId: number | null
}


export const ProfilesHead: React.FC<ProfilesHeadProps> = ({profile, userId, authorizedUserId}) => {
    const dispatch = useDispatch()
    const status = useSelector(getProfileUserStatus)

    useEffect(() => {
        dispatch(getUserStatus(userId))
    }, [userId])

    const saveCurrentPhoto = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.currentTarget.files) {
                dispatch(savePhoto(e.currentTarget.files[0]))
            }
        },
        [],
    );


    return (<>
            <div className={m.profilesHead_wrapper}>
                <div className={m.profilesHead_Cover}>
                    <img
                        src={'https://scontent.fiev6-1.fna.fbcdn.net/v/t1.6435-9/p960x960/87433080_503888207233144_1936828120745115648_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=e3f864&_nc_ohc=yG0bHC-Ehj8AX_x7b1J&tn=7zIZf4PgmdwGKPT4&_nc_ht=scontent.fiev6-1.fna&oh=32a87637e7a4509cb6b46d440d26b318&oe=616DB494'}/>

                </div>
                <div className={m.userMainDetails}>
                    <div className={m.photo_container}>
                        <div className={m.photo}>
                            <Avatar size={{ xs:350, sm: 350, md: 350, lg: 350, xl: 350, xxl: 350 }}
                                src={profile.photos?.large} icon={!profile.photos.large && <UserOutlined style={{fontSize:'1.5em'}} />}/>
                        </div>
                        {userId === authorizedUserId &&
                        <div className={m.download_Button}>
                            <Button type='primary' shape='circle' className={m.button_photo}>
                                <CameraOutlined/>
                            </Button>
                            <Input type={"file"} onChange={saveCurrentPhoto}/>
                        </div>
                        }

                    </div>
                    <div className={m.status_name_container}>
                        <div className={m.name}>
                            {profile.fullName}
                        </div>
                        <div className={m.status}>
                            {authorizedUserId === userId ?
                                <Status status={status}/>
                                : status
                            }

                        </div>
                    </div>


                </div>


            </div>

        </>
    )
}


type StatusProps = {
    status: string | null
}
export const Status: React.FC<StatusProps> = ({status}) => {
    const dispatch = useDispatch()
    const [editModeStatus, setEditModeStatus] = useState(false)
    const [statusChange, setStatusChange] = useState(status ? status : '')

    useEffect(() => {
        if (status) setStatusChange(status)
    }, [])

    function submitStatus() {
        if (statusChange) {
            dispatch(updateUserStatus(statusChange))
            setEditModeStatus(false)
        }

    }


    return (
        <div>
            {editModeStatus ?
                <div>
                    <Input value={statusChange} onPressEnter={submitStatus} autoFocus
                           onChange={(e) => setStatusChange(e.currentTarget.value)}
                    />
                    <Button type='primary' onClick={submitStatus}>
                        OK
                    </Button>
                </div>
                :
                <div onDoubleClick={() => {
                    setEditModeStatus(true)
                }}>
                    {status || 'Кликните дважды, чтобы изменить статус'}
                </div>
            }


        </div>
    )
}
type InformationBlockProps = {
    contacts: ContactsType
    lookingForAJobDescription: string | null
    aboutMe: string | null
    userId: number
    authorizedUserId: number|null
}
export const InformationBlock:
    React.FC<InformationBlockProps> = ({
                                           contacts, aboutMe, lookingForAJobDescription,
                                           userId, authorizedUserId
                                       }) => {

    const [editMode, setEditMode] = useState(false)
    const history = useHistory()

    return (
        <div className={m.informationBlock_wrapper}>
            {!editMode ? <>
                    <div className={m.contacts_container}>
                        <a href={contacts.github}><GithubOutlined style={{color:'black'}}/></a>
                        <a href={contacts.youtube}><YoutubeOutlined style={{color:'red'}}/></a>
                        <a href={contacts.instagram}><InstagramOutlined/></a>
                        <a href={contacts.facebook}><FacebookOutlined/></a>
                        <a href={contacts.twitter}><TwitterOutlined/></a>
                        <a href={contacts.vk}><img
                            src='https://cdn.icon-icons.com/icons2/2037/PNG/128/media_social_vk_vkontakte_icon_124252.png'
                            alt='vk'/>
                        </a>
                    </div>
                    <div>About me: {aboutMe}</div>
                    <div>looking Job:{lookingForAJobDescription}</div>
                    <div>Website: <a href={contacts.website}>{contacts.website}</a></div>
                    <div>MainLink: <a href={contacts.mainLink}>{contacts.mainLink}</a></div>
                    <div className={m.buttons_container}>
                        {authorizedUserId===userId &&
                        <Button type='primary' onClick={() => setEditMode(true)}>
                            Edit
                        </Button>}
                    </div>
                </>

                : <>
                    <div>
                        <InformationFormChange setEditMode={setEditMode}/>
                        <div className={m.buttons_container}>
                            <Button type='primary' danger onClick={() => setEditMode(false)}>
                                Close
                            </Button>
                        </div>
                    </div>

                </>

            }

        </div>


    )
}

type InformationFormChangeProps = {
    setEditMode: (editMode: boolean) => void

}

const InformationFormChange: React.FC<InformationFormChangeProps> = ({setEditMode}) => {
    const profile = useSelector(getProfileInformation)
    const userId = useSelector(getAuthorizedId)
    const initialValues = {
        userId: userId,
        aboutMe: profile?.aboutMe,
        lookingForAJob: profile?.lookingForAJob,
        lookingForAJobDescription: profile?.lookingForAJobDescription,
        fullName: profile?.fullName,
        contacts: {
            github: profile?.contacts.github,
            vk: profile?.contacts.vk,
            facebook: profile?.contacts.facebook,
            instagram: profile?.contacts.instagram,
            twitter: profile?.contacts.twitter,
            website: profile?.contacts.website,
            youtube: profile?.contacts.youtube,
            mainLink: profile?.contacts.mainLink,
        }


    }
    const dispatch = useDispatch()

    function onSubmit(values: FormikValues) {
        debugger
        dispatch(saveUserDetails(values))
        setEditMode(false)

    }


    return (<div>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {({
                      values, handleBlur, handleChange
                  }) => (
                    <Form>
                        <div>
                            <label htmlFor={'fullName'}>fullName</label>
                            <Field type={`text`} name={'fullName'}
                                   onChange={handleChange} value={values.fullName}>
                            </Field>
                        </div>
                        <div>
                            <label htmlFor={'aboutMe'}>aboutMe</label>
                            <Field type={`text`} name={'aboutMe'}
                                   onChange={handleChange} value={values.aboutMe}>
                            </Field>
                        </div>
                        <div>
                            <label htmlFor={'lookingForAJobDescription'}>lookingForAJobDescription</label>
                            <Field type={`text`} name={'lookingForAJobDescription'}
                                   onChange={handleChange} value={values.lookingForAJobDescription}>
                            </Field>
                        </div>
                        <div>
                            <label htmlFor={'contacts.github'}>github</label>
                            <Field type={`text`} name={'contacts.github'}
                                   onChange={handleChange} value={values.contacts.github}>
                            </Field>
                        </div>
                        <div>
                            <label htmlFor={'contacts.vk'}>vk</label>
                            <Field type={`text`} name={'contacts.vk'}
                                   onChange={handleChange} value={values.contacts.vk}>
                            </Field>
                        </div>
                        <div>
                            <label htmlFor={'contacts.facebook'}>facebook</label>
                            <Field type={`text`} name={'contacts.facebook'}
                                   onChange={handleChange} value={values.contacts.facebook}>
                            </Field>
                        </div>
                        <div>
                            <label htmlFor={'contacts.instagram'}>instagram</label>
                            <Field type={`text`} name={'contacts.instagram'}
                                   onChange={handleChange} value={values.contacts.instagram}>
                            </Field>
                        </div>
                        <div>
                            <label htmlFor={'contacts.twitter'}>twitter</label>
                            <Field type={`text`} name={'contacts.twitter'}
                                   onChange={handleChange} value={values.contacts.twitter}>
                            </Field>
                        </div>
                        <div>
                            <label htmlFor={'contacts.youtube'}>youtube</label>
                            <Field type={`text`} name={'contacts.youtube'}
                                   onChange={handleChange} value={values.contacts.youtube}>
                            </Field>
                        </div>
                        <div>
                            <label htmlFor={'contacts.website'}>website</label>
                            <Field type={`text`} name={'contacts.website'}
                                   onChange={handleChange} value={values.contacts.website}>
                            </Field>
                        </div>
                        <div>
                            <label htmlFor={'contacts.mainLink'}>mainLink</label>
                            <Field type={`text`} name={'contacts.mainLink'}
                                   onChange={handleChange} value={values.contacts.mainLink}>
                            </Field>
                        </div>
                        <button className="ant-btn ant-btn-primary" type={'submit'}>
                            Save
                        </button>

                    </Form>

                )


                }

            </Formik>

        </div>
    )
}


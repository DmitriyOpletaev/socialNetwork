import {FlagOutlined} from "@ant-design/icons";
import m from '../Modal_Window_Styles.module.scss'
import {Input, Modal, Radio, Select, Space, Tooltip} from "antd";
import React, {FC, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    getAbuseReasonList, reportAbuseVideo,
    VideoAbuseReportReason
} from "../../../redux/Reducers/Video_Page_Reducers/Current_Video_Reducer";
import {useVideo} from "../../Video_Components/useVideo";
import {CurrentVideoSelector} from "../../../redux/Selectors/Videos_Selector";
import {Option} from "antd/lib/mentions";
import angryCat from '../../../../assets/images/angryCat.png'
import Preloader from "../../../common/preloader/preloader";
import {useGoogleUnauthorizedPopover} from "../../../common/Google_Login/useUnauthorizedGooglePopover";
import {useErrorNotification} from "../../../common/ErrorNotification/Error_Notification";


export const ComplainsButton = () => {
    const [visibleModal, setVisibleModal] = useState(false)
    const {accessToken} = useVideo()

    function openModal() {
        setVisibleModal(true)
    }

    const buttonAbuse = <FlagOutlined className={m.complains_button}/>
    const videoReportAbuseButton = useGoogleUnauthorizedPopover(buttonAbuse, openModal)
    return (
        <>
            <Tooltip title='Пожаловаться на видео' placement='bottomRight'>
                {videoReportAbuseButton}
            </Tooltip>

            {visibleModal && accessToken && <ModalWindow setVisibleModal={setVisibleModal} visibleModal={visibleModal}
                                                         accessToken={accessToken}
            />}
        </>
    )
}

const ModalWindow: FC<ModalWindowProps> = ({visibleModal, setVisibleModal, accessToken}) => {
    const dispatch = useDispatch()
    const {videoId} = useSelector(CurrentVideoSelector.videoDetails)
    const [selectedMainReason, selectMainReason] = useState(null as string | null)
    const [selectedSecondReason, selectSecondReason] = useState(null as string | null)
    const [comment, setComment] = useState(null as string | null)
    const {videoAbuseReasons, status} = useSelector(CurrentVideoSelector.videoAbuseReasons)

    useEffect(() => {
        !videoAbuseReasons && dispatch(getAbuseReasonList(accessToken))
    }, [accessToken, dispatch])

    function abuseVideo() {
        if (selectedMainReason) dispatch(reportAbuseVideo(accessToken, videoId, selectedMainReason, selectedSecondReason, comment))
    }

    return (
        <Modal visible={visibleModal} onCancel={() => setVisibleModal(false)}
               onOk={abuseVideo} okButtonProps={{
            disabled: !selectedMainReason,
            loading: status === 'loading'
        }} title={<div className={m.complains_modal_window_title}>
            <h2>Причина жалобы</h2>
            <img src={angryCat} alt='Angry cat'/>
        </div>}
        >
            {!videoAbuseReasons ?
                <Preloader/>
                :
                <div className={m.complains_modal_window}>
                    <div>
                        <Reasons videoAbuseReasons={videoAbuseReasons} selectMainReason={selectMainReason}
                                 selectSecondReason={selectSecondReason} selectedMainReason={selectedMainReason}
                        />
                        <MoreInformationInput setComment={setComment}/>
                    </div>

                </div>
            }

        </Modal>
    )
}

const Reasons: FC<MainReasonsProps> = ({
                                           videoAbuseReasons,
                                           selectedMainReason,
                                           selectMainReason,
                                           selectSecondReason
                                       }) => {
    const AbuseReasons = videoAbuseReasons.map(({id, secondaryReasons, label}) => (
        <div key={id}>
            <Radio value={id} className={m.complains_modal_window_radioElement}>
                {label}
            </Radio>
            {id === selectedMainReason && secondaryReasons &&
            <div className={m.complains_modal_window_selectElement}>
                <SecondaryReasons secondaryReasons={secondaryReasons} selectSecondReason={selectSecondReason}/>
            </div>
            }
        </div>
    ))
    return (
        <Radio.Group onChange={(e) => selectMainReason(e.target.value)}>
            <Space direction="vertical">
                {AbuseReasons}
            </Space>
        </Radio.Group>
    )
}

const SecondaryReasons: FC<SecondaryReasonsProps> = ({secondaryReasons, selectSecondReason}) => {
    function handleChange(value: string) {
        if (value === 'ChooseOne') selectSecondReason(null)
        else selectSecondReason(value)
    }

    const OptionsElements = secondaryReasons.map(({id, label}) => (
        <Option key={id} value={id}>
            {label}
        </Option>
    ))
    return (
        <Select defaultValue={'ChooseOne'} dropdownMatchSelectWidth={false} onChange={handleChange}>
            <Option value={'ChooseOne'}>Выберите вариант:</Option>
            {OptionsElements}
        </Select>
    )
}

const MoreInformationInput: FC<MoreInformationInputProps> = ({setComment}) => {

    const{openErrorNotification}=useErrorNotification({
        errorDescription:'Произошла ошибка'
    })

    return (
        <>
            <h4 className={m.comment} onClick={openErrorNotification}>
                Комментарий:
            </h4>
            <Input.TextArea autoSize={{minRows: 3, maxRows: 10}} placeholder='Опишите детали'
                            onChange={e => setComment(e.currentTarget.value)}/>
        </>
    )
}

type ModalWindowProps = {
    accessToken: string
    visibleModal: boolean
    setVisibleModal: (visibleModal: boolean) => void
}
type MainReasonsProps = {
    videoAbuseReasons: Array<VideoAbuseReportReason>
    selectedMainReason: string | null
    selectMainReason: (id: string | null) => void
    selectSecondReason: (id: string | null) => void
}
type SecondaryReasonsProps = {
    secondaryReasons: Array<{
        id: string
        label: string
    }>
    selectSecondReason: (id: string | null) => void
}
type MoreInformationInputProps = {
    setComment: (comment: string) => void
}

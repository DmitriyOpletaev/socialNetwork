import {BackTop, Button, Input} from "antd";
import m from './Video.module.scss'
import commonElem from '../Common_Elements.module.scss'
import React, {useEffect, useState} from "react";
import {SearchOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {
    getContentCategory,
    getIsLoading,
    getVideoCommentAnswers,
    getVideoCommentsSelector
} from "../redux/Selectors/Videos_Selector";
import {getMostPopularVideos, getVideosBySearch} from "../redux/Reducers/Video_Page_Reducers/Videos_Search_Reducer";
import {VideosContent} from "./Videos_Content";
import {YoutubeAPI} from "../api/Youtube_API";



export const VideoPage = () => {
    return (
        <div className={m.body_videos_page}>
            <div className={m.search_bar_wrapper}>
                <SearchBar/>
            </div>

            <div className={m.menu_and_content_wrapper}>
                <div className={m.content_wrapper}>
                    <VideosContent/>
                </div>
                <div className={m.menu_wrapper}>
                    <VideosPageMenu/>
                </div>
            </div>
            <BackTop>
                <div className={commonElem.Up_Button}>UP</div>
            </BackTop>
        </div>
    )
}

function SearchBar() {
    const dispatch = useDispatch()
    const isLoading = useSelector(getIsLoading)
    const [searchTerm, setSearchTerm] = useState('')
    const [term, setTerm] = useState(null as string | null)

    useEffect(() => {
        if (term) dispatch(getVideosBySearch(term, null, null))
    }, [term])


    return (
        <div className={m.input_button_container}>
            <Input value={searchTerm} onChange={e => setSearchTerm(e.currentTarget.value)} disabled={isLoading}
                   placeholder='Введите запрос'
            />
            <Button className={m.find_button} type='primary' icon={<SearchOutlined/>} loading={isLoading}
                    onClick={() => setTerm(searchTerm)}
            >
                Найти
            </Button>

        </div>
    )
}

function VideosPageMenu() {
    const dispatch = useDispatch()
    function getVideoTrends() {
        if(category!=='trends')dispatch(getMostPopularVideos())
    }

    //-----------TEst
const qwe = useSelector(getVideoCommentAnswers)
const qwer = useSelector(getVideoCommentsSelector)
function qwerty(){
        YoutubeAPI.getVideosById('Mgu1XAbtTx4')
        YoutubeAPI.getVideosById('617AIJttUj8')
    }
    const category = useSelector(getContentCategory)
    return (
        <div className={m.menu_container}>
            <div>Главная</div>
            <div>Навигатор</div>
            <div>Подписки</div>
            <div onClick={getVideoTrends} style={category==='trends'?{color:'red'}:{}}>В тренде</div>
            <div onClick={qwerty}>йцукен</div>


        </div>
    )
}




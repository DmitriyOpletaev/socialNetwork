import {Breadcrumb, Button, Input, Tooltip} from "antd";
import m from './Video.module.scss'
import React, {useEffect, useState} from "react";
import ReactPlayer from "react-player";
import {SearchOutlined, DownCircleOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {
    getError,
    getIsLoading,
    getPrevNextPageToken,
    getTotalResults,
    getVideosDetails
} from "../redux/Selectors/Videos_Selector";
import {setVideosBySearch} from "../redux/Reducers/Videos_Reducer";


export const VideoPage = () => {

    const [activePage, setActivePage] = useState<'MyVideos' | 'SearchVideosPage'>('SearchVideosPage')


    return (
        <div className={m.body}>

            <div>
                <Navigation activePage={activePage} setActivePage={setActivePage}/>
            </div>
            <div>
                {activePage === 'SearchVideosPage' && <SearchVideosPage/>}
                {activePage === 'MyVideos' && <MyVideos/>}
            </div>


        </div>
    )
}
type NavigationPropsType = {
    setActivePage: (activePage: 'MyVideos' | 'SearchVideosPage') => void
    activePage: 'MyVideos' | 'SearchVideosPage'
}
export const Navigation = ({setActivePage, activePage}: NavigationPropsType) => {


    return (
        <div className={m.navigation_wrapper}>

            <Breadcrumb.Item className={activePage === 'MyVideos' ? m.active_menu : m.menu_item}
                             onClick={() => setActivePage('MyVideos')}
            >
                My videos
            </Breadcrumb.Item>
            <Breadcrumb.Item className={activePage === 'SearchVideosPage' ? m.active_menu : m.menu_item}
                             onClick={() => setActivePage('SearchVideosPage')}
            >
                Search videos
            </Breadcrumb.Item>
        </div>
    )
}

export const SearchVideosPage = () => {

    const isLoading = useSelector(getIsLoading)
    const videoDetails = useSelector(getVideosDetails)
    const errorCode = useSelector(getError)
    const [termSearch, setTermSearch] = useState('')
    const [prevPageToken, setPrevPageToken] = useState(null as string | null)
    const [nextPageToken, setNextPageToken] = useState(null as string | null)
    const [pageNumber, setPageNumber] = useState(1)
    const pageToken = useSelector(getPrevNextPageToken)


    const MyVideosElements = videoDetails?.map((v) => <div className={m.video_container}>
        <ReactPlayer className={m.videosElement} width='100%' controls
                     url={`https://www.youtube.com/watch?v=${v.videoId}`}/>
        <div className={m.myVideos_details}>
            <div className={m.videoTitle}><h2>{v.title}</h2></div>
            <div className={m.channelTitle}><a
                href={`https://www.youtube.com/channel/${v.channelId}`}>{v.channelTitle}</a></div>
            <div className={m.descriptionVideo}>{v.description}</div>
            <div className={m.dateVideo}>{v.publishTime}</div>
        </div>
    </div>)


    const dispatch = useDispatch()

    useEffect(() => {
        if (termSearch.length > 0) {
            dispatch(setVideosBySearch(termSearch, prevPageToken, nextPageToken))
        }
    }, [termSearch, pageNumber])


    return (<>

        <SearchBar setTermSearch={setTermSearch} termSearch={termSearch} setPrevPageToken={setPrevPageToken}
                   setNextPageToken={setNextPageToken} isLoading={isLoading} pageNumber={pageNumber}
        />
        {errorCode &&
            <div style={{fontSize:'6em'}}>
                {errorCode}
            </div>
        }

        <div className={m.myVideos}>

            <div className={m.myVideos_videosWrapper}>
                {videoDetails && <>
                    {MyVideosElements}
                    <div className={m.moreVideosButton}>
                        <Tooltip title='more'>
                            <Button type="dashed" block loading={isLoading} icon={<DownCircleOutlined/>}
                                    onClick={() => {
                                        //setPrevPageToken(pageToken.prevPageToken)  ----------- на будущеее
                                        setNextPageToken(pageToken.nextPageToken)
                                        setPageNumber(pageNumber + 1)
                                    }}>
                                More
                            </Button>
                        </Tooltip>
                    </div>
                </>}

            </div>
            <div className={m.myVideos_menu}>
                <div>MenuItem</div>
                <div>MenuItem</div>
                <div>MenuItem</div>
                <div>MenuItem</div>
                <div>MenuItem</div>
            </div>

        </div>
    </>)
}
type SearchBarProps = {
    termSearch: string
    setTermSearch: (termSearch: string) => void
    setNextPageToken: (nextPageToken: string | null) => void
    setPrevPageToken: (prevPageToken: string | null) => void
    pageNumber: number
    isLoading: boolean
}
export const SearchBar = ({
                              termSearch,
                              setTermSearch,
                              setPrevPageToken,
                              isLoading,
                              setNextPageToken,
                              pageNumber
                          }: SearchBarProps) => {


    const totalResult = useSelector(getTotalResults)


    const [term, setTerm] = useState('')
    useEffect(() => {
        setTerm(termSearch)
    }, [termSearch])


    function findSearch() {
        setTermSearch(term)
        setPrevPageToken(null)
        setNextPageToken(null)
    }


    return (
        <div className={m.SearchBar}>
            <div className={m.SearchBar_InputContainer}>
                <Input placeholder='search' className={m.SearchBar_Input} value={term} disabled={isLoading}
                       onChange={(e) => {
                           setTerm(e.currentTarget.value)
                       }}
                       onPressEnter={findSearch}/>


                <Tooltip title='search'>
                    <Button type='primary' icon={<SearchOutlined/>} loading={isLoading}
                            onClick={findSearch}
                    >
                        Find
                    </Button>


                </Tooltip>
            </div>

            {totalResult && 'Total result: ' + totalResult}
            PAGE Number:{pageNumber}

        </div>
    )
}
export const MyVideos = () => {
    const MyVideosArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

    const MyVideosElements = MyVideosArray.map(m => <ReactPlayer key={m}
                                                                 controls url='https://youtu.be/MqWS6Sb5gYs'
    />)

    return (
        <div className={m.myVideos}>
            <div className={m.myVideos_videosWrapper}>
                <div>{MyVideosElements}</div>
                <div>details</div>

            </div>
            <div className={m.myVideos_menu}>
                <div>MenuItem</div>
                <div>MenuItem</div>
                <div>MenuItem</div>
                <div>MenuItem</div>
                <div>MenuItem</div>
            </div>

        </div>
    )
}

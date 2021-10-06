import {Button, notification, Tooltip} from "antd";
import m from './News.module.scss'
import {CloseCircleOutlined, SearchOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {getNewsBySearch, getTopHeadlinesNews} from "../redux/Reducers/News_Reducer";
import {getIsLoadingNews, getNews, getNewsErrors} from "../redux/Selectors/News_Selector";
import {RightCircleTwoTone,CloseCircleFilled,ExclamationCircleOutlined} from '@ant-design/icons';
import {Field, Form, Formik, FormikValues} from "formik";
import {useEffect, useState} from "react";
import {getThemeMode} from "../redux/Reducers/theme-reducer";


const News = () => {
    const theme = useSelector(getThemeMode)
    const news = useSelector(getNews)
    const errors = useSelector(getNewsErrors)

    const openNotification = (description: String) => {
        notification.info({
            message: <span style={{fontSize:'1.5em',fontWeight:'bolder',color:'red'}}>ERROR</span>,
            description: <span style={{fontSize:'1.2em',fontWeight:'bold'}}>{description}</span>,
            placement: 'bottomRight',
            icon:<span style={{color:'red', fontSize:'1.4em'}}><ExclamationCircleOutlined /></span>,
        });
    };
    useEffect(() => {
       errors.map((m,key)=>openNotification(m))
    }, [errors])

    let resultBlockNews = news.map(d => (<>
            <div className={`${m.search_result_block} ${theme==='dark' && m.dark_search_result_block}`}>
                <div className={m.title}><a href={d.url}>{d.title}</a></div>
                <div className={m.content}>
                    <div className={m.text}>
                        <div className={m.description}>
                            <p><a href={d.source.url}><RightCircleTwoTone/>{' ' + d.source.name}</a></p>
                            {d.description}
                            {d.content}
                            <div className={m.date}>
                                {d.publishedAt}
                            </div>
                        </div>

                    </div>
                    <div className={m.image}>
                        <img src={d.image}/>
                    </div>
                </div>


            </div>

        </>
    ))

    return (
        <>
            <SearchBarNews/>
            <div className={m.news_wrapper}>
                {resultBlockNews}
            </div>


        </>

    )
}


const SearchBarNews = () => {
    const dispatch = useDispatch()
    const theme = useSelector(getThemeMode)
    const isLoading = useSelector(getIsLoadingNews)
    const [topic, selectTopic] = useState('breaking-news')

    useEffect(() => {
        if (topic !== 'search') dispatch(getTopHeadlinesNews(topic))

    }, [topic])

    function onSubmit(values: FormikValues) {
        selectTopic('search')
        dispatch(getNewsBySearch(values))
    }

    function submitTopic(e: any) {
        selectTopic(e.currentTarget.name)
    }


    let initialValues = {
        searchTerm: '',
        lang: 'en',
        max: '10',
        country: 'all',
        sortby: 'relevance'
    }
    let topics = ['breaking-news', 'sports','business','science']
    let ButtonsTopic = topics.map(m=><Button name={m} disabled={isLoading} type={topic === m ? 'primary' : 'dashed'}
                                             onClick={submitTopic} >{m}</Button>)
    return (
        <>
            <div className={m.topic_news}>
                {ButtonsTopic}
            </div>

            <Formik
                onSubmit={onSubmit} initialValues={initialValues}


            >{({
                   values, handleChange,resetForm,handleReset
               }) => (
                <Form>
                    <div className={m.wrapper_Search}>
                        <div className={m.SearchBar_Block}>
                            <div className={m.search_button_wrapper}>
                                <Field className={m.SearchBar_Input} type={'text'} name={'searchTerm'}
                                       value={values.searchTerm}
                                       onChange={handleChange} onPressEnter={onSubmit}
                                />

                                <CloseCircleFilled className={m.Clear_Button} type='reset' onClick={()=>{resetForm()}}/>
                                <Tooltip title='search'>
                                    <Button className={m.Search_Button} type='primary' loading={isLoading}
                                            icon={<SearchOutlined/>}>
                                        Find
                                    </Button>
                                    <button className={m.buttonFormik} disabled={isLoading} type='submit'>
                                    </button>
                                </Tooltip>
                            </div>


                        </div>
                        <div className={`${m.details_search_container} ${theme==='dark'&&m.details_search_container_dark_mode}`}>
                            <div>
                                <label htmlFor={'lang'}>Язык</label>
                                <Field as={'select'} name={'lang'}>
                                    <option value="ru">русский</option>
                                    <option value="en">english</option>
                                    <option value="uk">українська</option>
                                </Field>
                            </div>
                            <div>
                                <label htmlFor={'max'}>Макс.кол.новостей</label>
                                <Field as={'select'} name={'max'}>
                                    <option value="1">1</option>
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                </Field>
                            </div>
                            <div>
                                <label htmlFor={'country'}>Страна</label>
                                <Field as={'select'} name={'country'}>
                                    <option value="all">Все</option>
                                    <option value="ua">Украина</option>
                                    <option value="us">США</option>
                                    <option value="ru">Россия</option>
                                </Field>
                            </div>

                            <div>
                                <label htmlFor={'sortby'}>Сортировать по</label>
                                <Field as={'select'} name={'sortby'}>
                                    <option value="relevance"> релевантности</option>
                                    <option value="publishedAt">дате публикации</option>
                                </Field>
                            </div>

                        </div>
                    </div>
                </Form>

            )}

            </Formik>
        </>

    )
}


export default News


/*const apikey = "AIzaSyCrvjt2TKWbbWwVDtRaoWoHtfUY3gr2IsY"

// lat and lng are float numbers not string
const lat =50.447968448664206
const lng = 30.5225565125408

const News = () => {
    const [map, setMap] = React.useState(null)
    return (
        <LoadScript id="script-loader" googleMapsApiKey={apikey}>
            <GoogleMap
                // set the state with the current instance of map.
                onLoad={map => {
                    setMap(map)
                }}
                mapContainerStyle={{
                    height: "400px",
                    width: "800px",
                }}
                zoom={16}
                center={{
                    lat: lat,
                    lng: lng,
                }}
                id="example-map"
                // here onZoomChanged we are accessing the current zoom value from our map
                //instance which is stored in the state
                onZoomChanged={() => {
                   // if(map)  console.log(map.getZoom())

                }}
            >
                ...Your map components
            </GoogleMap>
        </LoadScript>
    )
}*/


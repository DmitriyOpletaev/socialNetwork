import {useSelector} from "react-redux";
import React, {FC, useEffect, useState} from "react";
import m from "./Search_Bar.module.css";
import {SearchVideosSelector} from "../../redux/Selectors/Videos_Selector";
import Search from "antd/es/input/Search";
import {Popover, Select} from "antd";
import {Option} from "antd/es/mentions";
import {OrderVideoSearch, SearchType} from "../../api/Youtube_API/Videos_List";
import {useSearchVideos} from "../Video_Components/useSearchVideos";
import {ControlOutlined} from "@ant-design/icons";


export const VideoSearchBar = () => {
    const isLoading = useSelector(SearchVideosSelector.isLoading)
    const [searchTerm, setSearchTerm] = useState('')
    const {searchVideos, searchDetails,searchByTermDetails} = useSearchVideos()

    const [term, setTerm] = useState(searchByTermDetails.searchTerm)
    const [type, setType] = useState(searchByTermDetails.type)
    const [order, setOrder] = useState(searchByTermDetails.order)

    useEffect(() => {
        term && searchVideos(term, order, type)
    }, [term])
    useEffect(() => {
        term && searchDetails.categoryId === 'search' && searchVideos(term, order, type)
    }, [order, type])

    const SelectDetails =
        <div className={m.suffix_wrapper}>
            <div>
                <SelectTypeSearch typeSearch={type} setTypeSearch={setType} />
                <SelectOrderSearch currentTypeSearch={searchByTermDetails.type} order={order} setOrder={setOrder}/>
            </div>
        </div>
    const Suffix =
        <Popover content={SelectDetails} trigger={['click']} placement='bottom'>
            <ControlOutlined className={m.suffix_icon}/>
        </Popover>

    return (
        <div className={m.search_bar_wrapper}>
            <div className={m.input_button_container}>
                <Search placeholder="Введите запрос" loading={isLoading}
                        value={searchTerm} onChange={(e) => setSearchTerm(e.currentTarget.value)}
                        suffix={Suffix}
                        onSearch={() => setTerm(searchTerm)}
                />
            </div>
        </div>
    )
}

const SelectTypeSearch: FC<SelectTypeSearchProps> = ({typeSearch, setTypeSearch}) => {
    function handleChange(value: SearchType) {
        setTypeSearch(value)
    }
    const typeSorted:TypeSorted=[
        {value: 'all',text:'все'},
        {value: 'playlist',text:'плейлисты'},
        {value: 'video',text:'видео'},
        {value: 'channel',text:'каналы'},
    ]
    return (
        <div className={m.select_container}>
            <div>Искать:</div>
        <Select value={typeSearch} onChange={handleChange} dropdownMatchSelectWidth={false} className={m.select_block}>
            {typeSorted.map(({text,value})=>(
                <Option key={value} value={value} className={m.option_element}>
                    {text}
                </Option>
            ))}
        </Select>
        </div>
    )
}
const SelectOrderSearch: FC<SelectOrderSearchProps> = ({order, setOrder,currentTypeSearch}) => {

    function handleChange(value: OrderVideoSearch) {
        setOrder(value)
    }
    const orderSorted:OrderSorted=[
        {value: 'relevance',text:'релевантности',disabled:false},
        {value: 'date',text:'дате',disabled:false},
        {value: 'rating',text:'рейтигну',disabled:false},
        {value: 'viewCount',text:'количеству просмотров',disabled:false},
        {value: 'title',text:'названию',disabled:false},
        {value: 'videoCount',text:'количеству видео',disabled:currentTypeSearch!=='channel'},
    ]


    return (
        <div>
            <span>Сорт. по:</span>
        <Select value={order} onChange={handleChange} dropdownMatchSelectWidth={false} className={m.select_block}>
            {orderSorted.map(({text,value,disabled})=>(
                <Option key={value} disabled={disabled} value={value} className={m.option_element}>
                    {text}
                </Option>
            ))}
        </Select>
        </div>
            )
}


type SelectTypeSearchProps = {
    typeSearch: SearchType
    setTypeSearch: (typeSearch: SearchType) => void
}
type SelectOrderSearchProps = {
    currentTypeSearch: SearchType
    setOrder: (order: OrderVideoSearch) => void
    order:OrderVideoSearch
}
type OrderSorted =Array<{text:string,value:string,disabled:boolean}>
type TypeSorted=Array<{text:string,value:string}>

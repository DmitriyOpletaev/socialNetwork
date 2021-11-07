import React, {FC, useEffect} from "react";
import {useDispatch} from "react-redux";
import {getVideoComments} from "../../../redux/Reducers/Video_Page_Reducers/Current_Video_Reducer";
import {Button, Dropdown, Menu} from "antd";
import m from "../Modal_Window_Styles.module.scss";
import {SortAscendingOutlined} from "@ant-design/icons";

type CommentsSortedButtonProps={
    currentVideoId:string
    currentSorting:'relevance' | 'time'
    setCurrentSorting:( currentSorting:'relevance' | 'time')=>void
}
export const CommentsSortedButton:FC<CommentsSortedButtonProps>=(props)=>{
    const {currentVideoId, currentSorting,  setCurrentSorting} = props
    const dispatch  = useDispatch()
    useEffect(()=>{
        dispatch(getVideoComments(currentVideoId,null,currentSorting))
    },[currentSorting])
    const style ={
        color: 'blue'
    }
    const menu = (
        <Menu>
            <Menu.Item onClick={()=>setCurrentSorting('time')}>
                <span style={currentSorting=== 'time' ? style : {}}>
                    По дате
                </span>
            </Menu.Item>
            <Menu.Item onClick={()=>setCurrentSorting('relevance')}>
                <span style={currentSorting=== 'relevance' ? style : {}}>
                    По релевантности
                </span>
            </Menu.Item>
        </Menu>
    )
    return(
        <Dropdown overlay={menu} placement="bottomCenter" >
            <Button type='link' className={m.comments_sorted_Button} icon={<SortAscendingOutlined/>}>
                Упорядочить
            </Button>
        </Dropdown>
    )
}

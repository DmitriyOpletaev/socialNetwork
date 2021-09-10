import {useSelector} from "react-redux"
import React from "react"
import {Users} from "./Users"
import Preloader from "../common/preloader/preloader"
import {getIsFetching} from "../redux/Selectors/User_Selector"


export const UsersPage: React.FC<UsersPageProps> = (props) => {

    const isFetching = useSelector(getIsFetching)


    return <>
        {isFetching ? <Preloader/> : null}
        <Users/>
    </>

}

type UsersPageProps = {

}







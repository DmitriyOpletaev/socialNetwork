
import React from "react";
import 'antd/dist/antd.css';
import m from './Header.module.css'
import {useSelector} from "react-redux";
import {getIsAuth, getOwnLogin} from "../redux/Selectors/Auth_Selector";

type Props = {

}

export const MyHeader: React.FC<Props> = () => {
    const isAuth = useSelector(getIsAuth)
    const login = useSelector(getOwnLogin)

    return (
           <article className={m.header_wrapper}>


           </article>
    )
}




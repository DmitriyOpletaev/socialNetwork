import React from "react";
import {Spin} from "antd";

function Preloader() {
    const style = {
        textAlign: 'center',
        paddingTop: '12%',
    }
    return (
        <div style={style}>
            <Spin size="large" tip='Загрузка'/>
        </div>
    )
}

export default Preloader;
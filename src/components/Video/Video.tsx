import {Breadcrumb, Input} from "antd";
//import m from './Video.module.scss'


export const VideoPage = () => {


    return (<></>
       /* <div className={m.body}>

            <div>
                <Navigation/>
            </div>


        </div>*/
    )
}

export const Navigation = () => {
    return (
        <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>
                Application Center
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                Application List
            </Breadcrumb.Item>
            <Breadcrumb.Item>An Application</Breadcrumb.Item>
        </Breadcrumb>
    )
}

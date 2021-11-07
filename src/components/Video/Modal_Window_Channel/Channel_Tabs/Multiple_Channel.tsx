import {Button, Tooltip} from "antd";
import {FC} from "react";
import {MultipleChannelsSections} from "../../../../types/Videos_Types";
import m from './Channel_Tabs.module.scss'
import {countReformat2} from "../../../utils/validators/string_formatting";
import {useDispatch} from "react-redux";
import {getCurrentChannelInfo} from "../../../redux/Reducers/Video_Page_Reducers/Current_Channel_Reducer";
import {SubscribeChannelButton} from "../../Video_Components/Youtube_Subscribe_Button/YouTube_Subscribe_Button";

type MultipleChannelProps={
    multipleChannelsSection:Array<MultipleChannelsSections>
}


export const MultipleChannel:FC<MultipleChannelProps>=({multipleChannelsSection})=>{
    const dispatch = useDispatch()
    function openChannel(channelId:string){
        dispatch(getCurrentChannelInfo(channelId))
    }

    const channelSections = multipleChannelsSection.map(s=>(
        <div className={m.section_container}>
            <h2 className={m.section_title}>{s.title}</h2>
            <div className={m.channels_wrapper}>
                {s.channels.map(c=>(

                    <div className={m.channel_container}>
                        <div className={m.channel_logo_container}>
                            <Tooltip placement='rightTop' title={c.title}>
                                <img src={c.logo} alt={c.title} onClick={()=>openChannel(c.channelId)}/>
                            </Tooltip>
                        </div>
                        <div className={m.title}>
                            {c.title}
                        </div>
                        <div className={m.subscribers}>
                            {countReformat2(c.subscribersCount)} подписчиков
                        </div>
                        <div className={m.button_wrapper}>
                            <div className={m.button_container}>
                                <SubscribeChannelButton channelId={c.channelId} channelTitle={c.title}/>
                            </div>
                        </div>


                    </div>
                ))}
            </div>
        </div>
    ))

    return(
        <>
        {channelSections}
        </>
    )
}
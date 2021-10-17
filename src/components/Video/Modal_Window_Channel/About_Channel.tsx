import {useSelector} from "react-redux";
import {getCurrentChannelInfoSelector} from "../../redux/Selectors/Videos_Selector";
import { stringReformat} from "../../utils/validators/string_formatting";



export const AboutChannel=()=>{
    const {channelStatistics,description, countryISO,published} = useSelector(getCurrentChannelInfoSelector)
    const {hiddenSubscriberCount,subscriberCount,viewCount,videoCount}=channelStatistics
    const descriptionReformat = stringReformat(description)

    function countryReformat(countryISO:string){
        try{
            var iso3311a2 = require('./iso-3166-1-alpha-2')
            console.log(iso3311a2.getCountry("DE"))

        }
        catch (error){
            console.log(error)
        }
    }
    return(
        <div>
            <div>
                <h2>Описание:</h2>
                <div dangerouslySetInnerHTML={{__html:descriptionReformat}}/>
            </div>
            <div>
                <h2>Статистика:</h2>
                {!hiddenSubscriberCount &&
                <div>
                    Количество подписчиков: {subscriberCount}
                </div>
                }
                <div onClick={()=>{
                    countryReformat(countryISO)
                }}>
                    Страна: {countryISO}
                </div>
            </div>
        </div>

    )
}
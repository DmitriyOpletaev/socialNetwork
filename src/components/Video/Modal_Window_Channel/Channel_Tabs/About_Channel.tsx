import {useSelector} from "react-redux";
import {getCurrentChannelInfoSelector} from "../../../redux/Selectors/Videos_Selector";
import {
    countReformat1, countReformat2,
    countryISOReformat,
    stringReformat
} from "../../../utils/validators/string_formatting";




export const AboutChannel=()=>{
    const {channelStatistics,description, countryISO} = useSelector(getCurrentChannelInfoSelector)
    const {hiddenSubscriberCount,subscriberCount,viewCount,videoCount}=channelStatistics
    const descriptionReformat = stringReformat(description)
    const country = countryISO && countryISOReformat(countryISO)
    const views = countReformat1(viewCount)
    const subscribers = countReformat2(subscriberCount)

    return(
        <div>
            <div>
                {description.length>0 && <>
                <h2>Описание:</h2>
                <div dangerouslySetInnerHTML={{__html:descriptionReformat}}/>
                </>}
            </div>
            <div>
                <h2>Статистика:</h2>
                {hiddenSubscriberCount &&
                <div>
                    Количество подписчиков: {subscribers}
                </div>
                }
                {countryISO &&
                <div>
                    Страна: {country}
                </div>
                }
                <div>
                    Дата регистрации: {}
                </div>
                <div>
                    Количество просмотров: {views}
                </div>
                <div>
                    Количество видео: {videoCount}
                </div>

            </div>
        </div>

    )
}

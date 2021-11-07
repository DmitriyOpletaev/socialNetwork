import {useSelector} from "react-redux";
import {getMainPagePlaylistsSelector, getMultipleChannelsSelector} from "../../../redux/Selectors/Videos_Selector";
import {MultipleChannel} from "./Multiple_Channel";
import { PlaylistsBlock } from "./Playlists_Blocks";





export const ChannelMainPage = () => {

    const multipleChannelsSection = useSelector(getMultipleChannelsSelector)
    const playlists = useSelector(getMainPagePlaylistsSelector)
    return (
        <div>
            <PlaylistsBlock playlists={playlists}/>
            <MultipleChannel multipleChannelsSection={multipleChannelsSection}/>
        </div>
    )
}

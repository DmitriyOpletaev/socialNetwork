import {Button, Input, Tooltip} from "antd";
import {MusicAPI} from "../api/Music_API";
import {SearchOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import ReactPlayer from "react-player";
import soundcloud from "react-player/soundcloud";
import ReactAudioPlayer from "react-audio-player";
import {useDispatch, useSelector} from "react-redux";
import {getSongsBySearch} from "../redux/Reducers/Music_Reducer";
import {getErrorMusic, getIsLoading, getPlaylist} from "../redux/Selectors/Music_Selector";


export const MusicPage = () => {
    const playlist = useSelector(getPlaylist)
    const error = useSelector(getErrorMusic)
    const isLoading = useSelector(getIsLoading)
    const [searchTerm, setSearchTerm] = useState('')
    const [term, setTerm] = useState(null as string | null)
    const dispatch = useDispatch()
    debugger
    useEffect(() => {
        if (term && term.length>2) dispatch(getSongsBySearch(term))
    }, [term])
    const SongType = [
        {
            id: 1,
            title_short: 'songtitle',
            link: "https://cdns-preview-1.dzcdn.net/stream/c-13039fed16a173733f227b0bec631034-12.mp3",
            preview: 'Bla prewiew',
            artist: {
                name: 'Eminem',
                picture_big: 'pic',
                tracklist: 'tarcklist',
                album: {
                    title: 'title',
                    cover_big: 'coverBig',
                    tracklist: 'trackl',
                }
            }
        }, {
            id: 1,
            title_short: 'songtitle',
            link: "https://cdns-preview-1.dzcdn.net/stream/c-13039fed16a173733f227b0bec631034-12.mp3",
            preview: 'Bla prewiew',
            artist: {
                name: 'Eminem',
                picture_big: 'pic',
                tracklist: 'tarcklist',
                album: {
                    title: 'title',
                    cover_big: 'coverBig',
                    tracklist: 'trackl',
                }
            }
        }, {
            id: 1,
            title_short: 'songtitle',
            link: "https://cdns-preview-1.dzcdn.net/stream/c-13039fed16a173733f227b0bec631034-12.mp3",
            preview: 'Bla prewiew',
            artist: {
                name: 'Eminem',
                picture_big: 'pic',
                tracklist: 'tarcklist',
                album: {
                    title: 'title',
                    cover_big: 'coverBig',
                    tracklist: 'trackl',
                }
            }
        }, {
            id: 1,
            title_short: 'songtitle',
            link: "https://cdns-preview-1.dzcdn.net/stream/c-13039fed16a173733f227b0bec631034-12.mp3",
            preview: 'Bla prewiew',
            artist: {
                name: 'Eminem',
                picture_big: 'pic',
                tracklist: 'tarcklist',
                album: {
                    title: 'title',
                    cover_big: 'coverBig',
                    tracklist: 'trackl',
                }
            }
        }, {
            id: 1,
            title_short: 'songtitle',
            link: "https://cdns-preview-1.dzcdn.net/stream/c-13039fed16a173733f227b0bec631034-12.mp3",
            preview: 'Bla prewiew',
            artist: {
                name: 'Eminem',
                picture_big: 'pic',
                tracklist: 'tarcklist',
                album: {
                    title: 'title',
                    cover_big: 'coverBig',
                    tracklist: 'trackl',
                }
            }
        }, {
            id: 1,
            title_short: 'songtitle',
            link: "https://cdns-preview-1.dzcdn.net/stream/c-13039fed16a173733f227b0bec631034-12.mp3",
            preview: 'Bla prewiew',
            artist: {
                name: 'Eminem',
                picture_big: 'pic',
                tracklist: 'tarcklist',
                album: {
                    title: 'title',
                    cover_big: 'coverBig',
                    tracklist: 'trackl',
                }
            }
        }, {
            id: 1,
            title_short: 'songtitle',
            link: "https://cdns-preview-1.dzcdn.net/stream/c-13039fed16a173733f227b0bec631034-12.mp3",
            preview: 'Bla prewiew',
            artist: {
                name: 'Eminem',
                picture_big: 'pic',
                tracklist: 'tarcklist',
                album: {
                    title: 'title',
                    cover_big: 'coverBig',
                    tracklist: 'trackl',
                }
            }
        },
        ]
    const array = [1,2,3,4,5]


    const Playlist = playlist.map(m => <div key={m.id}>
        {m.title_short}
        </div>
    )

    return (
        <div>
            <Input style={{width: '500px'}} value={searchTerm} onChange={e => setSearchTerm(e.currentTarget.value)}/>
            <Tooltip title='search'>
                <Button type='primary' icon={<SearchOutlined/>} loading={isLoading} onClick={() => setTerm(searchTerm)}>
                    Search
                </Button>
            </Tooltip>
            <div>
                {Playlist}
                {error}
            </div>

        </div>
    )
}

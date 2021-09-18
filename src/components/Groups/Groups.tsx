import styles from './Griops.module.css'
import {Button, Input} from "antd";
import React, {useEffect, useState} from "react";
import ReactPlayer from "react-player";

/*'apiKey': 'AIzaSyBey2mu4mayQvY4yJYoAEc2cFT_PzIKzd4',
             'clientId': '205239420469-a77bsbiec4k1mpu3lb4nfl05krmm6262.apps.googleusercontent.com',*/

type MyType = {}
const Groups = () => {

    const [items, setData] = useState<any[]>([])
    const [click, setClick] = useState(false)

    const YOUTUBE_PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/playlistItems';
    const YOUTUBE_API_KEY = 'AIzaSyBey2mu4mayQvY4yJYoAEc2cFT_PzIKzd4'

    async function getServerSideProps() {
        const res = await fetch(`${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&maxResults=5&playlistId=PLFsfg2xP7cbLuAglQob6zjS4nVbyAfSVV&key=AIzaSyBey2mu4mayQvY4yJYoAEc2cFT_PzIKzd4`)
        const data = await res.json();
        console.log(data)
        setData(data.items)
        setClick(true)
    }


    const [itemsSearch, setVideoSearhResultItems] = useState<any[]>([])
    const [click2, setClick2] = useState(false)
    const YOUTUBE_VIDEOS_ITEMS_API = 'https://www.googleapis.com/youtube/v3/search'
    const [term, setTerm] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [NextPageToken, setNextPageToken] = useState('')
    const [PrevPageToken, setPrevPageToken] = useState('')
    const [clickNext, setClickNext] = useState(false)
    const [clickPrev, setClickPrev] = useState(false)
    let PAGE_NEXT_TOKEN = NextPageToken
    let PAGE_PREV_TOKEN = PrevPageToken
    const[page,setPage] = useState(1)

    useEffect(() => {
        async function getVideos() {

            const res = await fetch(
                `${YOUTUBE_VIDEOS_ITEMS_API}?part=snippet&maxResults=5&pageToken=${
                    clickNext?PAGE_NEXT_TOKEN:clickPrev?PAGE_PREV_TOKEN:''
                }&type=video&q=${searchTerm}&key=${YOUTUBE_API_KEY}`
            )
            const data = await res.json();
            setVideoSearhResultItems(data.items)
            setClick2(true)

            setNextPageToken(data.nextPageToken)
            if(data.prevPageToken)setPrevPageToken(data.prevPageToken)
            setClickNext(false)
            setClickPrev(false)
        }
        if(searchTerm.length>1)getVideos()



    }, [searchTerm, page])


    //  let refVideo = `https://www.youtube.com/watch?v=${items[0].snippet.resourceId.videoId}`
    return (
        <div>

            {/*<Button onClick={getServerSideProps}>playlist</Button>
            {click ?
                <div>
                    {items.map(m => <ReactPlayer controls
                                                 url={`https://www.youtube.com/watch?v=${m.snippet.resourceId.videoId}`}/>)}
                    <a href={`https://www.youtube.com/watch?v=${items[0].snippet.resourceId.videoId}`}>
                        SSilka
                    </a>
                </div>

                : <div>
                    Nothing
                </div>}*/}

            <Input value={term} onChange={(e) => {
                setTerm(e.currentTarget.value)
            }}/>

            <div style={{margin: '2em'}}>
                <Button type='primary' size='large' style={{marginLeft: '5em'}}
                        onClick={() => {
                            setSearchTerm(term)
                            setClick2(true)

                        }}>

                    Search
                </Button>
                <Button type='primary' size='large' style={{marginLeft: '5em'}}
                        onClick={()=>{
                            setClickPrev(true)
                            setPage((prev)=>prev-1)
                        }}
                >
                    Prev
                </Button>
                <Button type='primary' size='large' style={{marginLeft: '5em'}}
                        onClick={()=>{
                            setClickNext(true)
                            setPage((prev)=>prev+1)
                        }}
                >
                    Next
                </Button>
            </div>
            {itemsSearch.length>1 ?
                <div>
                    {
                        itemsSearch.map(m => <div>

                            <ReactPlayer controls
                                         url={`https://www.youtube.com/watch?v=${m.id.videoId}`}/>

                        </div>)
                    }
                </div>
                : <></>
            }


        </div>

    )

}

export default Groups
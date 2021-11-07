import {useCallback} from "react"
import {
    getUsersVideos,
    getVideosByCategory, getVideosBySearch, searchUserVideos,
} from "../../redux/Reducers/Video_Page_Reducers/Videos_Search_Reducer"
import {useDispatch, useSelector} from "react-redux"
import {SearchVideosSelector} from "../../redux/Selectors/Videos_Selector"
import {getAccessToken} from "../../redux/Reducers/Auth-Reducer"
import {OrderVideoSearch, SearchType} from "../../api/Youtube_API/Videos_List"


export function useSearchVideos() {
    const dispatch = useDispatch()
    const accessToken = useSelector(getAccessToken)
    const searchDetails = useSelector(SearchVideosSelector.searchDetails)
    const searchByTermDetails = useSelector(SearchVideosSelector.searchByTermDetails)

    const searchVideos = useCallback((
        term: string, order: OrderVideoSearch, type: SearchType
    ) => {
        dispatch(getVideosBySearch(term, null, order, type))
    }, [dispatch])

    const searchCategory = useCallback((
        categoryId: MenuCategories
    )=>{
            if(categoryId === 'likesVideos'||categoryId==='dislikesVideos' ){
                accessToken && dispatch(getUsersVideos(categoryId,accessToken))
            }
            else if(categoryId==='userVideos'){
               accessToken && dispatch(searchUserVideos(accessToken))
            }
            else{
                dispatch(getVideosByCategory(categoryId))
            }
    },[accessToken])

    const nextPage = useCallback(() => {
        const {categoryId, nextPageToken} = searchDetails
        const {searchTerm, type, order} = searchByTermDetails
        if (categoryId === 'search') {
            dispatch(getVideosBySearch(searchTerm, nextPageToken, order, type))
        } else if (categoryId === 'dislikesVideos'||categoryId==='likesVideos') {
            accessToken && dispatch(getUsersVideos(categoryId, accessToken, nextPageToken))
        }else if(categoryId=== 'userVideos'){
            accessToken && dispatch(searchUserVideos(accessToken,nextPageToken))
        }
        else {
            categoryId && dispatch(getVideosByCategory(categoryId, nextPageToken))
        }
    }, [dispatch,searchByTermDetails,searchDetails,accessToken])


    return {
        searchCategory,
        searchVideos,
        searchDetails,
        searchByTermDetails,
        nextPage
    }
}


export type MenuCategories ="trends" | "1" | "10" | "17" | "20" | "23" | "25"|"likesVideos" | "dislikesVideos" | "userVideos"
import {AppStateType} from "../redux-store";


export function getTotalArticlesNews(state:AppStateType){
    return state.news.totalArticles
}
export function getNews(state:AppStateType){
    return state.news.news
}
export function getIsLoadingNews(state:AppStateType){
    return state.news.isLoading
}
export function getNewsErrors(state:AppStateType){
    return state.news.errors
}

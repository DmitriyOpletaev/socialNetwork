import {BaseThunkType, InferActionsTypes} from "../redux-store";
import {GoogleNewsAPI} from "../../api/News_API";
import {FormikValues} from "formik";


type ArticlesType = {
    title: string
    description: string
    content: string
    image: string
    url: string
    publishedAt: string
    source: SourceType

}
type SourceType = {
    name: string
    url: string
}

type InitialState = typeof initialState
type Actions = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<Actions>

let initialState = {
    news: [] as Array<ArticlesType>,
    totalArticles: 0,
    isLoading: false,
    errors: [] as Array<string>
}

export const newsReducer = (state = initialState, action: Actions): InitialState => {
    switch (action.type) {

        case 'googleNews/SET_NEWS' :

            return {
                ...state,
                totalArticles: action.payload.totalArticles,
                news: action.payload.news


            }
        case 'googleNews/SET_IS_LOADING' :

            return {
                ...state,
                isLoading: action.payload.isLoading


            }
        case 'googleNews/SET_ERRORS':
            return {
                ...state,
                errors: action.payload.errors
            }


        default:
            return state
    }
}


const actions = {
    setNews: (news: Array<ArticlesType>, totalArticles: number) => ({
        type: 'googleNews/SET_NEWS',
        payload: {news, totalArticles}
    } as const),
    setIsLoadingNews: (isLoading: boolean) => ({
        type: 'googleNews/SET_IS_LOADING',
        payload: {isLoading}
    } as const),
    setErrors: (errors: Array<string>)=>({
    type: 'googleNews/SET_ERRORS', payload: {errors}
} as const)

}


export const getNewsBySearch = (values: FormikValues): ThunkType => async (dispatch) => {
    dispatch(actions.setIsLoadingNews(true))
    let response = await GoogleNewsAPI.getNewsBySearch(values)
    if (response.errors) {
        dispatch(actions.setErrors(response.errors))
    } else {
        dispatch(actions.setNews(response.articles, response.totalArticles))
    }

    dispatch(actions.setIsLoadingNews(false))
}
export const getTopHeadlinesNews = (topic: string): ThunkType => async (dispatch) => {

    dispatch(actions.setIsLoadingNews(true))
    let response = await GoogleNewsAPI.getTopHeadLinesNews(topic)
    if (response.errors) {
        dispatch(actions.setErrors(response.errors))
    } else {
        dispatch(actions.setNews(response.articles, response.totalArticles))
    }

    dispatch(actions.setIsLoadingNews(false))

}


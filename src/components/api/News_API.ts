import {FormikValues} from "formik";


const _NEWS_API_KEY = '7bcdc8d2becf4285ab5ccfa469bcdc21'
const baseUrl = 'https://gnews.io/api/v4/'

export const GoogleNewsAPI = {

    getNewsBySearch(values: FormikValues) {
        let {searchTerm, lang, country, max, sortby} = values
        return fetch(
            baseUrl + `search?&token=${_NEWS_API_KEY}&q=${searchTerm}&lang=${lang}&country=${country}&max=${max}&sortby=${sortby}`
        ).then(
            response => {
                return response.json()
            }
        )
    },

    getTopHeadLinesNews(topic: string) {
        return fetch(
            baseUrl + `top-headlines?token=${_NEWS_API_KEY}&topic=${topic}&lang=ru`
        ).then(
            response => {
                return response.json()
            }
        )
    }
}
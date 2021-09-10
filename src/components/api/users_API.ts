import {PhotosType} from "../../types/types"
import {GetItems, instance, Response} from "./API"


type Users = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}
export const usersAPI = {

    getUsers(currentPage = 1, pageSize = 10, term:string='',friend:null|boolean=null) {

        return instance.get<GetItems<Array<Users>>>(
            `users?page=${currentPage}&count=${pageSize}&term=${term}`+(friend===null ? '' : `&friend=${friend}`),
        ).then(response => {
            return response.data
        })
    },

    follow(userId: number) {
        return instance.post<Response>(`follow/${userId}`).then(res => res.data) as Promise<Response>

    },

    unfollow(userId: number) {
        return instance.delete<Response>(`follow/${userId}`).then(res => res.data) as Promise<Response>

    },
}
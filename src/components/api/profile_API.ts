import {ContactsType, PhotosType, ProfileType} from "../../types/types";
import {instance, Response, ResultCodeEnum} from "./API";


type SavePhotoResponse = {
    photos: PhotosType
}

export const profileAPI = {

    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/` + userId).then(res => res.data)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/` + userId)
    },
    updateStatus(status: string) {
        return instance.put<Response>(`profile/status/`, {status: status}).then(res => res.data)   //если повторяется можно написать просто {status} вместо {status:status}
    },
    updateUserDetails(userDetails: any) {
        debugger
        return instance.put<Response>(`profile/`, userDetails).then(res => res.data)   //если повторяется можно написать просто {status} вместо {status:status}

    },
    savePhoto(photoFile: any) {
        let formData = new FormData();
        formData.append("image", photoFile)
        return instance.put<Response<SavePhotoResponse>>(`profile/photo`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(res => res.data);
    }
}
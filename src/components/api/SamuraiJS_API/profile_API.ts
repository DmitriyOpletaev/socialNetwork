import {ContactsType, PhotosType, ProfileType} from "../../../types/types";
import {instanceSamuraiJS, Response, ResultCodeEnum} from "./API";


type SavePhotoResponse = {
    photos: PhotosType
}

export const profileAPI = {

    getProfile(userId: number) {
        return instanceSamuraiJS.get<ProfileType>(`profile/` + userId).then(res => res.data)
    },
    getStatus(userId: number) {
        return instanceSamuraiJS.get<string>(`profile/status/` + userId)
    },
    updateStatus(status: string) {
        return instanceSamuraiJS.put<Response>(`profile/status/`, {status: status}).then(res => res.data)   //если повторяется можно написать просто {status} вместо {status:status}
    },
    updateUserDetails(userDetails: any) {
        debugger
        return instanceSamuraiJS.put<Response>(`profile/`, userDetails).then(res => res.data)   //если повторяется можно написать просто {status} вместо {status:status}

    },
    savePhoto(photoFile: any) {
        let formData = new FormData();
        formData.append("image", photoFile)
        return instanceSamuraiJS.put<Response<SavePhotoResponse>>(`profile/photo`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(res => res.data);
    }
}
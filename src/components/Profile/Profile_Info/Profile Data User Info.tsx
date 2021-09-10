import pI from "./Profile_info.module.css";
import React from "react";
import {ProfileType} from "../../../types/types";


type PropsType={

    lookingForAJobDescription:string
}

export const ProfileDataForm:React.FC<PropsType>=({lookingForAJobDescription})=> {
    return(
        <div>

            <div className={pI.about_me_container}>
                <span>About me: </span>
                <div>
                    <button  className={pI.editButton}>
                        ok
                    </button>
                </div>
            </div>

            <div className={pI.looking_for_a_job_container}>
                <span>Looking for a job:</span>
                {lookingForAJobDescription}
            </div>
        </div>)
}







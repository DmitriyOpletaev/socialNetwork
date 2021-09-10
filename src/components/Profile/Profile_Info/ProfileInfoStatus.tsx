import React, {ChangeEvent, useEffect, useState} from "react";
import pI from "./Profile_info.module.css";



type PropsType={
    status:string
    updateUserStatus:(status:string)=>void
}


let ProfileInfoStatus:React.FC<PropsType>=(props)=> {


    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(()=>{
        setStatus(props.status)
    },[props.status])


    function activateEditMode() {
        setEditMode(true)
    }

    function deActivateEditMode() {
        setEditMode(false)
        props.updateUserStatus(status)
    }

    function onStatusChange(e:ChangeEvent<HTMLInputElement>) {
        setStatus(e.currentTarget.value)
    }



    return (
        <div>
            {!editMode &&
            <div>
                <span onDoubleClick={activateEditMode}>
                    {!props.status
                        ? <span className={pI.null_Status}>кликните дважды чтобы изменить статус</span>
                        : <span className={pI.Status}>{props.status}</span>
                    }</span>
            </div>
            }

            {editMode &&
            <div>
                <input className={pI.Input_Status} placeholder={'Введите ваш статус'}
                       autoFocus={true} value={status} onChange={onStatusChange}
                       onBlur={deActivateEditMode}
                />
                <button onClick={deActivateEditMode}>ok</button>
            </div>

            }
        </div>
    )


}

export default ProfileInfoStatus
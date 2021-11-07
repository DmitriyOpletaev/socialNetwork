// noinspection SpellCheckingInspection

import {notification} from "antd";
import {PlayCircleOutlined} from "@ant-design/icons";
import {useCallback} from "react";


interface ErrorsParametrs{
    errorDescription:string
}

export function useErrorNotification(errorsParametrs:ErrorsParametrs) {

    const openErrorNotification = useCallback(() => {
        debugger
            notification.open({
                message: 'Произошла ошибка',
                description:errorsParametrs.errorDescription,
                className: 'custom-class',
                style: {
                    width: 600,
                },
                icon: <PlayCircleOutlined/>
            })
        }
    ,[errorsParametrs])

    return {openErrorNotification}
}
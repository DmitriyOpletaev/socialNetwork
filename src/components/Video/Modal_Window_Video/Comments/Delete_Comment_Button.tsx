import {CloseOutlined} from "@ant-design/icons";
import {FC} from "react";
import m from "../Modal_Window_Styles.module.scss"
import {Popconfirm} from "antd";
import {useDispatch} from "react-redux";
import {deleteComment} from "../../../redux/Reducers/Video_Page_Reducers/Current_Video_Reducer";
import {useVideo} from "../../Video_Components/useVideo";

export const DeleteCommentButton: FC<DeleteCommentButtonProps> = ({commentId}) => {
    const dispatch = useDispatch()
    const {accessToken} = useVideo()
    function deleteUserComment() {
        if (accessToken) {
            dispatch(deleteComment(commentId, accessToken))
            alert(accessToken)
        }
    }
    const okButtonProps = {
        onClick: () => accessToken && dispatch(deleteComment(commentId, accessToken)),
        loading: false
    }
    return (
        <div className={m.delete_comment_button}>
            <Popconfirm title={<span>Удалить комментарий?</span>}
                        okText='Удалить'
                        cancelText='Отмена'
                        okButtonProps={okButtonProps}
            >
                <CloseOutlined/>
            </Popconfirm>
        </div>

    )
}


type DeleteCommentButtonProps = {
    commentId: string
}
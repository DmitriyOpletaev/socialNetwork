import {actions, PostDataType} from "../../redux/Reducers/myPosts-reducer";
import MyPosts from "./MyPosts";

import React, {ComponentType} from "react";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";



let mapStateToProps = (state:AppStateType) => {

    const {postData, newPostText} = state.profileInfo;
    return {
        postData: postData,
        newPostText: newPostText
    }
}
let MyPostsContainer:React.FC<Props>=(props)=>{



    return <MyPosts postData={props.postData} newPostText={props.newPostText} addPost={props.addPost} updateNewPostText={props.updateNewPostText}/>


}
let mapDispatchToProps=()=>{
    return{
        updateNewPostText:actions.updateNewPostTextActionCreator,
        addPost: actions.addPostActionCreator
    }
}


export default  connect<MapStateToPropsType, MapDispatchToProps, {  }, AppStateType>(mapStateToProps, mapDispatchToProps
)(MyPostsContainer);




type MapStateToPropsType = {
    newPostText: string
    postData: Array<PostDataType>
}
type MapDispatchToProps={
    updateNewPostText:(text:string)=>void
    addPost:()=>void
}

type Props=MapStateToPropsType&MapDispatchToProps




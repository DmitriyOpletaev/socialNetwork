import m from './MyPosts.module.css';
import {NavLink, Route} from "react-router-dom";
import React from "react";


type Props={
    postData:Array<{
        id: number
        text:string
        name: string
    }>
    newPostText:string
    addPost: ()=>void
    updateNewPostText:(text:string)=>void
}

let PostText:React.FC<{id:number,text:string}> = ({id, text}) => {
    let path = "/profile/post" + id;
    return (

        <Route path={path}>{text}</Route>
    )
}


let PostItem:React.FC<{id:number, name:string}> = ({id,name}) => {
    let path = "/profile/post" + id;
    return (
        <div className={m.PostName}>
            <NavLink className={m.linkNamePost} activeClassName={m.active} to={path}>{name}</NavLink>
        </div>
    )
}

type TextType={
    text:string
}
let MyPosts:React.FC<Props> = props => {

    let postNameElements = props.postData.map(pN => <PostItem id={pN.id} name={pN.name}/>);
    let postTextElements = props.postData.map(pT => <PostText id={pT.id} text={pT.text}/>);

    let newPostElement= React.createRef<HTMLTextAreaElement>();








    return (
        <div className={m.PostsContainer}>
            <div className={m.PostsNamesContainer}>
                {postNameElements}
            </div>
            <div className={m.PostsText}>
                <div>
                    <textarea
                        cols={30} rows={10} className={m.input}
                        ref={newPostElement}
                        value={props.newPostText}
                        />


                    <button className={m.button} >Add post</button>
                </div>
                {postTextElements}
            </div>

        </div>
    )
}

export default MyPosts;


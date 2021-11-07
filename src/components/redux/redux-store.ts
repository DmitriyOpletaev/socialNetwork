import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import myPostsReducer from "./Reducers/myPosts-reducer";
import messagesReducer from "./Reducers/messages-reduser";
import usersReducer from "./Reducers/users-reducer";
import profileReducer from "./Reducers/profile-reducer";
import authReducer from "./Reducers/auth_reducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import appReducer from "./Reducers/app-reducer";
import chatReducer from "./Reducers/Chat_reducer";
import videosSearchReducer from "./Reducers/Video_Page_Reducers/Videos_Search_Reducer"
import {newsReducer} from "./Reducers/News_Reducer";
import {musicReducer} from "./Reducers/Music_Reducer";
import themeReducer from "./Reducers/theme-reducer";
import {mySongsReducer} from "./Reducers/MySongs_Reducer";
import {audioPlayer} from "./Reducers/Audio_Player_Reducer";
import mainAuthReducer from "./Reducers/Auth-Reducer";
import currentVideoReducer from "./Reducers/Video_Page_Reducers/Current_Video_Reducer";
import {
    currentChannelReducer,
} from "./Reducers/Video_Page_Reducers/Current_Channel_Reducer";
import videoMainReducer from "./Reducers/Video_Page_Reducers/videoMainReducer";




let rootReducer = combineReducers({
    profileInfo: myPostsReducer,
    dialogsInfo: messagesReducer,
    usersPage: usersReducer,
    profilePage: profileReducer,
    auth: authReducer,
    app: appReducer,
    chat: chatReducer,
    videosSearch: videosSearchReducer,
    currentVideo: currentVideoReducer,
    news: newsReducer,
    music: musicReducer,
    theme: themeReducer,
    mySongs: mySongsReducer,
    audioPlayer: audioPlayer,
    mainAuthReducer: mainAuthReducer,
    currentChannel:currentChannelReducer,
    videoMainReducer: videoMainReducer

});

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

export type InferActionsTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>



// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({trace:true,traceLimit:25}) || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;
import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import myPostsReducer from "./Reducers/myPosts-reducer";
import messagesReducer from "./Reducers/messages-reduser";
import usersReducer from "./Reducers/users-reducer";
import profileReducer from "./Reducers/profile-reducer";
import authReducer from "./Reducers/auth_reducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import appReducer from "./Reducers/app-reducer";
import chatReducer from "./Reducers/Chat_reducer";



let rootReducer = combineReducers({
    profileInfo: myPostsReducer,
    dialogsInfo: messagesReducer,
    usersPage : usersReducer,
    profilePage : profileReducer,
    auth: authReducer,
    app: appReducer,
    chat: chatReducer,

});

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>


//type PropertiesTypes<T> = T extends {[key:string]: infer U} ? U:never
//export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesTypes<T>>
export type InferActionsTypes<T> = T extends { [key: string]: (...args: any[]) => infer U }? U:never

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

/*let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));*/

/*window.store = store;*/

export default store;
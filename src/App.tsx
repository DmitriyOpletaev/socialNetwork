import m from './App.module.scss'
import React, {Component, Suspense, useEffect,} from "react"
import {BrowserRouter, Route, Switch, withRouter,} from "react-router-dom"
import {connect, Provider, useDispatch, useSelector} from "react-redux"
import {getInitialized, initializeApp} from "./components/redux/Reducers/app-reducer"
import Preloader from "./components/common/preloader/preloader"
import {compose} from "redux"
import store, {AppStateType} from "./components/redux/redux-store"
import 'antd/dist/antd.css';
import {Alert, Layout, Spin} from 'antd';
import {UsersPage} from "./components/Users/UsersContainer";
import Groups from "./components/Groups/Groups";
import News from "./components/News/News";
import Homepage from "./components/Homepage/Homepage";
import Nav from "./components/Nav/Nav";
import {MyHeader} from "./components/Header/Header";
import {PhotosPage} from "./components/Photos/PhotosPage";
import {PraktikaPage} from "./components/praktika/praktika";
import ChatPage from "./components/Dialogs/ChatPage";
import {VideoPage} from "./components/Video/Video";
import {Profile} from "./components/ProfileNew/Profile";
import {getThemeMode} from "./components/redux/Reducers/theme-reducer";
import {AudioPlayer} from "./components/Video/Audio_Player/AudioPlayer";
const LoginPage = React.lazy(() => import("./components/LoginPage/LoginPage"))
const MusicPage = React.lazy(() => import("./components/Music/Music_Page"))



const {Sider, Content} = Layout;


function Loading() {
    return (

        <Spin size='large' tip="Loading...">
            <Alert
                message="Alert message title"
                description="Further details about the context of this alert."
                type="info"
            />
        </Spin>
    )
}


const App = () => {
    const dispatch = useDispatch()
    const initialized = useSelector(getInitialized)
    const theme = useSelector(getThemeMode)
    useEffect(() => {
        dispatch(initializeApp())
    }, [])




    if (!initialized) {
        return (<Preloader/>)
    }
    return (
        <Layout>
            <AudioPlayer/>
            <Sider theme={theme} className={m.slider_menu}
                   style={{
                       overflow: 'auto',
                       height: '94vh',
                       position: 'fixed',
                       left: 0,
                       top:'6vh'
                   }}
            >

                <Nav/>

            </Sider>
            <Layout className={m.header_content_wrapper} >
                <div className={theme==='dark'?m.header_wrapper_dark:m.header_wrapper_light} >
                    <MyHeader/>
                </div>


                <div>
                    <Content>
                        <div className={theme==='dark' ? m.content_wrapper_dark_mode : m.content_wrapper_light_mode}>
                            <Suspense fallback={<Loading/>}>
                                <Switch>
                                    <Route exact path='/homepage' render={() => <Homepage/>}/>
                                    <Route path='/profile/:userId?' render={() => <Profile/>}/>
                                    <Route path='/photos' render={() => <PhotosPage/>}/>
                                    <Route path='/videos' render={() => <VideoPage/>}/>
                                    <Route path='/users' render={() => <UsersPage/>}/>
                                    <Route path='/chat' render={() => <ChatPage/>}/>
                                    <Route path='/music' render={() => <MusicPage/>}/>
                                    <Route path='/login/facebook' render={() => <div>Facebook</div>}/>
                                    <Route path='/login' render={() => <LoginPage/>}/>
                                    <Route path='/groups' render={() => <Groups/>}/>
                                    <Route path='/news' render={() => <News/>}/>
                                    <Route path='/praktika/' render={() => <PraktikaPage/>}/>
                                    <Route path='*' render={() => <div className='imgError'>ERROR</div>}/>
                                </Switch>
                            </Suspense>
                        </div>
                    </Content>
                </div>
            </Layout>
        </Layout>
    );


}

function mapStateToProps(state: AppStateType) {
    return {initialized: state.app.initialized,}
}

let SamuraiJs: React.FC = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    )
}


let AppContainer = compose<React.ComponentType>(withRouter, connect(mapStateToProps, {initializeApp}))(App)
export default SamuraiJs



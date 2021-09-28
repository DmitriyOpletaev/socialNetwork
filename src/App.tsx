import m from './App.module.scss'
import React, {Component, Suspense,} from "react"
import {BrowserRouter, Route, Switch, withRouter,} from "react-router-dom"
import {connect, Provider} from "react-redux"
import {initializeApp} from "./components/redux/Reducers/app-reducer"
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
import {MusicPage} from "./components/Music/Music_Page";
import {Header} from "antd/es/layout/layout";

const LoginPage = React.lazy(() => import("./components/LoginPage/LoginPage"))


type MapProps = ReturnType<typeof mapStateToProps>
type DispatchProps = {
    initializeApp: () => void
}

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


class App extends Component<MapProps & DispatchProps> {

    /*catchAllUnhandledErrors = (e:PromiseRejectionEvent)=>{
        alert('some error')
       // console.log(promiseRejectionEvent)
    }*/


    componentDidMount() {
        this.props.initializeApp();
        // eslint-disable-next-line no-restricted-globals

        // window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors) //слушатель ошибки
    }


    componentWillUnmount() {
        // window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)  //подчищаем мусор =) remove наверное должно быть
    }


    state = {
        collapsed: true,
    };


    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };


    render() {

        if (!this.props.initialized) {
            return (<Preloader/>)
        }
        return (
            <Layout>
                <Sider theme='light' className={m.slider_menu}
                    style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                    }}
                >

                    <Nav/>
                </Sider>
                <Layout className={m.header_content_wrapper} >
                    <Header className={m.header_wrapper}>
                        <MyHeader />
                    </Header>



                    <div className={m.content_wrapper}>
                    <Content>
                        <div className="site-layout-background" style={{padding: 24, textAlign: 'center'}}>
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



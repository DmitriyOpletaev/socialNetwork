import m from './App.module.css'
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
const LoginPage = React.lazy(() => import("./components/LoginPage/LoginPage"))



type MapProps = ReturnType<typeof mapStateToProps>
type DispatchProps = {
    initializeApp: () => void
}

const { Sider, Content } = Layout;


function Loading (){
    return(

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
        // window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)  //подчищаем мусор =)
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
                <Sider collapsed={this.state.collapsed}
                    style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                    }}
                >
                    <div className="logo" >LOGO</div>
                    <Nav/>
                </Sider>
                <Layout className="site-layout" style={{ marginLeft: 200, minHeight:'100vh' }}>

                        <MyHeader  collapsed={this.state.collapsed} toggle={this.toggle}/>

                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
                            <Suspense fallback={<Loading/>}>
                                <Switch>
                                    <Route exact path='/homepage' render={() => <Homepage/>}/>
                                    <Route path='/profile/:userId?' render={() => <Profile/>}/>
                                    <Route path='/photos' render={() => <PhotosPage/>}/>
                                    <Route path='/videos' render={() => <VideoPage/>}/>
                                    <Route path='/users' render={() => <UsersPage />}/>
                                    <Route path='/chat' render={() => <ChatPage />}/>
                                    <Route path='/music' render={() => <MusicPage />}/>
                                    <Route path='/login/facebook' render={() => <div>Facebook</div>}/>
                                    <Route path='/login' render={() => <LoginPage />}/>
                                    <Route path='/groups' render={() => <Groups/>}/>
                                    <Route path='/news' render={() => <News/>}/>
                                    <Route path='/praktika/' render={() => <PraktikaPage/>}/>
                                    <Route path='*' render={() => <div className='imgError'>ERROR</div> } />
                                </Switch>
                            </Suspense>
                        </div>
                    </Content>

                </Layout>
            </Layout>









           /* <Layout className={m.body}>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <Nav/>
                </Sider>
                <Layout className={m.wrapper_header_content}>
                    <MyHeader  collapsed={this.state.collapsed} toggle={this.toggle}/>

                    <Content className={m.body_content}>
                        <Suspense fallback={<Loading/>}>
                            <Switch>
                                <Route exact path='/homepage' render={() => <Homepage/>}/>
                                <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                                <Route path='/photos' render={() => <PhotosPage/>}/>
                                <Route path='/videos' render={() => <VideoPage/>}/>
                                <Route path='/users' render={() => <UsersPage />}/>
                                <Route path='/chat' render={() => <ChatPage />}/>
                                <Route path='/login/facebook' render={() => <div>Facebook</div>}/>
                                <Route path='/login' render={() => <LoginPage />}/>
                                <Route path='/groups' render={() => <Groups/>}/>
                                <Route path='/news' render={() => <News/>}/>
                                <Route path='/praktika/' render={() => <PraktikaPage/>}/>
                                <Route path='*' render={() => <div className='imgError'>ERROR</div> } />
                            </Switch>
                        </Suspense>
                    </Content>
                </Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                   Реклама
                </Sider>
            </Layout>*/

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



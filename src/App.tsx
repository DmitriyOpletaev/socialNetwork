import './App.css'
import React, {Component, Suspense,} from "react"
import {BrowserRouter, Route, Switch, withRouter,} from "react-router-dom"
import {connect, Provider} from "react-redux"
import {initializeApp} from "./components/redux/Reducers/app-reducer"

import Preloader from "./components/common/preloader/preloader"
import {compose} from "redux"
import store, {AppStateType} from "./components/redux/redux-store"
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import {UsersPage} from "./components/Users/UsersContainer";
import Groups from "./components/Groups/Groups";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Homepage from "./components/Homepage/Homepage";
import Nav from "./components/Nav/Nav";
import {MyHeader} from "./components/Header/Header";
import {PhotosPage} from "./components/Photos/PhotosPage";

const ProfileContainer = React.lazy(() => import("./components/Profile/Profile_container"))
const LoginPage = React.lazy(() => import("./components/LoginPage/LoginPage"))
const ChatPage = React.lazy(() => import("./components/Dialogs/ChatPage"))


type MapProps = ReturnType<typeof mapStateToProps>
type DispatchProps = {
    initializeApp: () => void
}

const { Sider, Content } = Layout;

class App extends Component<MapProps & DispatchProps> {

    /*catchAllUnhandledErrors = (e:PromiseRejectionEvent)=>{
        alert('some error')
       // console.log(promiseRejectionEvent)
    }*/


    componentDidMount() {
        this.props.initializeApp();
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
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <Nav/>
                </Sider>
                <Layout className="site-layout">
                    <MyHeader collapsed={this.state.collapsed} toggle={this.toggle}/>

                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '10px 10px',
                            padding: 18,
                            minHeight: '88vh',
                        }}
                    >
                        <Suspense fallback={<div>Wait a minute</div>}>
                            <Switch>
                                <Route exact path='/homepage' render={() => <Homepage/>}/>
                                <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                                <Route path='/photos' render={() => <PhotosPage/>}/>
                                <Route path='/users' render={() => <UsersPage />}/>
                                <Route path='/chat' render={() => <ChatPage />}/>
                                <Route path='/login/facebook' render={() => <div>Facebook</div>}/>
                                <Route path='/login' render={() => <LoginPage/>}/>
                                <Route path='/groups' render={() => <Groups/>}/>
                                <Route path='/news' render={() => <News/>}/>
                                <Route path='/music' render={() => <Music/>}/>
                                <Route path='*' render={() => <div className='imgError'>ERROR</div> } />
                            </Switch>
                        </Suspense>
                    </Content>
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



import './App.css'
import React, {Component, Suspense} from "react"
import {BrowserRouter, Route, Switch, withRouter,} from "react-router-dom"
import {connect, Provider} from "react-redux"
import {initializeApp} from "./components/redux/Reducers/app-reducer"
import Nav from './components/Nav/Nav'
import Homepage from "./components/Homepage/Homepage"
import Groups from "./components/Groups/Groups"
import Music from "./components/Music/Music"
import News from "./components/News/News"
import HeaderContainer from "./components/Header/Header_Container"
import Preloader from "./components/common/preloader/preloader"
import {compose} from "redux"
import store, {AppStateType} from "./components/redux/redux-store"
import {UsersPage} from "./components/Users/UsersContainer";
//import {LoginPage} from "./components/LoginPage/LoginPage";
const ProfileContainer = React.lazy(() => import("./components/Profile/Profile_container"))
const LoginPage = React.lazy(() => import("./components/LoginPage/LoginPage"))






type MapProps= ReturnType<typeof mapStateToProps>
type DispatchProps={
    initializeApp: ()=>void
}



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

    render() {
        if (!this.props.initialized) {
            return (<Preloader/>)
        }
        return (
            <div className='app-wrapper'>
                <Preloader/>
                <HeaderContainer/>
                <Nav/>
                <Route exact path='/homepage' render={() => <Homepage/>}/>
                <Suspense fallback={<div>Wait a minute</div>}>
                    <Switch>
                        <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                        <Route path='/users' render={() => <UsersPage />}/>
                        <Route path='/login/facebook' render={() => <div>Facebook</div>}/>
                        <Route path='/login' render={() => <LoginPage/>}/>
                    </Switch>
                </Suspense>
                <Route path='/groups' render={() => <Groups/>}/>
                <Route path='/news' render={() => <News/>}/>
                <Route path='/music' render={() => <Music/>}/>
                {/*<Route path='*' render={() => <div className='imgError'><img src={img404Error} alt={'ERROR 404'}/></div> } />*/}
            </div>


        );

    }
}

function mapStateToProps(state:AppStateType) {
    return {initialized: state.app.initialized,}
}

let SamuraiJs:React.FC=()=> {
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



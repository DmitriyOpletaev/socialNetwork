import {Button, Input} from "antd";
import React, {useEffect, useState} from "react";

import { useSelector} from "react-redux";
import { YoutubeAPI, youtubeAPIKey} from "../api/Youtube_API";

import {loadGoogleScript} from "../api/asda";

import {getaccessToken} from "../redux/Reducers/Google_Auth-Reducer";
import axios from "axios";



function Groups() {
    const [gapi, setGapi] = useState();
    const [googleAuth, setGoogleAuth] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [imageUrl, setImageUrl] = useState();

    const onSuccess = (googleUser: { getBasicProfile: () => any; }) => { // (Ref. 7)
        setIsLoggedIn(true);
        const profile = googleUser.getBasicProfile();
        setName(profile.getName());
        setEmail(profile.getEmail());
        setImageUrl(profile.getImageUrl());
    };

    const onFailure = () => {
        setIsLoggedIn(false);
    }

    const logOut = () => { // (Ref. 8)
        (async () => {
            // @ts-ignore
            await googleAuth.signOut();
            setIsLoggedIn(false);
            // @ts-ignore
            renderSigninButton(gapi);
        })();
    };

    const renderSigninButton = (_gapi: { signin2: { render: (arg0: string, arg1: { scope: string; width: number; height: number; longtitle: boolean; theme: string; onsuccess: (googleUser: any) => void; onfailure: () => void; }) => void; }; }) => { // (Ref. 6)
        _gapi.signin2.render('google-signin', {
            'scope': 'profile email',
            'width': 240,
            'height': 50,
            'longtitle': true,
            'theme': 'dark',
            'onsuccess': onSuccess,
            'onfailure': onFailure
        });
    }


    useEffect(() => {

        // Window.gapi is available at this point
        // @ts-ignore
        window.onGoogleScriptLoad = () => { // (Ref. 1)

            // @ts-ignore
            const _gapi = window.gapi; // (Ref. 2)
            setGapi(_gapi);

            _gapi.load('auth2', () => { // (Ref. 3)
                (async () => {

                    const _googleAuth = await _gapi.auth2.init({ // (Ref. 4)
                        // @ts-ignore
                        client_id: '205239420469-a77bsbiec4k1mpu3lb4nfl05krmm6262.apps.googleusercontent.com'
                    });
                    setGoogleAuth(_googleAuth); // (Ref. 5)
                    renderSigninButton(_gapi); // (Ref. 6)
                })();
            });
        }

        // Ensure everything is set before loading the script
        loadGoogleScript(); // (Ref. 9)

    }, []);

    const accessToken = useSelector(getaccessToken)
    const [token, setToken] = useState('')



    function execute() {

       return fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&mine=true&key=${youtubeAPIKey}`, {
           headers:{
               'Authorization': `Bearer ${token}`,
               'Content-Type': 'application/json'
           }

       }).then(
           res=> res
       )

    }
    function authenticate() {
        // @ts-ignore
        return gapi.auth2.getAuthInstance()
            .signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"})
            .then(function() { console.log("Sign-in successful"); },
                function(err: any) { console.error("Error signing in", err); });
    }


async function aaa(){
    authenticate()

}
    return (
        <div className="App">
            <header className="App-header">
                {!isLoggedIn &&
                <div id="google-signin"></div>
                }

                {isLoggedIn &&
                <div>
                    <div>
                        <img src={imageUrl}/>
                    </div>
                    <div>{name}</div>
                    <div>{email}</div>
                    <button className='btn-primary' onClick={logOut}>Log Out</button>
                </div>
                }
            </header>
            <Input value={token} onChange={(e)=>setToken(e.currentTarget.value)}/>
            <Button onClick={execute}>yiotobe</Button>
            <Button onClick={aaa}>asd</Button>
        </div>
    )

}

export default Groups;
import firebase from "firebase/compat";



firebase.initializeApp( {
    apiKey: "AIzaSyBey2mu4mayQvY4yJYoAEc2cFT_PzIKzd4",
    authDomain: "oval-unity-326218.firebaseapp.com",
    projectId: "oval-unity-326218",
    storageBucket: "oval-unity-326218.appspot.com",
    messagingSenderId: "205239420469",
    appId: "1:205239420469:web:883fbc7c8a392fc3bf937c",
    measurementId: "G-N34TNV4FQZ"
})
export const authGoogle = firebase.auth();
export const firestore = firebase.firestore();
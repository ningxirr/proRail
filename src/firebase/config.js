import * as firebase from 'firebase';
import firestore from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyDq-hfn6apaRQsrk0R0W34j7GpXRhHNvVo",
    authDomain: "prorail-application.firebaseapp.com",
    databaseURL: "https://prorail-application-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "prorail-application",
    storageBucket: "prorail-application.appspot.com",
    messagingSenderId: "667402206768",
    appId: "1:667402206768:web:d4e6f2a9bbafb39588f7f5",
    measurementId: "G-DZEVHEL1SH"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();
export default firebase;
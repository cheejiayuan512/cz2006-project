import firebase from "firebase";

import "firebase/database";

let config = {
    apiKey: "AIzaSyCj3IA_wCVw5npiFnc4OagpzwD1wfTxPAE",
    authDomain: "makanwhere-568ee.firebaseapp.com",
    databaseURL: "https://makanwhere-568ee-default-rtdb.firebaseio.com",
    projectId: "makanwhere-568ee",
    storageBucket: "makanwhere-568ee.appspot.com",
    messagingSenderId: "798743753349",
    appId: "1:798743753349:web:6822d3bd8272feb4422fec",
    measurementId: "G-C4DF69SKCN",
};

const firebaseApp = firebase.initializeApp(config);
const db = firebaseApp.database();
export default db;

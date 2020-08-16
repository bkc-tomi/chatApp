import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

let FB:any;
export let FBdb:firebase.firestore.Firestore;
export let FBstorage:firebase.storage.Storage;
export let googleProvider:firebase.auth.GoogleAuthProvider;
export let twitterProvider:firebase.auth.TwitterAuthProvider;

try {
    const firebaseConfig = {
        apiKey:            process.env.FB_API_KEY,
        authDomain:        process.env.FB_AUTH_DOMAIN,
        databaseURL:       process.env.FB_DATABASE_URL,
        projectId:         process.env.FB_PROJECT_ID,
        storageBucket:     process.env.FB_STORAGE_BUCKET,
        messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
        appId:             process.env.FB_APP_ID,
        measurementId:     process.env.FB_MEASUREMENT_ID,
    };
    
    firebase.initializeApp(firebaseConfig);
    
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    
    FBdb            = firebase.firestore();
    FBstorage       = firebase.storage();
    googleProvider  = new firebase.auth.GoogleAuthProvider();
    twitterProvider = new firebase.auth.TwitterAuthProvider();
    FB              = firebase.auth();
    console.log("firebase init!");
} catch (error) {
    console.log(error);
}

export default FB;
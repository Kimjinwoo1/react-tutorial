// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// REACT_APP_FIREBASE_API_KEY="AIzaSyBM8sTSiKHie1rIGGthFNpZ9E6LY2-nHs4"
// REACT_APP_FIREBASE_AUTH_DOMAIN="tutorial-990f8.firebaseapp.com"
// REACT_APP_FIREBASE_PROJECT_ID="tutorial-990f8"
// REACT_APP_FIREBASE_STORAGE_BUCKET="tutorial-990f8.appspot.com"
// REACT_APP_FIREBASE_MESSAGING_SENDER_ID="135573030403"
// REACT_APP_FIREBASE_APP_ID="1:135573030403:web:18ebd5dd8037cf9902b036"

const firebaseApp = initializeApp(firebaseConfig)
// Initialize Firebase
// export const app = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp)

export default firebaseApp
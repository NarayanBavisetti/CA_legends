import firebase from "firebase/compat/app";

import "firebase/compat/auth"; // for authentication
import 'firebase/compat/storage';     // for storage
import "firebase/compat/database"; // for realtime database
import "firebase/compat/firestore"; // for cloud firestore
// import 'firebase/messaging';   // for cloud messaging
// import 'firebase/functions';   // for cloud functions

const firebaseApp = firebase.initializeApp({
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: `${process.env.REACT_APP_FIREBASEZ_AUTH_DOMAIN}`,
  projectId: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID}`,
  appId: `${process.env.REACT_APP_FIREBASE_APP_ID}`,
  databaseURL:`${process.env.REACT_APP_FIREBASE_DATABASE_URL}`
});

export const auth = firebaseApp.auth();
export const db = firebaseApp.firestore();
export const storage = firebaseApp.storage();
// export const timestamp = firebaseApp.storage().FieldValue.serverTimestamp;

export default firebaseApp;
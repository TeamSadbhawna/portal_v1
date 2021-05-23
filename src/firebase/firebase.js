import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import config from './env';

if (!firebase.apps.length) {
  //initializing with the config object
  firebase.initializeApp(config);
}

//separting database API and authentication
const db = firebase.database();
const auth = firebase.auth();
const firestoredb = firebase.firestore(); 

const facebookProvider = new firebase.auth.FacebookAuthProvider();

export { db, auth, facebookProvider, firestoredb };

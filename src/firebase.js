import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyAGiZ6yw4vCxhPtwELP2cX2sh7kw9I1E30",
    authDomain: "fipugram-bcb71.firebaseapp.com",
    projectId: "fipugram-bcb71",
    storageBucket: "fipugram-bcb71.appspot.com",
    messagingSenderId: "949826627032",
    appId: "1:949826627032:web:e03b11efca4916ff133ead"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  let db = firebase.firestore();
  let storage = firebase.storage();

  export { firebase, db, storage };


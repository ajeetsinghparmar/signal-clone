import * as firebase from 'firebase';
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAt7cuFYLjlUkiZhkiH9nvW4QUbPl5pBHg",
    authDomain: "signal-clone-d4487.firebaseapp.com",
    projectId: "signal-clone-d4487",
    storageBucket: "signal-clone-d4487.appspot.com",
    messagingSenderId: "996418569857",
    appId: "1:996418569857:web:cb429d397931f814366f80"
  };

  let app;

  if (firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
  } else {
    app = firebase.app();
  }

  const db = app.firestore();
  const auth = firebase.auth();

  export { db, auth };
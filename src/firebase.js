import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyA4xSdyLWYZvdZ7asOMY8C0uSmgNGNhxio",
    authDomain: "react-notes-a7c60.firebaseapp.com",
    projectId: "react-notes-a7c60",
    storageBucket: "react-notes-a7c60.appspot.com",
    messagingSenderId: "277021725925",
    appId: "1:277021725925:web:f0fb18084fc7d0932af00c"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
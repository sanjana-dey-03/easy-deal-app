// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAuEH0coUo0WlAR6Faa6iVfCdxP2z30lHg",
  authDomain: "webdevelopmenthackathon-93f70.firebaseapp.com",
  projectId: "webdevelopmenthackathon-93f70",
  storageBucket: "webdevelopmenthackathon-93f70.appspot.com",
  messagingSenderId: "1040085158817",
  appId: "1:1040085158817:web:5b3eb280fbe2a70e0e99e0",
  measurementId: "G-L3TYFCFGJJ"
};

// Important: Initialize app once, safely
let firebaseApp;
if (!initializeApp.length || !initializeApp.apps?.length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = initializeApp.apps[0];
}

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { auth, db };




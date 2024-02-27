import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCHds3sHcqGtB5m3h5gTQgNgTWzJY66KvI",
  authDomain: "mandal-art-7fbc2.firebaseapp.com",
  projectId: "mandal-art-7fbc2",
  storageBucket: "mandal-art-7fbc2.appspot.com",
  messagingSenderId: "470626373535",
  appId: "1:470626373535:web:8582c80a41f0a79ff337aa",
  measurementId: "G-2WT2R5YB74"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {
  db,
  auth,
  provider
}
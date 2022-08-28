// import firebase from 'firebase';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from 'firebase/auth';

// import { getAnalytics } from "firebase/analytics";




// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBAsq_Sd3RxfGBQJbDD6qNfaV3chRzrDyI",
    authDomain: "curcolia.firebaseapp.com",
    projectId: "curcolia",
    storageBucket: "curcolia.appspot.com",
    messagingSenderId: "663047638449",
    appId: "1:663047638449:web:304bb522b41801e9174190",
    measurementId: "G-M1H4VPKCGQ"
  };

  const app = initializeApp(firebaseConfig);

//   const app = !firebase.apps.length 
//   ? firebase.initializeApp(firebaseConfig) 
//   : firebase.app();

  const db = getFirestore(app);
//   const analytics = getAnalytics(app);


  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  

  export {db, auth, provider};
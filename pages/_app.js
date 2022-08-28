import '../styles/globals.css';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth, db} from '../firebase';
import Login from './login';
import Loading from '../components/Loading';
import { useEffect } from 'react';
import {serverTimestamp} from 'firebase/firestore';

import { collection, setDoc, doc } from 'firebase/firestore';

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if(user){
      const userRef = doc(db, 'users', user.uid);
      const newUser = setDoc(userRef, {
          email :user.email,
          // lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
          lastSeen: serverTimestamp(),
          // lstSeen : db.app.
          photoURL: user.photoURL
        }, {merge: true}
      );
    }
  }, [user])
  

  if(loading) return <Loading />
  if(!user) return <Login />;
  return <Component {...pageProps} />
}

export default MyApp

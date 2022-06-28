import {useState, useEffect} from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../firebase.config';

export const useAuthStatus = () => {

  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if(user){
        setLoggedIn(true);
      }
      setLoading(false);
    })
  })

  return {loggedIn, loading};
}
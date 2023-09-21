import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
interface IProp {
  redirectPath?: string,
  children: React.ReactNode,
}

function ProtectedRoute(props: IProp) {
  // if (auth.currentUser) {
  //   updateProfile(auth.currentUser, {
  //     displayName: "LazyCoder", photoURL: null
  //   })
  // }
  const [user, setUser] = useState<User | null>(null)
  const [isRetrieved, setIsRetrieved] = useState<boolean>(false)
  useEffect(()=> {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsRetrieved(true)
    });
  })
  return isRetrieved ? ( user ? props.children : <Navigate to={props.redirectPath ? props.redirectPath : "/login"} replace />) : null; 
}

export default ProtectedRoute;
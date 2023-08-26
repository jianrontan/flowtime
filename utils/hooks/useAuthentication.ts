import React from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../../config/firebase';

export function useAuthentication() {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const unsubscribeFromAuthStateChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser(user);
      } else {
        // User is signed out
        setUser(null);
      }
    });

    return unsubscribeFromAuthStateChanged;
  }, []);

  return {
    user
  };
}
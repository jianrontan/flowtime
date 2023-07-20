import React from 'react';
import { Alert } from 'react-native';
import { getAuth, signOut } from '@firebase/auth';

function Logout() {
  React.useEffect(() => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { 
          text: "OK", 
          onPress: () => {
            const auth = getAuth();
            signOut(auth)
              .then(() => console.log('User signed out!'))
              .catch((error) => console.error('Error signing out: ', error));
          }
        }
      ]
    );
  }, []);

  return null;
}

export default Logout;

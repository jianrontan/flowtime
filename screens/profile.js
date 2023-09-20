import { useState, useEffect } from 'react';
import { Alert, View, ScrollView, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { getAuth, updateEmail, EmailAuthProvider, sendPasswordResetEmail, deleteUser, reauthenticateWithCredential, sendEmailVerification } from 'firebase/auth';
import { db } from '../config/firebase';
import { collection, query, where, onSnapshot, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Dialog from 'react-native-dialog';

import { COLORS, FONT, SIZES } from '../constants';

function Profile() {
  const auth = getAuth();
  const userId = auth.currentUser.uid;
  const [focusTime, setFocusTime] = useState(0);
  const [emailDialogVisible, setEmailDialogVisible] = useState(false);
  const [passwordDialogVisible, setPasswordDialogVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [verifyPassword, setVerifyPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [verifyDeletePassword, setVerifyDeletePassword] = useState("");

  function toSeconds(time) {
    let parts = time.split(':');
    return (+parts[0]) * 60 * 60 + (+parts[1]) * 60 + (+parts[2]); 
  }

  async function totalFocusTime() {
    const q = query(collection(db, "statistics"),
      where("id", "==", userId)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let totalFocusTime = 0;
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        let time = toSeconds(data.length);
        totalFocusTime += time;
      });
      setFocusTime(totalFocusTime);
    });
    return() => unsubscribe();
  }

  useEffect(() => {
    totalFocusTime();
  }, []);

  function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? (h < 10 ? '0' + h : h) + ":" : "00:";
    var mDisplay = m > 0 ? (m < 10 ? '0' + m : m) + ":" : "00:";
    var sDisplay = s > 0 ? (s < 10 ? '0' + s : s) : "00";
    return hDisplay + mDisplay + sDisplay; 
  };

  let displayFocusTime = secondsToHms(focusTime);

  const onUpdateEmail = () => {
    setEmailDialogVisible(true);
  };

  const onForgotPassword = () => {
    setPasswordDialogVisible(true);
  };
  
  const onDeleteAccount = () => {
    setDeleteDialogVisible(true);
  };
  
  const handleUpdateEmail = async () => {
    var credential = EmailAuthProvider.credential(
      auth.currentUser.email, 
      verifyPassword
    );
    try {
      await reauthenticateWithCredential(auth.currentUser, credential);
      console.log("User re-authenticated.");
    } catch (error) {
      Alert.alert('Error', error.message);
      return;
    }
    try {
      await updateEmail(auth.currentUser, newEmail);
    } catch(error) {
      Alert.alert('Error', error.message);
      return;
    }
    try {
      await sendEmailVerification(auth.currentUser);
      Alert.alert('Email Updated', 'A confirmation mail will be sent to your new email. Please verify it.');
    } catch (error) {
      Alert.alert('Error', error.message);
      return;
    }
    setEmailDialogVisible(false);
  };

  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      Alert.alert('Password reset email sent', 'Check your email for the link to reset your password.');
    } catch(error){
      Alert.alert('Error', error.message);
      return;
    }
    setPasswordDialogVisible(false);
  };

  async function deleteFirestoreData(userId) {
    const collections = ['settings', 'statistics', 'tags'];
    for (let collectionName of collections) {
      const q = query(collection(db, collectionName), where("id", "==", userId));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((document) => {
        deleteDoc(doc(db, collectionName, document.id));
      });
    }
  }

  const handleDeleteAccount = async () => {
    var credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      verifyDeletePassword
    )
    try {
      await reauthenticateWithCredential(auth.currentUser, credential);
      console.log("User re-authenticated.");
    } catch (error) {
      Alert.alert('Error', error.message);
      return;
    }
    try {
      await deleteFirestoreData(userId)
      await deleteUser(auth.currentUser);
      Alert.alert('Account deleted', 'Thank you for using Flowtime.')
    } catch (error) {
      Alert.alert('Error', error.message);
      return;
    }
  };

  const onLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel', 
        },
        {
          text: 'OK',
          onPress: handleLogout,
        },
      ],
    )
  }

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log('User signed out!');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.grayBeige }}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={{ flex: 1, padding: SIZES.large, borderBottomColor: COLORS.sepGrayBeige, borderBottomWidth: 1 }}>
          <Text style={{ fontFamily: FONT.medium, fontSize: SIZES.large, color: COLORS.themeColor }}>
            Total Time: {displayFocusTime}
          </Text>
        </View>

        <View style={{ flex: 1, padding: SIZES.small, borderBottomColor: COLORS.sepGrayBeige, borderBottomWidth: 1 }}>
          <TouchableOpacity onPress={onUpdateEmail}>
            <Text style={{ fontFamily: FONT.medium, fontSize: SIZES.smallmedium, color: COLORS.themeColor }}>
              Update Email Address
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, padding: SIZES.small, borderBottomColor: COLORS.sepGrayBeige, borderBottomWidth: 1 }}>
          <TouchableOpacity onPress={onForgotPassword}>
            <Text style={{ fontFamily: FONT.medium, fontSize: SIZES.smallmedium, color: COLORS.themeColor }}>
              Forgot Password
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, padding: SIZES.small, borderBottomColor: COLORS.sepGrayBeige, borderBottomWidth: 1 }}>
          <TouchableOpacity onPress={onDeleteAccount}>
            <Text style={{ fontFamily: FONT.medium, fontSize: SIZES.smallmedium, color: COLORS.themeColor }}>
              Delete Account
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, padding: SIZES.small, borderBottomColor: COLORS.sepGrayBeige, borderBottomWidth: 1 }}>
          <TouchableOpacity onPress={onLogout}>
            <Text style={{ fontFamily: FONT.medium, fontSize: SIZES.smallmedium, color: COLORS.brownRed }}>
              Log Out
            </Text>
          </TouchableOpacity>
        </View>

        <Dialog.Container visible={emailDialogVisible}>
          <Dialog.Title>Email update</Dialog.Title>
          <Dialog.Input onChangeText={(password) => setVerifyPassword(password)} placeholder="Password" secureTextEntry={true} autoCapitalize='none'></Dialog.Input>
          <Dialog.Input onChangeText={(email) => setNewEmail(email)} placeholder="New Email" autoCapitalize='none'></Dialog.Input>
          <Dialog.Button label="Cancel" onPress={() => setEmailDialogVisible(false)}/>
          <Dialog.Button label="Update" onPress={handleUpdateEmail}/>
        </Dialog.Container>

        <Dialog.Container visible={passwordDialogVisible}>
          <Dialog.Title>Forgot Password</Dialog.Title>
          <Dialog.Input onChangeText={(email) => setResetEmail(email)} placeholder="Enter your email" autoCapitalize='none'></Dialog.Input>
          <Dialog.Button label="Cancel" onPress={() => setPasswordDialogVisible(false)}/>
          <Dialog.Button label="Reset" onPress={handleForgotPassword}/>
        </Dialog.Container>

        <Dialog.Container visible={deleteDialogVisible}>
          <Dialog.Title>Delete Account</Dialog.Title>
          <Dialog.Input onChangeText={(password) => setVerifyDeletePassword(password)} placeholder="Password" secureTextEntry={true} autoCapitalize='none'></Dialog.Input>
          <Dialog.Button label="Cancel" onPress={() => setDeleteDialogVisible(false)}/>
          <Dialog.Button label="Delete" onPress={handleDeleteAccount}/>
        </Dialog.Container>
        
      </ScrollView>
    </SafeAreaView>
  );
}

export default Profile;
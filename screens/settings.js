import React, { useState, useEffect } from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { useDispatch } from 'react-redux/es/exports';
import { setBreakContinue, setBreakSave, setNotification } from '../redux/actions';
import { getDoc, updateDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { getAuth } from 'firebase/auth';

import SettingsComponent from '../myComponents/drawer/settings/SettingsComponent';
import { COLORS } from '../constants';

function Settings() {
  const auth = getAuth();
  const dispatch = useDispatch();

  const [isBreakContinueEnabled, setBreakContinueEnabled] = useState(false);
  const [isBreakSaveEnabled, setBreakSaveEnabled] = useState(false);
  const [isNotificationEnabled, setNotificationEnabled] = useState(false);

  async function getOrCreateFirestoreData() {
    const userId = auth.currentUser.uid;
    const userDocRef = doc(db, 'settings', userId);
    const userDocSnap = await getDoc(userDocRef);

    let data = {};

    if (userDocSnap.exists()) {
      data = userDocSnap.data();
    } else {
      await setDoc(userDocRef, {
        continue: false,
        save: false,
        notification: false,
        id: userId
      });

      data = {
        continue: false,
        save: false,
        notification: false,
        id: userId
      };
    }

    setBreakContinueEnabled(data.continue);
    setBreakSaveEnabled(data.save);
    setNotificationEnabled(data.notification);

  }

  useEffect(() => {
    getOrCreateFirestoreData();
  }, []);

  async function updateFirestore(fieldName, value) {
    const userId = auth.currentUser.uid;
    const userDocRef = doc(db, 'settings', userId);
    await updateDoc(userDocRef, { [fieldName]: value });
  }

  const breakContinue=[{title: 'Continue after break', subTitle:'Stopwatch starts once break ends'}];
  const breakSave=[{title: 'Save break time', subTitle:'Save break time for later (on continue)'}];
  const notificationToggle=[{title: 'Notifications', subTitle: 'Notification when break ends'}];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.grayBeige }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        <View>
          <SettingsComponent
            settingsOptions={breakContinue} 
            isEnabled={isBreakContinueEnabled} 
            setIsEnabled={(value) => {
              setBreakContinueEnabled(value);
              dispatch(setBreakContinue(value));
              updateFirestore('continue', value)
            }}
            fieldName='continue'
            updateFirestore={updateFirestore}
          />
          <SettingsComponent
            settingsOptions={breakSave} 
            isEnabled={isBreakSaveEnabled} 
            setIsEnabled={(value) => {
              setBreakSaveEnabled(value);
              dispatch(setBreakSave(value));
              updateFirestore('save', value)
            }}
            fieldName='save'
            updateFirestore={updateFirestore}
          />
          <SettingsComponent
            settingsOptions={notificationToggle} 
            isEnabled={isNotificationEnabled} 
            setIsEnabled={(value) => {
              setNotificationEnabled(value);
              dispatch(setNotification(value));
              updateFirestore('notification', value)
            }}
            fieldName='notification'
            updateFirestore={updateFirestore}          
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

export default Settings;
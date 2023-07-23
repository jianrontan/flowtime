import React, { useState, useCallback, useEffect } from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { collection, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { getAuth } from 'firebase/auth';

import SettingsComponent2 from '../myComponents/drawer/settings/SettingsComponent2';
import SettingsComponent from '../myComponents/drawer/settings/SettingsComponent';
import { COLORS, icons, images, FONT, SIZES } from '../constants';
import { validateLocaleAndSetLanguage } from 'typescript';

function Settings() {
  const auth = getAuth();

  const [isBreakContinueEnabled, setBreakContinueEnabled] = useState(false);
  const [isBreakSaveEnabled, setBreakSaveEnabled] = useState(false);
  const [isNotificationEnabled, setNotificationEnabled] = useState(false);

  const setBreakContinueEnabledMemoized = useCallback((value) => {
    setBreakContinueEnabled(value);
  }, []);
  
  const setBreakSaveEnabledMemoized = useCallback((value) => {
    setBreakSaveEnabled(value);
  }, []);
  
  const setNotificationEnabledMemoized = useCallback((value) => {
    setNotificationEnabled(value);
  }, []);

  console.log({ isBreakContinueEnabled, isBreakSaveEnabled, isNotificationEnabled });

  async function updateFirestore() {
    try {
      const settingsRef = await addDoc(collection(db, "settings"), {
        continue: setBreakContinueEnabled(value),
        save: setBreakSaveEnabled(value),
        notification: setNotificationEnabled(value),
        id: auth?.currentUser?.uid,
      });
      console.log("Settings Document written with ID: ", settingsRef.id);
    } catch (e) {
      console.error("Error adding Settings document: ", e);
    }
  }

  const breakContinue=[{title: 'Continue after break', subTitle:'Stopwatch starts once break ends'}];
  const breakSave=[{title: 'Save break time', subTitle:'Save break time for later on continue'}];
  const notificationToggle=[{title: 'Notifications', subTitle: 'Notification when break ends'}];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.grayBeige }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        <View>
          <SettingsComponent
            settingsOptions={breakContinue} 
            isEnabled={isBreakContinueEnabled} 
            setIsEnabled={(value) => {
              setBreakContinueEnabledMemoized(value)
              updateFirestore();
            }}
          />
          <SettingsComponent
            settingsOptions={breakSave} 
            isEnabled={isBreakSaveEnabled} 
            setIsEnabled={(value) => {
              setBreakSaveEnabledMemoized(value)
              updateFirestore();
            }}
          />
          <SettingsComponent
            settingsOptions={notificationToggle} 
            isEnabled={isNotificationEnabled} 
            setIsEnabled={(value) => {
              setNotificationEnabledMemoized(value)
              updateFirestore();
            }}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

export default Settings;
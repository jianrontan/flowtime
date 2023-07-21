import React, { useState, useCallback, useEffect } from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import SettingsComponent2 from '../myComponents/drawer/settings/SettingsComponent2';
import SettingsComponent from '../myComponents/drawer/settings/SettingsComponent';
import { COLORS, icons, images, FONT, SIZES } from '../constants';

function Settings({navigation}) {
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

  useEffect(() => {
  }, [isBreakContinueEnabled, isBreakSaveEnabled, isNotificationEnabled]);

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
            setIsEnabled={setBreakContinueEnabledMemoized} 
          />
          <SettingsComponent
            settingsOptions={breakSave} 
            isEnabled={isBreakSaveEnabled} 
            setIsEnabled={setBreakSaveEnabledMemoized} 
          />
          <SettingsComponent
            settingsOptions={notificationToggle} 
            isEnabled={isNotificationEnabled} 
            setIsEnabled={setNotificationEnabledMemoized} 
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

export default Settings;
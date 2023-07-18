import { useState, useEffect, useCallback, useMemo } from 'react';
import { View, ScrollView, SafeAreaView, FlatList, TouchableOpacity, Switch } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import styles from '../myComponents/common/header/header/header.style';
import SettingsComponent from '../myComponents/drawer/settings/SettingsComponent';
import { COLORS, icons, images, FONT, SIZES } from '../constants';

function Settings({navigation}) {
  const breakContinue=[{title: 'Continue after break', subTitle:'Stopwatch starts once break ends'}];
  const notificationToggle=[{title: 'Notifications', subTitle: 'Notification when break ends'}];
  const appPreferences=[{title: 'App Preferences', subTitle:'Set your preferences'}];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.grayBeige }}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View>
            <SettingsComponent settingsOptions={breakContinue} />
            <SettingsComponent settingsOptions={notificationToggle} />
            <SettingsComponent settingsOptions={appPreferences} />
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
}

export default Settings;
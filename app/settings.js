import { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { COLORS, icons, images, FONT, SIZES } from '../constants';

function Settings() {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightBeige }}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={{ flex: 1, padding: SIZES.medium }}>
            
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
}

export default Settings;
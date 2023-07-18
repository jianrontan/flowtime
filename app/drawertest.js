import { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, SafeAreaView, TouchableOpacity, Image, Switch } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { COLORS, icons, images, FONT, SIZES } from '../constants';

function Drawertest() {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <Switch 
            trackColor={{false: COLORS.darkThemeColor, true: COLORS.darkBeige}}
            thumbColor={isEnabled ? COLORS.themeColor : COLORS.themeColor}
            onValueChange={toggleSwitch}
            value={isEnabled}
        />
  );
}

export default Drawertest;
import { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SwitchToggle from 'react-native-switch-toggle';
import { useDrawerStatus } from '@react-navigation/drawer';

import { COLORS, FONT, SIZES } from '../../../constants';

const SettingsComponent2 = ({settingsOptions, isEnabled, setIsEnabled}) => {
    const isDrawerOpen = useDrawerStatus() === 'open';

    const toggleSwitch = () => {
        if (!isDrawerOpen){
          setIsEnabled(previousState => !previousState);
        }
      }
    

    return (
        <SafeAreaView>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                {settingsOptions.map(({title, subTitle }, index) =>
                    <TouchableOpacity key={title}>
                        <View style={{
                            paddingHorizontal: 20,
                            paddingTop: 20,
                            paddingBottom: 20,
                        }}>
                            <Text style={{fontFamily: FONT.medium, fontSize: SIZES.medium, color: COLORS.themeColor}}>{title}</Text>
                            {subTitle && <Text style={{fontFamily: FONT.regular, fontSize: SIZES.small, color: COLORS.lightThemeColor}}>{subTitle}</Text>}
                        </View>
                    </TouchableOpacity>
                )}
                <View 
                    style={{
                        paddingHorizontal: 20,
                        paddingTop: 20,
                        paddingBottom: 20,
                        justifyContent: 'center',
                    }}
                >
                    <SwitchToggle 
                        switchOn={isEnabled}
                        onPress={toggleSwitch}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default SettingsComponent2;

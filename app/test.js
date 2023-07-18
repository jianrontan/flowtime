import { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Switch } from 'react-native-switch';

import { COLORS, icons, images, FONT, SIZES } from '../constants';

function Test() {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <View style={{
            padding: 20,
        }}>
            <Switch
                value={isEnabled}
                onValueChange={toggleSwitch}
                disabled={false}
                activeText={'On'}
                inActiveText={'Off'}
                circleSize={25}
                barHeight={20}
                circleBorderWidth={2}
                circleBorderActiveColor={COLORS.themeColor}
                circleBorderInactiveColor={COLORS.themeColor}
                backgroundActive={COLORS.themeColor}
                backgroundInactive={'gray'}
                circleActiveColor={COLORS.lightBeige}
                circleInActiveColor={COLORS.lightBeige}
                changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
                innerCircleStyle={{ alignItems: "center", justifyContent: "center" }} // style for inner animated circle for what you (may) be rendering inside the circle
                outerCircleStyle={{}} // style for outer animated circle
                renderActiveText={false}
                renderInActiveText={false}
                switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
                switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
                switchWidthMultiplier={2} // multiplied by the `circleSize` prop to calculate total width of the Switch
                switchBorderRadius={20} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
            />
        </View>
  );
}

export default Test;
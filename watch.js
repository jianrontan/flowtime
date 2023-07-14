import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, SafeAreaView, Text, Button, NativeModules, TouchableOpacity } from 'react-native';
import { Stopwatch } from 'react-native-stopwatch-timer';

import { COLORS, icons, images, FONT, SIZES } from './constants';
import styles from './myComponents/study/Styles/break.style';

function Watch({ route, navigation }) {
    const { sliderValue, startStopwatch } = route.params;
    const [isStopwatchStart, setIsStopwatchStart] = useState(false);
    const [resetStopwatch, setResetStopwatch] = useState(false);
    const [time, setTime] = useState("00:00:00");

    const onTimeUpdate = useCallback((time) => {
        setTimeout(() => {
            setTime(time);
        }, 0);
    }, []);

    useEffect(() => {
        if (startStopwatch) {
            setTimeout(() => {
                setIsStopwatchStart(true);
            }, 0);
        }
    }, [startStopwatch]);
    
    const onBreakPress = () => {
        setIsStopwatchStart(false);
        navigation.reset({
            index: 0,
            routes: [{
                name: 'Break',
                params: { time: time, sliderValue: sliderValue },
            }]
        });
    };
    
    const options = {
        container: {
            width: 266,
            height: 80,
            backgroundColor: COLORS.lightBeige,
            borderRadius: SIZES.large / 1.25,
            borderWidth: 1.5,
            borderColor: COLORS.themeColor,
            alignItems: "center",
            justifyContent: "center",
        },
        text: {
            fontFamily: FONT.bold,
            fontSize: SIZES.xxLarge,
            color: COLORS.themeColor,
        },
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightBeige }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, padding: SIZES.medium, }}>

                    <View style={{ alignItems: 'center', padding: SIZES.xLarge }}>
                        <Stopwatch 
                            start={isStopwatchStart}
                            reset={resetStopwatch}
                            options={options}
                            getTime={onTimeUpdate}
                        />
                    </View>
                    <View style={{ alignItems: 'center', padding: SIZES.xLarge }}>
                        <TouchableOpacity style={styles.container} title="Break" onPress={onBreakPress}>
                            <Text style={styles.text}>Break</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Watch;
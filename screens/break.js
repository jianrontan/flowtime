import { useState, useEffect } from 'react';
import { View, ScrollView, SafeAreaView, Text, Button, TouchableOpacity } from 'react-native';
import { Timer } from 'react-native-stopwatch-timer'
import { CountdownCircleTimer, useCountdown } from 'react-native-countdown-circle-timer';

import styles from '../myComponents/study/Styles/break.style';
import { COLORS, icons, images, FONT, SIZES } from '../constants';

function Break({ route, navigation }) {
    const { time, sliderValue } = route.params;
    const [isTimerStart, setIsTimerStart] = useState(true);

    console.log(time);
    console.log(sliderValue);

    const timeToSeconds = (time) => {
        const [hours, minutes, seconds] = time.split(':').map(Number);
        return hours * 3600 + minutes * 60 + seconds;
      };

    let seconds = timeToSeconds(time) * (sliderValue / 60).toFixed(3);
    let msecs = seconds * 1000
    console.log(seconds);
    console.log(msecs);

    const onContinuePress = () => {
        navigation.reset({
            index: 0,
            routes:[{
                name: 'Watch',
                params: { sliderValue: sliderValue, startStopwatch: true }
            }]
        })
    };

    const onEndPress = () => {
        navigation.reset({
            index: 0,
            routes:[{
                name: 'Home',
            }]
        })
    };

    const options = {
        container: {
            width: 200,
            height: 60,
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
                        <Timer
                            totalDuration={msecs}
                            start={isTimerStart}
                            options={options}
                            handleFinish={() => {
                                null
                            }}
                        />
                    </View>
                    <View style={{ alignItems: 'center', padding: SIZES.xLarge }}>
                        <TouchableOpacity style={styles.container} title="Continue" onPress={onContinuePress}>
                            <Text style={styles.text}>Continue</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ alignItems: 'center', padding: SIZES.xLarge }}>
                        <TouchableOpacity style={styles.container} title="End" onPress={onEndPress}>
                            <Text style={styles.text}>End</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Break;

import { useState, useEffect } from 'react';
import { View, ScrollView, SafeAreaView, Text, Button } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

import { COLORS, icons, images, FONT, SIZES } from '../constants';

function Break({ route, navigation }) {
    const { time, sliderValue } = route.params;

    console.log(time);
    console.log(sliderValue);

    const timeToSeconds = (time) => {
        const [hours, minutes, seconds] = time.split(':').map(Number);
        return hours * 3600 + minutes * 60 + seconds;
      };

    const test = timeToSeconds(time);
    const seconds = timeToSeconds(time) * (sliderValue / 60).toFixed(0);
    const intSeconds = parseInt(seconds);
    console.log(test);
    console.log(seconds);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightBeige }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, padding: SIZES.medium, }}>

                    <View style={{ alignItems: 'center', padding: SIZES.xLarge }}>
                        <CountdownCircleTimer
                            isPlaying={true}
                            duration={intSeconds}
                        />
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Break;

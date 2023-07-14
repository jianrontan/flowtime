import { useState, useEffect } from 'react';
import { View, ScrollView, SafeAreaView, Text, Button } from 'react-native';
import { CountdownCircleTimer, useCountdown } from 'react-native-countdown-circle-timer';

import { COLORS, icons, images, FONT, SIZES } from './constants';

function Break({ route, navigation }) {
    const { time, sliderValue } = route.params;
    const [isPlaying, setIsPlaying] = useState(true);

    console.log(time);
    console.log(sliderValue);

    const timeToSeconds = (time) => {
        const [hours, minutes, seconds] = time.split(':').map(Number);
        return hours * 3600 + minutes * 60 + seconds;
      };

    const test = timeToSeconds(time);
    const seconds = timeToSeconds(time) * (sliderValue / 60).toFixed(0);
    let intSeconds = parseInt(seconds);
    console.log(test);
    console.log(seconds);
    console.log(intSeconds);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightBeige }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, padding: SIZES.medium, }}>

                    <View style={{ alignItems: 'center', padding: SIZES.xLarge }}>
                        <CountdownCircleTimer
                            isPlaying={isPlaying}
                            duration={intSeconds}
                            updateInterval={1}
                        >
                            {({ remainingTime }) => <Text>{remainingTime}</Text>}
                        </CountdownCircleTimer>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Break;

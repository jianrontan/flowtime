import { useState, useEffect, useRef } from 'react';
import { View, ScrollView, SafeAreaView, Text, Button, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Timer } from 'react-native-stopwatch-timer'
import * as Notifications from 'expo-notifications';

import { setTotalSavedTime } from '../redux/actions';
import styles from '../myComponents/study/Styles/break.style';
import { COLORS, FONT, SIZES } from '../constants';

function Break({ route, navigation }) {
    const dispatch = useDispatch();
    // Study time from watch.js amd sliderValue from home
    const { time, sliderValue } = route.params;
    // Sets whether timer is running or not
    const [isTimerStart, setIsTimerStart] = useState(true);
    // Break time to be added
    const savedTimeRef = useRef(0);
    
    // Settings from global store
    const isBreakContinueEnabled = useSelector(state => state.settingsReducer.continueVal);
    const isBreakSaveEnabled = useSelector(state => state.settingsReducer.saveVal);
    const totalSavedTime = useSelector(state => state.timeReducer.savedVal);
    // Variable for whether or not to navigate
    const shouldNavigateRef = useRef(false);
    // Variable for whether or not to save break time
    const shouldSaveBreakRef = useRef(false);

    // Gets latest settings
    useEffect(() => {
        shouldNavigateRef.current = isBreakContinueEnabled;
    }, [isBreakContinueEnabled]);
    useEffect(() => {
        shouldSaveBreakRef.current = isBreakSaveEnabled;
    }, [isBreakSaveEnabled]);

    // If timer runs out
    const handleFinish = () => {
        if (shouldNavigateRef.current && isTimerStart) {
            navigation.reset({
                index: 0,
                routes:[{
                    name: 'Watch',
                    params: { sliderValue: sliderValue, startStopwatch: true }
                }]
            })
        }
    }

    // Converts the study time to seconds
    const timeToSeconds = (time) => {
        const [hours, minutes, seconds] = time.split(':').map(Number);
        return hours * 3600 + minutes * 60 + seconds;
    };
    
    // Get the time left on break
    const getTime = (time) => {
        const [hours, minutes, seconds] = time.split(':').map(Number);
        breakTime = hours * 3600 + minutes * 60 + seconds;
        breakTimeMsecs = breakTime * 1000;
        savedTimeRef.current = breakTimeMsecs;
    };

    // Prevent state from updating during render
    useEffect(() => {
        getTime(time);
    }, [time]);

    // Break time in seconds
    let seconds = timeToSeconds(time) * (sliderValue / 60).toFixed(3);
    // Break time in milliseconds
    let msecs = (seconds * 1000);
    // Duration if saved
    let duration = parseInt(msecs + totalSavedTime);

    console.log("totalSavedTime: ", totalSavedTime)
    console.log("duration: ", duration)

    // When user wants to continue, start timer again go to watch.js
    const onContinuePress = () => {
        if (isBreakSaveEnabled) {
            dispatch(setTotalSavedTime(savedTimeRef.current));
            shouldNavigateRef.current = false;
            setIsTimerStart(false);
            navigation.reset({
                index: 0,
                routes:[{
                    name: 'Watch',
                    params: { sliderValue: sliderValue, startStopwatch: true }
                }]
            })
        }
        if (!isBreakSaveEnabled) {
            dispatch(setTotalSavedTime(0));
            shouldNavigateRef.current = false;
            setIsTimerStart(false);
            navigation.reset({
                index: 0,
                routes:[{
                    name: 'Watch',
                    params: { sliderValue: sliderValue, startStopwatch: true }
                }]
            })
        }
    };

    // When user wants to end session, go back to home
    const onEndPress = () => {
        dispatch(setTotalSavedTime(0));
        shouldNavigateRef.current = false;
        setIsTimerStart(false);
        navigation.reset({
            index: 0,
            routes:[{
                name: 'Home',
            }]
        })
    };

    const onPause = () => {
        if (isTimerStart) {
            setIsTimerStart(false);
        }
        else {
            setIsTimerStart(true);
        }
    };

    // Timer design
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
                        <Text style={styles.headerText}>Break</Text>
                    </View>

                    <View style={{ alignItems: 'center', padding: SIZES.xLarge }}>
                        <Timer
                            // Duration of break in milliseconds
                            totalDuration={duration}
                            // Timer starts when page opens
                            start={isTimerStart}
                            // Options
                            options={options}
                            // Do nothing on finish or navigate to watch(Change this with settings)
                            handleFinish={handleFinish}
                            // Get the time
                            getTime={getTime}
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

                    <View style={{ alignItems: 'center', padding: SIZES.xLarge }}>
                        <TouchableOpacity style={styles.container} title="Pause" onPress={onPause}>
                            <Text style={styles.text}>Pause</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Break;

import { useState, useEffect, useRef } from 'react';
import { View, ScrollView, SafeAreaView, Text, Button, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Timer } from 'react-native-stopwatch-timer'
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

import { allowsNotificationsAsync, requestPermissionsAsync } from '../myComponents/study/breakUtils/notifications';
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
    const isNotificationsEnabled = useSelector(state => state.settingsReducer.notificationVal);
    const totalSavedTime = useSelector(state => state.timeReducer.savedVal);
    // Variable for whether or not to navigate
    const shouldNavigateRef = useRef(false);
    // Variable for whether or not to save break time
    const shouldSaveBreakRef = useRef(false);
    // Variable for whether or not to show notifications
    const shouldShowNotifications = useRef(false);
    // Variable for current state of timer
    const timerRunningRef = useRef(false);

    // Gets latest settings
    useEffect(() => {
        shouldNavigateRef.current = isBreakContinueEnabled;
    }, [isBreakContinueEnabled]);
    useEffect(() => {
        shouldSaveBreakRef.current = isBreakSaveEnabled;
    }, [isBreakSaveEnabled]);
    useEffect(() => {
        shouldShowNotifications.current = isNotificationsEnabled;
    }, [isNotificationsEnabled]);
    useEffect(() => {
        timerRunningRef.current = isTimerStart;
    }, [isTimerStart]);

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

    // LOCAL NOTIFICATIONS
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        }),
    });

    // Request for permission
    async function registerForPushNotificationsAsync() {
        let token;
        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250, 1000],
                lightColor: '#FF231F7C',
            });
        }
        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log(token);
        } else {
            alert('Must use physical device for Push Notifications');
        }
      
        return token;
    }

    useEffect(() => {
        async function checkPermissions() {
            const allowsNotifications = await allowsNotificationsAsync();
            if (!allowsNotifications) {
                await requestPermissionsAsync();
            }
        }
        checkPermissions();
    }, []);
    
    // Function to call notifications and its content
    async function scheduleNotification() {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Timer Finished!",
                body: 'Your break time is over.',
            },
            trigger: null, // duration is in milliseconds
        });
    }

    // If timer runs out
    const handleFinish = () => {
        if (shouldNavigateRef.current && isTimerStart) {
            if (shouldShowNotifications.current) {
                scheduleNotification();
            }
            dispatch(setTotalSavedTime(0));
            navigation.reset({
                index: 0,
                routes:[{
                    name: 'Watch',
                    params: { sliderValue: sliderValue, startStopwatch: true }
                }]
            })
        }
        if (!shouldNavigateRef.current && timerRunningRef.current) {
            if (shouldShowNotifications.current) {
                scheduleNotification();
            }
            dispatch(setTotalSavedTime(0));
        }
    }

    // When user wants to continue, start timer again go to watch.js
    const onContinuePress = () => {
        if (isBreakSaveEnabled) {
            dispatch(setTotalSavedTime(savedTimeRef.current));
            shouldNavigateRef.current = false;
            timerRunningRef.current = false;
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
            timerRunningRef.current = false;
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
        timerRunningRef.current = false;
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
            timerRunningRef.current = false;
        }
        else {
            setIsTimerStart(true);
            timerRunningRef.current = true;
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

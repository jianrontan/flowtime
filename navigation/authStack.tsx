import React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { Text } from 'react-native';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from '../screens/welcome';
import SignUp from '../screens/signup';
import SignIn from '../screens/signin';
import ForgotPassword from '../screens/forgotpassword';
import { stylesHead } from '../myComponents';
import { COLORS } from '../constants';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
    // State variable appIsReady tracks when app is ready to render
    const [appIsReady, setAppIsReady] = useState(false);

    // Load fonts
    const [fontsLoaded] = useFonts({
        MontBold: require('../assets/fonts/Montserrat-Bold.ttf'),
        MontMed: require('../assets/fonts/Montserrat-Medium.ttf'),
        MontReg: require('../assets/fonts/Montserrat-Regular.ttf'),
    });

    // useEffect hook calls prepare function
    useEffect(() => {
        async function prepare() {
            try {
                // Keeps SplashScreen visible until the app is ready
                SplashScreen.preventAutoHideAsync();
            } catch (error) {
                // If line above results in an error, error logs to console
                console.warn(error);
            } finally {
                setAppIsReady(true);

                if (fontsLoaded) {
                    SplashScreen.hideAsync();
                }
            }
        }
        prepare();
    }, [fontsLoaded]);

    // useCallback creates a memoized callback onLayoutRootView that only changes appIsReady / fontsLoaded changes
    const onLayoutRootView = useCallback(async () => {
        if (appIsReady && fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [appIsReady, fontsLoaded]);

    if (!appIsReady || !fontsLoaded) {
        return null;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Welcome'
                screenOptions={{
                    headerStyle: { backgroundColor: COLORS.lightBeige },
                    headerTitle: () => (
                        <Text style={stylesHead.headerStyle}>Welcome</Text>
                    ),
                    headerTitleAlign: 'center',
                }}
            >
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
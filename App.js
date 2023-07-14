import { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, SafeAreaView, Text, Button, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SplashScreen, useRouter } from 'expo-router';
import { useFonts } from 'expo-font';

import Break from './break';
import Watch from './watch';
import Home from './home';
import styles from './myComponents/common/header/header/header.style';
import { COLORS, icons, images, FONT, SIZES } from './constants';
import { ScreenHeaderBtn, TimeSlider, SessionBtn } from './myComponents';

const Stack = createNativeStackNavigator();

function App() {
    // State variable appIsReady tracks when app is ready to render
    const [appIsReady, setAppIsReady] = useState(false);

    // Load fonts
    const [fontsLoaded] = useFonts({
        MontBold: require('./assets/fonts/Montserrat-Bold.ttf'),
        MontMed: require('./assets/fonts/Montserrat-Medium.ttf'),
        MontReg: require('./assets/fonts/Montserrat-Regular.ttf'),
      });
    
    // useEffect hook calls prepare function
    useEffect(() => {
        async function prepare() {
            try {
                // Keeps SplashScreen visible until the app is ready
                await SplashScreen.preventAutoHideAsync();
            } catch (error) {
                // If line above results in an error, error logs to console
                console.warn(error);
            } finally {
                setAppIsReady(true);

                if (fontsLoaded) {
                    await SplashScreen.hideAsync();
                }
            }
        }
        prepare();
    }, [fontsLoaded]);

    // useCallback creates a memoized callback onLayoutRootView that only changes appIsReady / fontsLoaded changes
    const onLayoutRootView = useCallback(async () => {
        if (appIsReady && fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady, fontsLoaded]);
        
        if (!appIsReady || !fontsLoaded) {
            return null;
        }

    return (
        <NavigationContainer onLayout={onLayoutRootView}>
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Group screenOptions={{
                        headerStyle: { backgroundColor: COLORS.lightBeige },
                        headerShadowVisible: true,
                        headerLeft: () => (
                            <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
                        ),
                        headerTitle: () => (
                            <Text style={styles.headerStyle}>
                                Flowtime
                            </Text>
                        ),
                        headerTitleAlign: 'center',
                    }}>
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Watch" component={Watch} />
                    <Stack.Screen name="Break" component={Break} />
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;

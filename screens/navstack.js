import React from 'react';
import { Text, View, Alert, TouchableOpacity } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { getAuth } from 'firebase/auth';

import Profile from './profile';
import Statistics from './statistics';
import Tags from './tags';
import Settings from './settings';
import About from './about';
import HomeStack from './homestack';
import styles from '../myComponents/common/header/header/header.style';
import { ScreenHeaderBtn } from '../myComponents';
import { COLORS, FONT, icons } from '../constants';

const Drawer = createDrawerNavigator();

export default function NavStack() {
    const [appIsReady, setAppIsReady] = useState(false);

    const [fontsLoaded] = useFonts({
        MontBold: require('../assets/fonts/Montserrat-Bold.ttf'),
        MontMed: require('../assets/fonts/Montserrat-Medium.ttf'),
        MontReg: require('../assets/fonts/Montserrat-Regular.ttf'),
    });

    useEffect(() => {
        async function prepare() {
            try {
                await SplashScreen.preventAutoHideAsync();
            } catch (error) {
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

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady && fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady, fontsLoaded]);

    if (!appIsReady || !fontsLoaded) {
        return null;
    }

    const auth = getAuth();

    const logoutConfirmation = async () => {
        try {
          await auth.signOut();
          console.log('User signed out!');
        } catch (error) {
          console.error('Error signing out: ', error);
        }
    };

    function CustomDrawerContent(props) {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <TouchableOpacity
                style={styles.logoutTO}
                title="Logout"
                onPress={() => 
                Alert.alert(
                  'Logout',
                  'Are you sure you want to logout?',
                  [
                    {
                      text: 'Cancel',
                      style: 'cancel', 
                    },
                    {
                      text: 'OK',
                      onPress: logoutConfirmation,
                    },
                  ],
                )
              }
            >
                <Text style={styles.logoutDrawerText}>Logout</Text>
            </TouchableOpacity>
          </DrawerContentScrollView>
        );
      }

    return (
        <NavigationContainer onLayout={onLayoutRootView}>
            <Drawer.Navigator
                drawerContent={(props) => <CustomDrawerContent {...props} />}
                initialRouteName="Main"
                backBehavior='initialRoute'
                screenOptions={({ route }) => ({
                    headerStyle: {
                        backgroundColor: COLORS.lightBeige,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                    },
                    headerLeft: () => {
                        const navigation = useNavigation();
                        return (
                            <View style={styles.backButton}>
                                <ScreenHeaderBtn
                                    iconUrl={icons.left}
                                    dimension='60%'
                                    title='goBack'
                                    onPress={() => navigation.navigate('Main')}
                                />
                            </View>
                        )
                    },
                    headerTitle: route.name,
                    headerTitleAlign: 'center',
                    headerTitleStyle: styles.headerStyle,
                    headerShadowVisible: true,
                    drawerStyle: {
                        backgroundColor: COLORS.lightBeige,
                        width: 180,
                    },
                    drawerLabelStyle: {
                        color: COLORS.themeColor,
                        fontFamily: FONT.medium,
                    },
                    drawerActiveTintColor: 'gray',
                })}
            >
                <Drawer.Screen name="Main" children={(props) => <HomeStack {...props} />} options={{ drawerItemStyle: { height: 0 }, headerShown: false }} />
                <Drawer.Screen name="Profile" component={Profile} options={{ headerTitle: 'Profile' }} />
                <Drawer.Screen name="Statistics" component={Statistics} options={{ headerTitle: 'Statistics' }} />
                <Drawer.Screen name="Tags" component={Tags} options={{ headerTitle: 'Tags' }} />
                <Drawer.Screen name="Settings" component={Settings} options={{ headerTitle: 'Settings' }} />
                <Drawer.Screen name="About" component={About} options={{ headerTitle: 'About' }} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
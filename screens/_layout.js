// import { useState, useEffect, useCallback } from 'react';
// import { SplashScreen } from 'expo-router';
// import { useFonts } from 'expo-font';
// import { Drawer } from '@react-navigation/drawer';

// const Layout = () => {
//     // State variable appIsReady tracks when app is ready to render
//     const [appIsReady, setAppIsReady] = useState(false);

//     // Load fonts
//     const [fontsLoaded] = useFonts({
//         MontBold: require('../assets/fonts/Montserrat-Bold.ttf'),
//         MontMed: require('../assets/fonts/Montserrat-Medium.ttf'),
//         MontReg: require('../assets/fonts/Montserrat-Regular.ttf'),
//     });

//     // useEffect hook calls prepare function
//     useEffect(() => {
//         async function prepare() {
//             try {
//                 // Keeps SplashScreen visible until the app is ready
//                 await SplashScreen.preventAutoHideAsync();
//             } catch (error) {
//                 // If line above results in an error, error logs to console
//                 console.warn(error);
//             } finally {
//                 setAppIsReady(true);

//                 if (fontsLoaded) {
//                     await SplashScreen.hideAsync();
//                 }
//             }
//         }
//         prepare();
//     }, [fontsLoaded]);

//     // useCallback creates a memoized callback onLayoutRootView that only changes appIsReady / fontsLoaded changes
//     const onLayoutRootView = useCallback(async () => {
//         if (appIsReady && fontsLoaded) {
//             await SplashScreen.hideAsync();
//         }
//     }, [appIsReady, fontsLoaded]);

//     if (!appIsReady || !fontsLoaded) {
//         return null;
//     }
// }

// export default Layout;
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import AuthStack from './authStack';
import NavStack from '../screens/navstack';

import { COLORS } from '../constants';

export default function RootNavigation() {
    const { user } = useAuthentication();

    return (
        <>
            <StatusBar backgroundColor={COLORS.lightbeige} />
            {user ? <NavStack /> : <AuthStack />}
        </>
    );
}
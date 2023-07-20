import React from 'react';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import AuthStack from './authStack';
import NavStack from '../screens/navstack';

export default function RootNavigation() {
    const { user } = useAuthentication();

    return user ? <NavStack /> : <AuthStack />;
}
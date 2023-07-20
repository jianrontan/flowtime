import React from 'react';
import './config/firebase';
import { ThemeProvider } from '@react-navigation/native';
import RootNavigation from './navigation';

function App() {
    return (
        <ThemeProvider>
            <RootNavigation />
        </ThemeProvider>
    );
};

export default App;

import React from 'react';
import './config/firebase';
import { ThemeProvider } from '@react-navigation/native';
import RootNavigation from './navigation';
import { Provider } from 'react-redux';
import { Store } from './redux/store';

function App() {
    return (
        <Provider store={Store}>
            <ThemeProvider>
                <RootNavigation />
            </ThemeProvider>
        </Provider>
    );
};

export default App;

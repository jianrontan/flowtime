import { Text } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from './home';
import Watch from './watch';
import Break from './break';
import { ScreenHeaderBtn } from "../myComponents";
import stylesHead from '../myComponents';
import { COLORS, icons } from '../constants';

const Stack = createNativeStackNavigator();

export default function HomeStack({ navigation }) {
    return (
        <Stack.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerStyle: { backgroundColor: COLORS.lightBeige },
                headerLeft: () => (
                    <ScreenHeaderBtn
                        iconUrl={icons.menu}
                        dimension="60%"
                        onPress={() => navigation.openDrawer()}
                    />
                ),
                headerTitle: () => (
                    <Text style={stylesHead.headerStyle}>Flowtime</Text>
                ),
                headerTitleAlign: 'center',
            }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Watch" component={Watch} />
            <Stack.Screen name="Break" component={Break} />
        </Stack.Navigator>
    );
}
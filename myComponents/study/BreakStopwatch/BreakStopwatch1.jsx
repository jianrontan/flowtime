import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button } from 'react-native';

const BreakStopwatch1 = ({ fraction, startStopwatch }) => {
    const [counter, setCounter] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (startStopwatch) {
            intervalRef.current = setInterval(() => {
                // Update 'counter' every second, but it can be adjusted to your needs.
                setCounter(counter => counter + fraction);
            }, 1000);
        }

        return () => {
            clearInterval(intervalRef.current);
        };
    }, [startStopwatch, fraction]);

    const hours = Math.floor(counter / 3600);
    const minutes = Math.floor((counter - hours * 3600) / 60);
    const seconds = Math.floor(counter % 60);
    const milliseconds = Math.floor(counter % 1000)

    return (
        <View style={{ alignItems: 'center', padding: 20 }}>
            <Text>Time: {`${hours}h ${minutes}m ${seconds}s`}</Text>
            <Button title="pause" onPress={() => { clearInterval(intervalRef.current); }}/>
        </View>
    );
};

export default BreakStopwatch1;

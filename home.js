import { useState, useEffect } from 'react';
import { View, ScrollView, SafeAreaView, Text, Button } from 'react-native';

import { COLORS, icons, images, FONT, SIZES } from './constants';
import { TimeSlider, SessionBtn } from './myComponents';

function Home({navigation}) {
    const [sliderValue, setSliderValue] = useState(10);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightBeige }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, padding: SIZES.medium, }}>

                    <View style={{ alignItems: 'center', padding: SIZES.xLarge }}>
                        <SessionBtn onPress={() => {
                            navigation.reset({
                                index: 0,
                                routes: [{
                                    name: 'Watch', 
                                    params: { sliderValue: sliderValue, startStopwatch: true }
                                }],
                            })
                        }}/>
                    </View>
                    <View style={{ alignItems: 'center', padding: SIZES.xLarge }}>
                        <TimeSlider sliderValue={sliderValue} setSliderValue={setSliderValue} />
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;

import React, { Component, useState } from 'react';
import { View, ScrollView, SafeAreaView, Text } from 'react-native';

import styles from "./TimeSlider.style"
import Slider from '@react-native-community/slider';
import { COLORS, SIZES } from '../../../constants';

const TimeSlider = ({ sliderValue, setSliderValue }) =>{
    return(
        <View style={{ alignItems:'center' }}>
            <Text style={styles.breakStyle}>Break Allowance/hr: {sliderValue} min</Text>
            <Slider
                style={styles.sliderStyle}
                thumbTintColor={COLORS.themeColor}
                value={sliderValue}
                onValueChange={value => setSliderValue(parseInt(value))}
                step={1}
                minimumValue={1}
                maximumValue={60}
                minimumTrackTintColor={COLORS.darkThemeColor}
                maximumTrackTintColor={COLORS.lightThemeColor}
            />
        </View>
    )
}

export default TimeSlider;

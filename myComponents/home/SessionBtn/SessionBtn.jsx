import React from "react";
import { TouchableOpacity, Text, View } from "react-native";

import styles from "./SessionBtn.style";

const SessionBtn = ({ dimension, onPress }) => {
    return (
        <TouchableOpacity activeOpacity={0.69} style={styles.btnContainer} onPress={onPress}>
            <View>
                <Text style={styles.textStyle}>Start Session</Text>
            </View>
        </TouchableOpacity>
    )
}

export default SessionBtn;

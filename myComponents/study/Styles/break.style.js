import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
    container: {
        width: 80,
        height: 40,
        backgroundColor: COLORS.themeColor,
        borderRadius: SIZES.small / 1.25,
        borderWidth: 1.5,
        borderColor: COLORS.white,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontFamily: FONT.medium,
        fontSize: SIZES.smallmedium,
        color: COLORS.white,
    },
    headerText: {
        fontFamily: FONT.bold,
        fontSize: SIZES.xLarge,
        color: COLORS.themeColor,
    },
})

export default styles;
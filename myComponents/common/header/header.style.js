import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants"

export const stylesHead = StyleSheet.create({
    container: {
        width: "100%",
    },
    headerStyle: {
        fontFamily: FONT.bold,
        fontSize: SIZES.large,
        color: COLORS.themeColor,
    },
    backButton: {
        paddingLeft: 10,
    },
    logoutTO: {
        paddingTop: SIZES.mediumlarge,
        paddingLeft: SIZES.mediumlarge,
    },
    logoutDrawerText: {
        color: COLORS.themeColor,
        fontFamily: FONT.medium,
    },
})
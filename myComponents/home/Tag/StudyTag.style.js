import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const tagStyles = StyleSheet.create({
    text: {
        fontFamily: FONT.medium,
        fontSize: SIZES.medium,
        color: COLORS.themeColor,
        padding: 8,
    },
    inputView: {
        paddingLeft: SIZES.medium,
        paddingTop: SIZES.large,
    },
    inputView2: {
        paddingLeft: 8,
        borderColor: COLORS.sepGrayBeige,
        borderWidth: 1,
        borderRadius: SIZES.medium/1.25,
        backgroundColor: COLORS.lightBeige,
        width: 256,
    },
    inputText: {
        fontFamily: FONT.regular,
        fontSize: SIZES.smallmedium,
        color: "black",
    },
    buttonStyle: {
        paddingRight: SIZES.medium,
        paddingTop: 25,
    },
    buttonTextStyle: {
        fontFamily: FONT.medium,
        fontSize: SIZES.smallmedium,
        color: COLORS.themeColor,
    },
    tagButton: {
        width: 120,
        height: 30,
        backgroundColor: COLORS.darkBeige,
        borderRadius: SIZES.xxLarge / 1.25,
        borderWidth: 0,
        borderColor: COLORS.themeColor,
        alignItems: "center",
        justifyContent: "center",
    },
    tagText: {
        color: COLORS.themeColor,
        fontFamily: FONT.medium,
        fontSize: SIZES.smallmedium,
    },
    dropdownText:{
        fontFamily: FONT.medium,
        fontSize: SIZES.medium,
        color: COLORS.themeColor,
    },
    dropdownOption:{
        borderBottomColor: COLORS.sepGrayBeige,
        borderBottomWidth: 1,
    },
})

export default tagStyles;
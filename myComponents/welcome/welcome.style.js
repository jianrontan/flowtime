import { StyleSheet } from "react-native";

import { COLORS, SIZES, FONT } from "../../constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttons: {
        flex: 1,
    },
    button: {
        width: 80,
        height: 40,
        backgroundColor: COLORS.themeColor,
        borderRadius: SIZES.small / 1.25,
        borderWidth: 1.5,
        borderColor: COLORS.white,
        alignItems: "center",
        justifyContent: "center",
    },
    welcomeText:{
        fontFamily: FONT.bold,
        fontSize: SIZES.large,
        color: COLORS.themeColor,
    },
    errorText:{
        fontFamily: FONT.regular,
        fontSize: 11,
        color: COLORS.errorRed,
        paddingLeft: 8,
        paddingBottom: SIZES.medium,
    },  
    signupView:{
        paddingTop: SIZES.mediumlarge,
        paddingBottom: SIZES.xLarge,
        paddingLeft: 8,
    },
    signupInput:{
        fontFamily: FONT.regular,
        fontSize: SIZES.small,
    },
    signupButton:{
        width: 80,
        height: 40,
        backgroundColor: COLORS.lightBeige,
        borderRadius: SIZES.small / 1.25,
        borderWidth: 1.5,
        borderColor: COLORS.themeColor,
        alignItems: "center",
        justifyContent: "center",
    },  
    signupText:{
        fontFamily: FONT.bold,
        fontSize: SIZES.smallmedium,
        color: COLORS.themeColor,
    },
    resetButton: {
        width: 160,
        height: 40,
        backgroundColor: COLORS.lightBeige,
        borderRadius: SIZES.small / 1.25,
        borderWidth: 1.5,
        borderColor: COLORS.themeColor,
        alignItems: "center",
        justifyContent: "center",
    },
    noAccountText: {
        fontFamily: FONT.regular,
        fontSize: SIZES.small,
        color: COLORS.themeColor,
    },
    forgotText: {
        fontFamily: FONT.regular,
        fontSize: SIZES.small,
        color: COLORS.linkBlue,
    },
    text: {
        fontFamily: FONT.medium,
        fontSize: SIZES.smallmedium,
        color: COLORS.lightBeige,
    },
  });

export default styles;
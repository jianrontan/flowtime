import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    headerStyle: {
        fontFamily: FONT.bold,
        fontSize: SIZES.large,
        color: COLORS.themeColor,
    },
})

export default styles;
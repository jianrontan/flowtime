import { StyleSheet } from "react-native";

import { COLORS, SIZES, FONT } from "../../../constants";

const styles = StyleSheet.create({
  btnContainer: {
    width: 200,
    height: 60,
    backgroundColor: COLORS.themeColor,
    borderRadius: SIZES.large / 1.25,
    borderWidth: 1.5,
    borderColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    fontFamily: FONT.medium,
    fontSize: SIZES.smallmedium,
    color: COLORS.white,
  }
});

export default styles;

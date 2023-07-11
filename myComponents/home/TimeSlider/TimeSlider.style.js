import { StyleSheet } from "react-native";

import { COLORS, SIZES, FONT } from "../../../constants";

const styles = StyleSheet.create({
  sliderStyle: {
    width: 200,
    height: 40,
  },
  breakStyle: {
      fontFamily: FONT.regular,
      fontSize: 11,
      color: "gray",
  },
});

export default styles;
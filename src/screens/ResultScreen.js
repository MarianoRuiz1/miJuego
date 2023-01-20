import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import Card from "../components/Card";
import colors from "../constants/colors";
import lose from "../../assets/images/lose.jpg";
import { useFonts } from "expo-font";
import win from "../../assets/images/win.jpg";

const ResultScreen = ({ result }) => {
  const [loaded] = useFonts({
    RobotoCondensed: require("../../assets/fonts/RobotoCondensed-Italic.ttf"),
  });
  const [image, setImage] = useState("");

  useEffect(() => {
    handleImage();
  }, []);

  const handleImage = () => {
    if (result === "win") {
      setImage(win);
      return;
    }
    setImage(lose);
  };
  if (!loaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Card newStyles={{ fontFamily: "RobotoCondensed" }}>
        <Text style={styles.result}>{`you ${result}`}</Text>
      </Card>
      <Image style={styles.imageContainer} source={image} />
    </View>
  );
};

export default ResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  imageContainer: {
    height: 320,
    width: 320,
    marginTop: 50,
  },
  result: {
    color: "#fff",
    fontSize: 30,
    fontFamily: "RobotoCondensed",
  },
});

import { Button, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";

import Card from "../components/Card";
import React from "react";
import colors from "../constants/colors";
import { useFonts } from "expo-font";

const GameScreen = ({ handleResult }) => {
  const [loaded] = useFonts({
    RobotoCondensed: require("../../assets/fonts/RobotoCondensed-Italic.ttf"),
  });
  const [currentGuess, setCurrentGuess] = useState();
  useEffect(() => {
    setCurrentGuess(Math.floor(Math.random() * (99 - 1) + 1));
  }, []);

  if (!loaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.textColor}>GameScreen</Text>
      <Text style={styles.textColor}>{currentGuess}</Text>
      <Card newStyles={styles.buttonContainer}>
        <Button
          title="Menor"
          onPress={() => handleResult("lower", currentGuess)}
        />
        <Button
          title="Mayor"
          onPress={() => handleResult("greater", currentGuess)}
        />
      </Card>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "80%",
    fontFamily: "RobotoCondensed",
  },
  textColor: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "RobotoCondensed",
  },
});

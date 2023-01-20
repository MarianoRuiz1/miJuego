import {
  Button,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import Card from "../components/Card";
import Input from "../components/Input";
import React from "react";
import colors from "../constants/colors";
import { useFonts } from "expo-font";
import { useState } from "react";

const StartGameScreen = ({ onStartGame }) => {
  const [loaded] = useFonts({
    RobotoCondensed: require("../../assets/fonts/RobotoCondensed-Italic.ttf"),
  });
  const [value, setValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState("");
  const handleInput = (text) => {
    console.log(text);
    setValue(text.replace(/[^0-9]/g, ""));
  };
  const handleResetInput = () => {
    setValue("");
  };
  const handleConfirmation = () => {
    const choseNumber = parseInt(value);
    if (choseNumber === NaN || choseNumber <= 0 || choseNumber > 99) return;

    setConfirmed(true);
    setSelectedNumber(choseNumber);
    setValue("");
    Keyboard.dismiss();
  };

  if (!loaded) {
    return null;
  }
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Text style={styles.title}>Start Game</Text>
          <Card newStyles={{ fontFamily: "RobotoCondensed" }}>
            <Text style={styles.subTitle}>Choose a number</Text>
            <Input
              bluronSubmit
              autoCapitalize="none"
              autoCorrect={false}
              maxLenght={2}
              keyboardType="numeric"
              value={value}
              onChangeText={handleInput}
            />
            <View style={styles.buttonContainer}>
              <View style={styles.cleanButton}>
                <Button
                  title="Clean"
                  onPress={handleResetInput}
                  color={"gray"}
                />
              </View>
              <View style={styles.confirmButton}>
                <Button
                  title="Confirm"
                  onPress={handleConfirmation}
                  color={"fff"}
                />
              </View>
            </View>
          </Card>
          {confirmed && (
            <Card newStyles={styles.selectedCard}>
              <Text style={{ color: "white", fontFamily: "RobotoCondensed" }}>
                Your number:
              </Text>
              <Text style={styles.selectedNumber}>{selectedNumber}</Text>
              <View style={styles.confirmButton}>
                <Button
                  title="Start game"
                  color={"fff"}
                  onPress={() => onStartGame(selectedNumber)}
                />
              </View>
            </Card>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default StartGameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    color: "white",
    fontFamily: "RobotoCondensed",
  },
  subTitle: {
    color: "white",
    fontFamily: "RobotoCondensed",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginTop: 20,
  },
  cleanButton: {
    width: 100,
    backgroundColor: colors.diseableColor,
    borderRadius: 10,
  },
  confirmButton: {
    width: 100,
    backgroundColor: colors.actionColor,
    borderRadius: 10,
  },
  selectedCard: {
    marginTop: 50,
    width: "50%",
    fontFamily: "RobotoCondensed",
  },
  selectedNumber: {
    color: "white",
    marginVertical: 20,
    fontSize: 60,
    fontFamily: "RobotoCondensed",
  },
});

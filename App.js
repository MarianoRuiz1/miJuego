import { StyleSheet, View } from "react-native";

import GameScreen from "./src/screens/GameScreen";
import Header from "./src/components/Header";
import ResultScreen from "./src/screens/ResultScreen";
import StartGameScreen from "./src/screens/StartGameScreen";
import { useFonts } from "expo-font";
import { useState } from "react";

export default function App() {
  const [loaded] = useFonts({
    RobotoCondensed: require("./assets/fonts/RobotoCondensed-Bold.ttf"),
  });
  const [userNumber, setUserNumber] = useState();
  const [winOrLose, setWinOrLose] = useState(false);
  const [result, setResult] = useState("");

  const handleStartGame = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };

  const handleFinishGame = (selection, number) => {
    if (
      (selection === "lower" && userNumber < number) ||
      (selection === "greater" && userNumber > number)
    ) {
      setResult("win");
    } else {
      setResult("lose");
    }
    setWinOrLose(true);
  };

  let content = <StartGameScreen onStartGame={handleStartGame} />;

  if (userNumber && winOrLose === true) {
    content = <ResultScreen result={result} />;
  } else if (userNumber) {
    content = <GameScreen handleResult={handleFinishGame} />;
  }

  if (!loaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Header
        title={"Greater or Lesser"}
        newStyles={{ fontFamily: "RobotoCondensed" }}
      />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

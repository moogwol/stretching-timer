import { View, StyleSheet } from "react-native";
import { useContext, useState } from "react";
import { List, Text, IconButton, Button } from "react-native-paper";
import { useColours } from "@/constants/Colors";
import { fetchAllStretches, fetchRandomStretches, fetchStretchByTag } from "@/libraries/http";
import { StretchContext } from "@/app/_layout";
import { router } from "expo-router";
import { NumberPicker } from "@/components/NumberPicker";

const colours = useColours();

export interface Stretch {
  id: number;
  name: string;
}

export default function Index() {

  const [numStretches, setNumStretches] = useState(1);
  const stretchContext = useContext(StretchContext);

  // Check if the context is defined
  if (!stretchContext) {
    throw new Error("StretchContext is not defined");
  }

  const { stretches, setStretches } = stretchContext;



  const handleClickDecrementStretches = async () => {
    numStretches > 1 && setNumStretches(numStretches - 1);
  };

  const handleClickIncrementStretches = async () => {
    setNumStretches(numStretches + 1);
  };

  const handleClickGo = async () => {
    const data = await fetchRandomStretches(numStretches);
    setStretches(data as Stretch[]);
    router.push('/workoutScreen');
  };

  return (
    <View style={styles.container}>
      <NumberPicker title="Number of Stretches"
      decrement={handleClickDecrementStretches}
      increment={handleClickIncrementStretches}
      num={numStretches}
      />
      <Button mode="contained" buttonColor={colours.primary} onPress={handleClickGo} >Go</Button>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colours.secondary,
    color: colours.light,
    padding: 10,
  },
  accordionSection: {
    width: "100%",
    backgroundColor: colours.accent,
    color: colours.light,
  },
  accordion: {
    width: "100%",
    backgroundColor: colours.accent,
    color: colours.light,
  },
  listItem: {
    backgroundColor: colours.accent,
  },
  listItemTitle: {
    color: colours.light,
  },
  text: {

  },
  numberPicker: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
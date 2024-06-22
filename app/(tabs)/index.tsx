import { View, StyleSheet } from "react-native";
import { useState, useEffect, useContext } from "react";
import { Button, Text, useTheme } from "react-native-paper";
import { Colors as colours } from "@/constants/Colors";
import { fetchAllDrills, fetchRandomDrills, fetchJudoDrills } from "@/libraries/http";
import { Audio } from "expo-av";
import { DrillContext } from "@/app/_layout";

export interface Drill {
  id: number;
  name: string;
}



export default function Index() {

  const drillContext = useContext(DrillContext);

  // Check if the context is defined
  if (!drillContext) {
    throw new Error("DrillContext is not defined");
  }

  const { drills, setDrills } = drillContext;

  // Handler for the button to fetch all drills
  const handleClickAllDrills = async () => {
    const data = await fetchAllDrills();
    setDrills(data as Drill[]);
  };

  // Handler for the button to fetch random drills
  const handleClickRandomDrills = async () => {
    const data = await fetchRandomDrills();
    setDrills(data as Drill[]);
  };

  const handleClickJudoDrills = async () => {
    const data = await fetchJudoDrills();
    setDrills(data as Drill[]);
  };



  return (
    <View
      style={styles.container}    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Button mode="outlined" buttonColor={colours.accent} textColor="red" icon='camera' onPress={handleClickAllDrills}>All drills</Button>
      <Button mode="outlined" buttonColor={colours.primary} textColor="red" icon='camera' onPress={handleClickRandomDrills} >Five random drills</Button>
      <Button mode="outlined" buttonColor={colours.accent} textColor="red" icon='cannabis' onPress={handleClickJudoDrills}>Judo</Button>
      <View>
        <Text>Drills</Text>

        {drills.map((drill) => {
          return (
            <View key={drill.id}>
              <Text>{drill.name}</Text>
            </View>
          );
        })}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colours.background,
  },
});
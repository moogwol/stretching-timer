import { View, StyleSheet } from "react-native";
import { useContext } from "react";
import { List } from "react-native-paper";
import { useColours } from "@/constants/Colors";
import { fetchAllDrills, fetchRandomDrills, fetchDrillByTag } from "@/libraries/http";
import { DrillContext } from "@/app/_layout";
import { router } from "expo-router";

const colours = useColours();

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
    router.push('/workoutScreen');
  };

  // Handler for the button to fetch random drills
  const handleClickRandomDrills = async () => {
    const data = await fetchRandomDrills();
    setDrills(data as Drill[]);
    router.push('/workoutScreen');

  };

  const handleClickJudoDrills = async () => {
    const data = await fetchDrillByTag('judo');
    setDrills(data as Drill[]);
    router.push('/workoutScreen');

  };

  const handleClickBasicDrills = async () => {
    const data = await fetchDrillByTag('basic');
    setDrills(data as Drill[]);
    router.navigate('/workoutScreen');
  };



  return (
    <View style={styles.container}>
      <List.Section style={styles.accordion}>
      <List.Accordion title="Choose your drills" titleStyle={styles.accordion} style={styles.accordion} >
        <List.Item style={styles.listItem}
          titleStyle={styles.listItemTitle}
          title="All drills"
          onPress={handleClickAllDrills}
        />
        <List.Item style={styles.listItem}
          titleStyle={styles.listItemTitle}
          title="Five random drills"
          onPress={handleClickRandomDrills}
        />
        <List.Item style={styles.listItem}
          titleStyle={styles.listItemTitle}
          title="Judo"
          onPress={handleClickJudoDrills}
        />
        <List.Item style={styles.listItem}
          titleStyle={styles.listItemTitle}
          title={["Basic", "Drills"]}
          onPress={handleClickBasicDrills}
        />
      </List.Accordion>
      </List.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colours.background,
    color: colours.light,
    padding: 10,
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
});
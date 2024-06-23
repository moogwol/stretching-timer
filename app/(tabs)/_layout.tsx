import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs screenOptions={{tabBarActiveTintColor: 'blue'}} >
      <Tabs.Screen
       name="index"
       options={{
          tabBarLabel: "Home",
          headerTitle: "Home",        
       }}
       />
      <Tabs.Screen name="workoutScreen"
      options={{
        tabBarLabel: "Workout",
        headerTitle: "Workout",
      }} />
    </Tabs>
  );
}

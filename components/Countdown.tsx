import { View, StyleSheet } from "react-native";
import { Text, IconButton } from "react-native-paper";
import { useState, useEffect } from "react";
import { formattedTime } from "@/libraries/utility";


type CountdownProps = {
    seconds: string;
    minutes: string;
};

// // if the seconds are greater than 60, convert the seconds to minutes and seconds
// export const formattedTime = (seconds: number) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${formattedMinutes(minutes)} : ${formattedSeconds(remainingSeconds)}`;
// }

// // if the seconds are less than 10, add a zero in front of the seconds
// const formattedSeconds = (seconds: number) => {
//     return seconds < 10 ? `0${seconds}` : seconds;
// }

// // if the minutes are less than 10, add a zero in front of the minutes
// const formattedMinutes = (minutes: number) => {
//     return minutes < 10 ? `0${minutes}` : minutes;
// }

export default function Countdown(props: CountdownProps) {

    return (
        <View style={styles.buttonContainer} >
            <Text variant="displayLarge">{formattedTime(parseInt(props.seconds))}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
});
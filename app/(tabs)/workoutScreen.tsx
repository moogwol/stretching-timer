import { View, StyleSheet, Dimensions, FlatList, Animated } from 'react-native';
import { useState, useRef, useEffect, useContext, useCallback } from 'react';
import { IconButton, Button, Text } from 'react-native-paper';
import Countdown from '@/components/Countdown';
import { useColours } from '@/constants/Colors';
import { playSingleBell } from '@/libraries/sounds';
import { formattedTime } from '@/libraries/utility';
import StretchCard from '@/components/StretchCard';
import { useFocusEffect } from 'expo-router';
import { StretchContext } from '../_layout';

const colours = useColours();

export default function workoutScreen() {

    const [currentStretch, setCurrentStretch] = useState(0);
    const [workoutTime, setWorkoutTime] = useState("0");
    const [restTime, setRestTime] = useState("0");
    const [seconds, setSeconds] = useState("0");
    const [isRunning, setIsRunning] = useState(false);
    const [isResting, setIsResting] = useState(false);


    // Contexts
    const stretchContext = useContext(StretchContext);
    if (!stretchContext) {
        throw new Error("StretchContext is not defined");
    }
    const { stretches, setStretches } = stretchContext;



    // Constants
    const windowWidth = Dimensions.get('window').width;
    const stretchCount = stretches ? stretches.length : 0;
    const DATA = stretches
    const colours = useColours();



    // refs
    const listRef = useRef<FlatList>(null); // a ref to the FlatList component
    const isRunningRef = useRef(isRunning); // a ref to store the isRunning state
    const initialRender = useRef(true); // a ref to store the initial render state

    // useEffect to update the isRunningRef.current value when the isRunning state changes
    useEffect(() => {
        isRunningRef.current = isRunning;
    }, [isRunning]);

    // useEffect to reset isResting to false when the screen is focused
    useFocusEffect(
        useCallback(() => {
            // This code runs when the screen is focused
            setIsResting(false);

            return () => {
                // This code runs when the screen goes out of focus
                // Optional: Reset any states if needed when leaving the screen
            };
        }, [])
    );


    // a function which counts down the seconds to zero
    const doCountDown = (seconds: string) => {

        // if the isRunning state is false, return
        if (!isRunningRef.current) {
            return;
        }

        const interval = setInterval(() => {
            setSeconds(prevSeconds => {

                // if the seconds are zero, clear the interval and return zero
                if (prevSeconds === "0") {
                    clearInterval(interval);
                    return "0";
                }

                // if the ifRunning state is false, clear the interval
                if (!isRunningRef.current) {
                    clearInterval(interval);
                    return prevSeconds;
                }

                // if the seconds are greater than zero, decrement the seconds by one
                return (parseInt(prevSeconds) - 1).toString();
            });

        }, 1000);
        return () => clearInterval(interval);
    };

    // a function to render the slide deck of stretches
    const renderSlideDeck = () => {
        return (
            <Animated.FlatList style={{ flex: 1 }}
                data={DATA}
                ref={listRef}
                keyExtractor={(_, index) => index.toString()}
                horizontal
                getItemLayout={(data, index) => (
                    { length: windowWidth, offset: windowWidth * index, index }
                )}
                renderItem={({ item }) => <View style={{ width: windowWidth }} ><StretchCard style={styles.card}
                    title={!isResting ? item.name : "Rest"}
                    nextStretch={isResting ? getNextStretch() : undefined}
                /></View>}
            />)
    }


    // Start the countdown when the isRunning state is true
    useEffect(() => {
        // isResting ? setSeconds(restTime) : setSeconds(workoutTime);
        doCountDown(seconds);
    }, [isRunning]);


    const goToNextStretch = () => {
        listRef.current?.scrollToIndex({ index: currentStretch + 1 });
        setCurrentStretch(currentStretch + 1);
        console.log(currentStretch);
    }

    const goToPreviousStretch = () => {
        listRef.current?.scrollToIndex({ index: currentStretch - 1 });
        setCurrentStretch(currentStretch - 1);
    }

    // Get the name of next stretch
    const getNextStretch = () => {
        if (currentStretch === stretchCount - 1) {
            return "End of workout";
        } else {
            return stretches[currentStretch + 1].name;
        }
    }

    // Increment and decrement the workout and rest times
    const incrementWorkSeconds = () => {
        setIsResting(false);
        setWorkoutTime((parseInt(workoutTime) + 30).toString());
    }

    const decrementWorkSeconds = () => {
        parseInt(workoutTime) >= 30 &&
            setWorkoutTime((parseInt(workoutTime) - 30).toString());
    }

    const incrementRestSeconds = () => {
        setRestTime((parseInt(restTime) + 10).toString());
    }

    const decrementRestSeconds = () => {
        parseInt(restTime) >= 10 &&
            setRestTime((parseInt(restTime) - 10).toString());
    }

    // Switch between rest and stretch countdowns
    useEffect(() => {
        // if the seconds are zero and the current stretch is less than the stretch count and the isResting state is false
        // set the isResting state to true and set the seconds to 10
        if (seconds === "0" && currentStretch < stretchCount - 1 && !isResting) {
            setIsResting(true);
            setSeconds(restTime);
        }
        // if the seconds are zero and the current stretch is less than the stretch count and the isResting state is true
        if (seconds === "0" && currentStretch < stretchCount - 1 && isResting) {
            setIsResting(false);
            goToNextStretch();
            setSeconds(workoutTime);
        }
        // if the seconds are zero and the current stretch is equal to the stretch count and the isResting state is false
        if (seconds === "0" && currentStretch === stretchCount - 1 && !isResting) {
            // setIsResting(true);
            setIsRunning(false);
            setSeconds(restTime);
        }
        // if the seconds are zero and the current stretch is equal to the stretch count and the isResting state is true
        if (seconds === "0" && currentStretch === stretchCount - 1 && isResting) {
            setIsResting(false);
            setSeconds(workoutTime);
        }
    }, [seconds])



    // Play a sound when the seconds are zero except on the initial render  
    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
        } else if (seconds === "0" && isRunning) {
            playSingleBell();
            console.log("Sound played");
        }
    }, [seconds]);


    // User input and button functions

    // Set the time to the round time
    useEffect(() => {
        if (!isResting) {
            setSeconds(workoutTime);
        }
    }, [workoutTime])


    const handleClickNext = () => {
        goToNextStretch();
    }

    const handleClickPrevious = () => {
        goToPreviousStretch();
    }


    // Start or stop the countdown when the start / stop button is clicked
    const handleClickStartStop = () => {
        setIsRunning(!isRunning);
    }

    const handleClickReset = () => {
        setSeconds(workoutTime);
    }

    // Disable the next and previous buttons when the current stretch is at the beginning or end of the stretch list
    const nextButtonDisabled = () => {
        return currentStretch === stretchCount - 1;
    }

    const previousButtonDisabled = () => {
        return currentStretch === 0;
    }


    return (
        <View style={styles.container} >
            <View style={styles.slideContainer}>
                {renderSlideDeck()}
            </View>
            <View style={styles.buttonContainer}>
                <IconButton disabled={previousButtonDisabled()} size={30} style={styles.button} rippleColor={colours.light} icon={'arrow-left-bold-outline'} iconColor={colours.light} containerColor={colours.accent} onPress={handleClickPrevious} />
                <IconButton disabled={nextButtonDisabled()} size={30} mode='contained-tonal' style={styles.button} rippleColor={colours.light} icon={'arrow-right-bold-outline'} iconColor={colours.light} containerColor={colours.accent} onPress={handleClickNext} />
            </View>
            <View style={styles.countdown}>
                <Countdown minutes='00' seconds={seconds} />
            </View>


            <View style={styles.timeInputContainer}>
                <View style={styles.timeInput} >
                    <Text>Round</Text>
                    <IconButton size={30} icon={'minus-thick'} onPress={decrementWorkSeconds} disabled={parseInt(workoutTime) < 30} />
                    <Text >{formattedTime(parseInt(workoutTime))}</Text>
                    <IconButton size={30} icon={'plus-thick'} onPress={incrementWorkSeconds} />
                </View>
                <View style={styles.timeInput}>
                    <Text>Rest</Text>
                    <IconButton size={30} icon={'minus-thick'} onPress={decrementRestSeconds} disabled={parseInt(restTime) < 10} />
                    <Text >{formattedTime(parseInt(restTime))}</Text>
                    <IconButton size={30} icon={'plus-thick'} onPress={incrementRestSeconds} />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Button buttonColor={colours.secondary} onPress={handleClickStartStop} mode='contained' >{isRunning ? "Stop" : "Start"}</Button>
                </View>
                <View style={styles.button}>
                    <Button buttonColor={colours.secondary} onPress={handleClickReset} mode='contained' >Reset</Button>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colours.secondary,
        flex: 1,
        justifyContent: "flex-start",
    },
    slideContainer: {
        flex: 3,
    },
    card: {
        flex: 2,
        backgroundColor: colours.primary,
        borderColor: colours.secondary,
        borderWidth: 5,
    },
    buttonContainer: {
        // flex: 1,
        flexDirection: "row",
        justifyContent: "center",
    },
    button: {
        margin: 10,
        padding: 10,
        color: colours.secondary,
    },
    timeInputContainer: {
        alignItems: "center",
    },
    timeInput: {
        flexDirection: "row",
        alignItems: "center",
    },
    countdown: {
        justifyContent: "center",
        alignItems: "center",
    },
});
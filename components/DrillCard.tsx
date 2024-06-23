import { Card, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
// import { Colors as colours } from "@/constants/Colors";
import { useColours } from "@/constants/Colors";

type DrillCardProps = {
    title: string;
    style: any;
    nextDrill?: string;
};

const colours = useColours();


export default function DrillCard(props: DrillCardProps) {
    return (
        <Card style={[styles.card, props.style]}>
            <View style={styles.titleContainer}>
                <Text style={styles.title} >{props.title}</Text>
            </View>
            <Card.Content style={styles.content} >
                {props.nextDrill && <Text variant="titleMedium" style={styles.text} >Next: {props.nextDrill}</Text>}
            </Card.Content>
        </Card>
    )
}

const styles = StyleSheet.create({
    card: {
        width: "100%",
        height: 300,
        justifyContent: "center",
    },
    titleContainer: {
        alignSelf: "center",
        width: "90%",
    },
    title: {
        fontSize: 60,
        textAlign: "center",
        color: colours.bold,
    },
    content: {
        alignItems: "center",
    },
    text: {
        marginTop: 20,
        color: colours.light,
        fontStyle: "italic",
        fontSize: 30,
        
    }
});
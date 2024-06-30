import { supabase, Stretch } from "@/constants/Supabase";


// Function to add a 'left' tag to the name of a stretch
function addLeftTag(stretch: Stretch) {
    return ({
        ...stretch,
        name: stretch.name + " (left)",
    });   
}

// Function to add a 'right' tag to the name of a stretch
function addRightTag(stretch: Stretch) {
    return ({
        ...stretch,
        name: stretch.name + " (right)",
    });
}



// function to duplicate an element of an array if it is double_sided
function duplicateArrayElements(array: Stretch[]) {
    return array.flatMap((item) =>
        item.double_sided === true ? [addLeftTag(item), addRightTag(item)] : [item]
    );
}

// Function to shuffle an array
function shuffleArray(array: Stretch[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


// Fetch all stretches from the database
const fetchAllStretches = async () => {
    try {
        const { data, error } = await supabase.from('stretches').select("*");
        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error fetching stretches: ", error);
    }
}

// Fetch a random selection of 5 stretches from the database
const fetchRandomStretches = async (num: number) => {
    try {
        const { data, error } = await supabase.from('stretches').select("*");
        if (error) throw error;
        const shuffledData = shuffleArray(data);
        const arraySlice = shuffledData.slice(0, num);
        return duplicateArrayElements(arraySlice);
    } catch (error) {
        console.error("Error fetching stretches: ", error);
        return []
    }
}

// Fetch all stretches having the specified tag from the database
const fetchStretchByTag = async (tag: string, num: number) => {
    try {
        const { data, error } = await supabase.from('stretches').select("*").contains('tags', [tag]);
        if (error) throw error;
        const shuffledData = shuffleArray(data);
        const arraySlice = shuffledData.slice(0, num);
        return duplicateArrayElements(arraySlice);
    } catch (error) {
        console.error("Error fetching stretches: ", error);
    }
}

// Fetch random warmup stretches from the database
const fetchWarmupStretches = async (num: number) => {
    try {
        const { data, error } = await supabase.from('warmups').select("*");
        if (error) throw error;
        const shuffledData = shuffleArray(data);
        const arraySlice = shuffledData.slice(0, num);
        return duplicateArrayElements(arraySlice);
    } catch (error) {
        console.error("Error fetching stretches: ", error);
        return []
    }
}

// Create an array with warmup stretches and main stretches
export const createWorkout = async (numWarmup: number, numMain: number) => {
    try {
        const warmupStretches = await fetchWarmupStretches(numWarmup);
        const mainStretches = await fetchRandomStretches(numMain);
        return warmupStretches.concat(mainStretches);
    } catch (error) {
        console.error("Error creating workout: ", error);
    }
}


import { supabase, Stretch } from "@/constants/Supabase";

// function to duplicate each element of an array
function duplicateArrayElements(array: Stretch[]) {
    return array.flatMap((item) => [item, item]);
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
export const fetchAllStretches = async () => {
    try {
        const { data, error } = await supabase.from('stretches').select("*");
        if (error) throw error;
        console.log("Data: ", data);
        return data;
    } catch (error) {
        console.error("Error fetching stretches: ", error);
    }
}

// Fetch a random selection of 5 stretches from the database
export const fetchRandomStretches = async (num: number) => {
    try {
        const { data, error } = await supabase.from('stretches').select("*");
        if (error) throw error;
        const shuffledData = shuffleArray(data);
        const arraySlice = shuffledData.slice(0, num);
        return duplicateArrayElements(arraySlice);
    } catch (error) {
        console.error("Error fetching stretches: ", error);
    }
}  



// Fetch all stretches having the specified tag from the database
export const fetchStretchByTag = async (tag:string, num: number) => {
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


import { supabase, Drill } from "@/constants/Supabase";


// Function to shuffle an array
function shuffleArray(array: Drill[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }


// Fetch all drills from the database
export const fetchAllDrills = async () => {
    try {
        const { data, error } = await supabase.from('drills').select("*");
        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error fetching drills: ", error);
    }
}

// Fetch a random selection of 5 drills from the database
export const fetchRandomDrills = async () => {
    try {
        const { data, error } = await supabase.from('drills').select("*");
        if (error) throw error;
        const shuffledData = shuffleArray(data);
        return shuffledData.slice(0, 5);
    } catch (error) {
        console.error("Error fetching drills: ", error);
    }
}

// Fetch all judo appropriate drills from the database
export const fetchJudoDrills = async () => {
    try {
        const { data, error } = await supabase.from('drills').select("*").eq("judo_appropriate", "TRUE")
        if (error) throw error;
        const shuffledData = shuffleArray(data);
        return shuffledData.slice(0, 5);
    } catch (error) {
        console.error("Error fetching drills: ", error);
    }
}


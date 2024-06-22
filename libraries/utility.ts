// if the seconds are less than 10, add a zero in front of the seconds
const formattedSeconds = (seconds: number) => {
    return seconds < 10 ? `0${seconds}` : seconds;
}

// if the minutes are less than 10, add a zero in front of the minutes
const formattedMinutes = (minutes: number) => {
    return minutes < 10 ? `0${minutes}` : minutes;
}


// if the seconds are greater than 60, convert the seconds to minutes and seconds
export const formattedTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${formattedMinutes(minutes)} : ${formattedSeconds(remainingSeconds)}`;
}
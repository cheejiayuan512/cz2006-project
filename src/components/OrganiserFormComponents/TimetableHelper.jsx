
function dateRangeArrayGenerator(startDate, endDate, steps = 1) {
    const dateArray = [];
    const weekday = new Array(7);
    weekday[0]="Sunday";
    weekday[1]="Monday";
    weekday[2]="Tuesday";
    weekday[3]="Wednesday";
    weekday[4]="Thursday";
    weekday[5]="Friday";
    weekday[6]="Saturday";
    let currentDate = new Date(startDate);
    while (currentDate <= new Date(endDate)) {
        const tempDate = new Date(currentDate)
        dateArray.push(weekday[tempDate.getDay()]);
        // Use UTC date to prevent problems with time zones and DST
        currentDate.setUTCDate(currentDate.getUTCDate() + steps);
    }
    return dateArray;
}
function createOneHourIntervals(from, timeSlots){
    // ...
    const time = new Date("01/01/2001 " + from);
    console.log(time)
    const intervals = []; // more clear name than hours
    for (let i = 0; i < timeSlots;   i++) {
        intervals.push(time.toTimeString().slice(0,5));
        time.setMinutes(time.getMinutes() + 60);
    }
    return intervals;
}

function timeSlotsArrayGenerator(from, timeSlots) {
    return createOneHourIntervals(from, timeSlots);
}


function timeTableArrayGenerator(startDate = "03/08/2021", endDate = "03/14/2021", timeSlots = 7) {
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);
    // To calculate the time difference of two dates
    const Difference_In_Time = date2.getTime() - date1.getTime();

// To calculate the no. of days between two dates
    const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    const cells = [];
    for (let i = 0; i <= timeSlots  ; i++){
        const tempArray = Array.from({length: Difference_In_Days+2}, i => i = false)
        cells.push(tempArray);
        }
    return cells;
}
export {dateRangeArrayGenerator , timeTableArrayGenerator , timeSlotsArrayGenerator};

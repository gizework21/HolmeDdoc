import moment from 'moment';

const DayMapping = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
};

const AbbreviateDayMapping = {
    0: 'Sun',
    1: 'Mon',
    2: 'Tue',
    3: 'Wed',
    4: 'Thur',
    5: 'Fri',
    6: 'Sat'
};

const MonthMapping = {
    0: 'Jan',
    1: 'Feb',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'Aug',
    8: 'Sept',
    9: 'Oct',
    10: 'Nov',
    11: 'Dec'
};

const transformDateMonthValue = (v) => (v < 10 ? '0' + v : v);

const addDays = (startDate, days) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + days);
    return date;
};

const getDates = (startDate, stopDate) => {
    const dateArray = [];
    let currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(new Date(currentDate));
        currentDate = addDays(currentDate, 1);
    }
    return dateArray;
};

const checkDateAvailable = (ts) => ts.length > 0 && ts.some(t => t.status !== "Not Available");

export const combineVisitTypeAndTransform = (timeslots) => {
    if (!timeslots['InPerson'] && !timeslots['Virtual']) return;

    const inPersonTs = [...timeslots['InPerson']];
    const virtualTs = [...timeslots['Virtual']];
    const combinedTs = [];
    
    for (let i = 0; i < 7; i++) {
        const inPersonValue = inPersonTs[i]?.value;
        const virtualValue = virtualTs[i]?.value;

        combinedTs[i] = {
            day: inPersonTs[i]?.day,
            date: inPersonTs[i]?.date,
            value: {
                "InPerson": inPersonValue ? [{
                    id: inPersonValue.id,
                    from: inPersonValue.from,
                    to: inPersonValue.to,
                    status: inPersonValue.status,
                    slot_time: inPersonValue.slot_time || [] // Ensure this exists
                }] : [],
                "Virtual": virtualValue ? [{
                    id: virtualValue.id,
                    from: virtualValue.from,
                    to: virtualValue.to,
                    status: virtualValue.status,
                    slot_time: virtualValue.slot_time || [] // Ensure this exists
                }] : []
            }
        };
        
    }
    return transformAvailability2(combinedTs);
};

export const transformAvailability2 = (availabilityObj = []) => {
    if (!availabilityObj) return [];

    return availabilityObj.reduce((acc, el) => {
        const newObj = {};
        const dayId = moment(el.date).day();
        newObj.day = AbbreviateDayMapping[dayId];
        newObj.id = acc.length;
        newObj.date = moment(el.date).date();
        newObj.isAvailable = checkDateAvailable(el.value.InPerson) || checkDateAvailable(el.value.Virtual);
        newObj.month = MonthMapping[moment(el.date).month()];
        newObj.fullDate = el.date;
        newObj.computedDate = el.date;

        newObj.inPersonTimeSlots = el.value.InPerson.map(item => ({
            id: item.id,
            time: `${item.from} - ${item.to}`, // Changed to reflect new structure
            isAvailable: item.status.toLowerCase() !== "booked",
            type: 'InPerson',
            slots: Object.entries(item.slot_time).map(([slotKey, slot]) => ({
                start_time: slot.start_time,
                end_time: slot.end_time,
                status: slot.status
            }))
        }));
        
        newObj.virtualTimeSlots = el.value.Virtual.map(item => ({
            id: item.id,
            time: `${item.from} - ${item.to}`, // Changed to reflect new structure
            isAvailable: item.status.toLowerCase() !== "booked",
            type: 'Virtual',
            slots: Object.entries(item.slot_time).map(([slotKey, slot]) => ({
                start_time: slot.start_time,
                end_time: slot.end_time,
                status: slot.status
            }))
        }));
        
        acc.push(newObj);
        return acc;
    }, []);
};

export const transformAvailability = (availabilityObj = []) => {
    if (!availabilityObj) return [];
    const increaseAvailability = [...availabilityObj];
    const futureDates = getDates(new Date(), addDays(new Date(), 100));
    let temp = 0;

    return increaseAvailability.reduce((acc, el) => {
        const newObj = {};
        for (let i = 0; i < futureDates.length; i++) {
            if (temp > i) continue;
            const futureDate = futureDates[i];
            temp = temp + 1;
            const dayId = futureDate.getDay();
            const currentDay = DayMapping[dayId];
            if (currentDay === el.day) {
                newObj.day = AbbreviateDayMapping[dayId];
                newObj.id = acc.length;
                newObj.date = futureDate.getDate();
                newObj.isAvailable = checkDateAvailable(el.value);
                newObj.month = MonthMapping[futureDate.getMonth()];
                newObj.fullDate = el.date;
                newObj.timeSlots = el.value.map(item => ({
                    id: item.id,
                    time: `${item.from} - ${item.to}`, // Changed to reflect new structure
                    isAvailable: item.status.toLowerCase() !== "booked"
                }));
                acc.push(newObj);
                break;
            }
        }
        return acc;
    }, []);
};



export function t24Convert12(time) {
    const [hours, mins] = time.split(':');
    const meridian = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
    const formattedMins = mins.padStart(2, '0');
    return `${formattedHours}:${formattedMins} ${meridian}`;
}

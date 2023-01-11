export const checkIfItsOnThisWeek = (appointmentDate, currentWeek) => {
    const appointmDateStr = dateToString(appointmentDate);
    const sundayStr = dateToString(currentWeek.sunday);
    const mondayStr = dateToString(currentWeek.monday);
    const tuesdayStr = dateToString(currentWeek.tuesday);
    const wednesdayStr = dateToString(currentWeek.wednesday);
    const thurstdayStr = dateToString(currentWeek.thurstday);
    const fridayStr = dateToString(currentWeek.friday);
    const saturdayStr = dateToString(currentWeek.saturday);

    if (appointmDateStr === sundayStr || 
        appointmDateStr === mondayStr || 
        appointmDateStr === tuesdayStr || 
        appointmDateStr === wednesdayStr || 
        appointmDateStr === thurstdayStr || 
        appointmDateStr === fridayStr || 
        appointmDateStr === saturdayStr) {
        return true
    } else {
        return false
    }
}

const dateToString = (date) => {
    const year = new Date(date).getUTCFullYear();
    const month = new Date(date).getUTCMonth();
    const day = new Date(date).getUTCDate();
    const string =`${year} + ${month} + ${day}`;
    return string;
}
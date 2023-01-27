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

export const getCurrentWeekDates = () => {

    const today = new Date();
    const todayGetDate = today.getDay();
    const currentDayOfMonth = today.getDate();
    let weekdays;
    switch (todayGetDate) {
        case 0:
            weekdays = {
                monday: new Date(new Date().setDate(currentDayOfMonth - 6)),
                tuesday: new Date(new Date().setDate(currentDayOfMonth - 5)),
                wednesday: new Date(new Date().setDate(currentDayOfMonth - 4)),
                thurstday: new Date(new Date().setDate(currentDayOfMonth - 3)),
                friday: new Date(new Date().setDate(currentDayOfMonth - 2)),
                saturday: new Date(new Date().setDate(currentDayOfMonth - 1)),
                sunday: new Date()
            }
            return weekdays;
        case 1:
            weekdays = {
                monday: new Date(),
                tuesday: new Date(new Date().setDate(currentDayOfMonth + 1)),
                wednesday: new Date(new Date().setDate(currentDayOfMonth + 2)),
                thurstday: new Date(new Date().setDate(currentDayOfMonth + 3)),
                friday: new Date(new Date().setDate(currentDayOfMonth + 4)),
                saturday: new Date(new Date().setDate(currentDayOfMonth + 5)),
                sunday: new Date(new Date().setDate(currentDayOfMonth + 6))
            }
            return weekdays;
        case 2:
            weekdays = {
                monday: new Date(new Date().setDate(currentDayOfMonth - 1)),
                tuesday: new Date(),
                wednesday: new Date(new Date().setDate(currentDayOfMonth + 1)),
                thurstday: new Date(new Date().setDate(currentDayOfMonth + 2)),
                friday: new Date(new Date().setDate(currentDayOfMonth + 3)),
                saturday: new Date(new Date().setDate(currentDayOfMonth + 4)),
                sunday: new Date(new Date().setDate(currentDayOfMonth + 5))
            }
            return weekdays;
        case 3:
            weekdays = {
                monday: new Date(new Date().setDate(currentDayOfMonth - 2)),
                tuesday: new Date(new Date().setDate(currentDayOfMonth - 1)),
                wednesday: new Date(),
                thurstday: new Date(new Date().setDate(currentDayOfMonth + 1)),
                friday: new Date(new Date().setDate(currentDayOfMonth + 2)),
                saturday: new Date(new Date().setDate(currentDayOfMonth + 3)),
                sunday: new Date(new Date().setDate(currentDayOfMonth + 4))
            }
            return weekdays;
        case 4:
            weekdays = {
                monday: new Date(new Date().setDate(currentDayOfMonth - 3)),
                tuesday: new Date(new Date().setDate(currentDayOfMonth - 2)),
                wednesday: new Date(new Date().setDate(currentDayOfMonth - 1)),
                thurstday: new Date(),
                friday: new Date(new Date().setDate(currentDayOfMonth + 1)),
                saturday: new Date(new Date().setDate(currentDayOfMonth + 2)),
                sunday: new Date(new Date().setDate(currentDayOfMonth + 3))
            }
            return weekdays;
        case 5:
            weekdays = {
                monday: new Date(new Date().setDate(currentDayOfMonth - 4)),
                tuesday: new Date(new Date().setDate(currentDayOfMonth - 3)),
                wednesday: new Date(new Date().setDate(currentDayOfMonth - 2)),
                thurstday: new Date(new Date().setDate(currentDayOfMonth - 1)),
                friday: new Date(),
                saturday: new Date(new Date().setDate(currentDayOfMonth + 1)),
                sunday: new Date(new Date().setDate(currentDayOfMonth + 2))
            }
            return weekdays;
        case 6:
            weekdays = {
                monday: new Date(new Date().setDate(currentDayOfMonth - 5)),
                tuesday: new Date(new Date().setDate(currentDayOfMonth - 4)),
                wednesday: new Date(new Date().setDate(currentDayOfMonth - 3)),
                thurstday: new Date(new Date().setDate(currentDayOfMonth - 2)),
                friday: new Date(new Date().setDate(currentDayOfMonth - 1)),
                saturday: new Date(),
                sunday: new Date(new Date().setDate(currentDayOfMonth + 1))
            }
            return weekdays;
        default: 
            weekdays = {
                monday: new Date(),
                tuesday: new Date(),
                wednesday: new Date(),
                thurstday: new Date(),
                friday: new Date(),
                saturday: new Date(),
                sunday: new Date(),
            }
            return weekdays;
    }
}
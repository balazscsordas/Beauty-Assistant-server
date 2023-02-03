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

export const checkIfItsOnThisMonth = (date) => {
    const currentMonth = new Date().getMonth();
    if (date.getMonth() === currentMonth) {
        return true;
    }
    return false;
}

export const checkIfItsOnToday = (date) => {
    const currentDay = new Date().getDate();
    if (date.getDate() === currentDay) {
        return true;
    }
    return false;
}

export const countStatsByPeriod = (appointmentArray) => {
    let failedAppointments = 0;
    let estimatedIncome = 0;
    let clientArray = [];
    appointmentArray.map((appointment) => {
        appointment.status === 'failure' && failedAppointments++;
        if (appointment.status === 'pending' || appointment.status === 'success') {
            estimatedIncome = estimatedIncome + appointment.servicePrice;
        }
        if (!clientArray.includes(appointment.clientId)) {
            clientArray.push(appointment.clientId);
        }
    })
    const allAppointments = appointmentArray.length;
    const allClients = clientArray.length;

    return {
        allAppointments,
        failedAppointments,
        estimatedIncome,
        allClients,
    }
}

export const getDailyIncomePerWeek = (appointmentArray) => {
    let mondayIncome = 0;
    let tuesdayIncome = 0;
    let wednesdayIncome = 0;
    let thurstdayIncome = 0;
    let fridayIncome = 0;
    let saturdayIncome = 0;
    let sundayIncome = 0;
    appointmentArray.map((appointment) => {
        switch (appointment.date.getDay()) {
            case 0:
                sundayIncome = sundayIncome + appointment.servicePrice;
                break;
            case 1:
                mondayIncome = mondayIncome + appointment.servicePrice;
                break;
            case 2:
                tuesdayIncome = tuesdayIncome + appointment.servicePrice;
                break;
            case 3:
                wednesdayIncome = wednesdayIncome + appointment.servicePrice;
                break;
            case 4:
                thurstdayIncome = thurstdayIncome + appointment.servicePrice;
                break;
            case 5:
                fridayIncome = fridayIncome + appointment.servicePrice;
                break;
            case 6:
                saturdayIncome = saturdayIncome + appointment.servicePrice;
                break;
            default:
                break;
        }
    })
    return [
        mondayIncome,
        tuesdayIncome,
        wednesdayIncome,
        thurstdayIncome,
        fridayIncome,
        saturdayIncome,
        sundayIncome,
    ]
}

export const getMonthlyIncomePerYear = (appointmentArray) => {
    let januaryIncome = 0;
    let februaryIncome = 0;
    let marchIncome = 0;
    let aprilIncome = 0;
    let mayIncome = 0;
    let juneIncome = 0;
    let julyIncome = 0;
    let augIncome = 0;
    let septIncome = 0;
    let oktIncome = 0;
    let novIncome = 0;
    let decIncome = 0;
    appointmentArray.map((appointment) => {
        if (appointment.status === 'pending' || appointment.status === 'success') {
            switch (appointment.date.getMonth()) {
                case 0:
                    januaryIncome = januaryIncome + appointment.servicePrice;
                    break;
                case 1:
                    februaryIncome = februaryIncome + appointment.servicePrice;
                    break;
                case 2:
                    marchIncome = marchIncome + appointment.servicePrice;
                    break;
                case 3:
                    aprilIncome = aprilIncome + appointment.servicePrice;
                    break;
                case 4:
                    mayIncome = mayIncome + appointment.servicePrice;
                    break;
                case 5:
                    juneIncome = juneIncome + appointment.servicePrice;
                    break;
                case 6:
                    julyIncome = julyIncome + appointment.servicePrice;
                    break;
                case 7:
                    augIncome = augIncome + appointment.servicePrice;
                    break;
                case 8:
                    septIncome = septIncome + appointment.servicePrice;
                    break;
                case 9:
                    oktIncome = oktIncome + appointment.servicePrice;
                    break;
                case 10:
                    novIncome = novIncome + appointment.servicePrice;
                    break;
                case 11:
                    decIncome = decIncome + appointment.servicePrice;
                    break;
                default:
                    break;
            }
        }
    })
    return [
        januaryIncome,
        februaryIncome,
        marchIncome,
        aprilIncome,
        mayIncome,
        juneIncome,
        julyIncome,
        augIncome,
        septIncome,
        oktIncome,
        novIncome,
        decIncome,
    ]
}
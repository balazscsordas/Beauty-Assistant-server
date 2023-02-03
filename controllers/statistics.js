import Appointment from "../models/Appointment.js";
import { checkIfItsOnThisMonth, checkIfItsOnThisWeek, checkIfItsOnToday, countStatsByPeriod, getCurrentWeekDates, getDailyIncomePerWeek, getMonthlyIncomePerYear } from "./utils.js";

export const getFirstFetchStats = async (req, res) => {
    try {
        const adminId = req._id;
        const currentWeek = getCurrentWeekDates();
        const foundAppointments = await Appointment.find({ adminId: adminId }, 'clientId date status adminId servicePrice');
        let todayAppointments = []
        let thisWeekAppointments = []
        let thisMonthAppointments = []
        foundAppointments.map(appointment => {
            if (checkIfItsOnToday(appointment.date)) {
                todayAppointments.push(appointment);
            }
            if (checkIfItsOnThisWeek(appointment.date, currentWeek)) {
                thisWeekAppointments.push(appointment);
            }
            if (checkIfItsOnThisMonth(appointment.date)) {
                thisMonthAppointments.push(appointment);
            }
        })
        const todayData = countStatsByPeriod(todayAppointments);
        const weekData = countStatsByPeriod(thisWeekAppointments);
        const monthData = countStatsByPeriod(thisMonthAppointments);
        const incomePerDay = getDailyIncomePerWeek(thisWeekAppointments);
        const incomePerMonth = getMonthlyIncomePerYear(foundAppointments);
        res.status(200).json({ todayData, weekData, monthData, incomePerDay, incomePerMonth })
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}
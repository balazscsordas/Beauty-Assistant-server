import Salon from "../models/Salon.js";
import Service from "../models/Service.js";
import Appointment from "../models/Appointment.js";
import { checkIfItsOnThisWeek, getCurrentWeekDates } from "./utils.js";
import { notifyAdminAboutNewAppointmentRequest, notifyClientAboutAppointmentRequest } from "./email.js";

/* GET SALON LIST */
export const getSalonList = async (req, res) => {
    try {
        const searchData = req.query.data;
        const foundSalons = await Salon.find({ name: { $regex: `${searchData}`, $options:'i' }});
        res.status(200).json({ foundSalons });
      }
      catch (err) {
        res.status(500).json({ error: err.message });
      }
}

/* GET SERVICE LIST */
export const getServiceList = async (req, res) => {
  try { 
      const adminId = req.query.adminId;
      const foundServices = await Service.find({ adminId }, 'name price time adminId');
      res.status(200).json({ foundServices });
    }
    catch (err) {
      res.status(500).json({ error: err.message });
    }
}

/* GET FIRST FETCH APPOINTMENT LIST */
export const getFirstAppointmentList = async (req, res) => {
  try {
      const currentWeek = getCurrentWeekDates();
      const adminId = req.query.adminId;
      const foundAppointments = await Appointment.find({ adminId: adminId }, 'serviceTime date time')
      const firstFetchAppointments = [];
      foundAppointments.map(appointment => {
          if (checkIfItsOnThisWeek(appointment.date, currentWeek) === true) {
              firstFetchAppointments.push(appointment);
          }
      })
      res.status(200).json({ currentWeek, firstFetchAppointments });
  } catch(err) {
      res.status(500).json({ error: err.message });
  }
}

/* POST BOOK APPOINTMENT DATA */
export const postBookAppointmentData = async (req, res) => {
  try {
      const bookAppointmentData = req.body.data;
      const lang = req.body.lang;
      /* const foundAppointments = await Appointment.find({ adminId: adminId }, 'serviceTime date time') */
      
      res.status(200).json({ message: "Emails have been sent" });
  } catch(err) {
      res.status(500).json({ error: err.message });
  }
}
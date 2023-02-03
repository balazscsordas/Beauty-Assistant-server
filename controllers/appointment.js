import Appointment from "../models/Appointment.js";
import Service from "../models/Service.js";
import Client from "../models/Client.js";
import { checkIfItsOnThisWeek, getCurrentWeekDates } from "./utils.js";

/* GET FIRST FETCH APPOINTMENT LIST */
export const getFirstFetchAppointmentList = async (req, res) => {
    try {
        const currentWeek = getCurrentWeekDates();
        const adminId = req._id;
        const foundAppointments = await Appointment.find({ adminId: adminId })
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

/* GET APPOINTMENT LIST */
export const getAppointmentList = async (req, res) => {
    try {
        const week = req.body.week;
        const adminId = req._id;
        const foundAppointments = await Appointment.find({ adminId: adminId })
        const currentWeekAppointments = [];
        foundAppointments.map(appointment => {
            if (checkIfItsOnThisWeek(appointment.date, week) === true) {
                currentWeekAppointments.push(appointment);
            }
        })
        res.status(200).json({ currentWeekAppointments });
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
}

/* ADD NEW APPOINTMENT */
export const addNewAppointment = async (req, res) => {
    try {
        const adminId = req._id;
        const appointmentData = req.body.data;
        const foundService = await Service.findOne({ _id: appointmentData.serviceId });
        const foundClient = await Client.findOne({ _id: appointmentData.clientId });
        const appointment = new Appointment({
            clientId: appointmentData.clientId,
            clientName: foundClient.name,
            serviceId: foundService._id,
            serviceName: foundService.name,
            serviceTime: foundService.time,
            servicePrice: foundService.price,
            date: appointmentData.date,
            status: appointmentData.status,
            time: appointmentData.time,
            adminId,
            discount: appointmentData.discount,
            commentForClient: appointmentData.commentForClient,
            commentForAdmin: appointmentData.commentForAdmin,
        })
        const savedAppointment = await appointment.save();
        res.status(200).json({ savedAppointment, message: "Appointment has been added" });
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
}

/* MODIFY APPOINTMENT DATA */
export const editAppointment = async (req, res) => {
    try {
        const newAppointmentData = req.body.data;
        const updatedAppointment = await Appointment.updateOne({ _id: newAppointmentData._id }, {
            status: newAppointmentData.status,
            date: newAppointmentData.date,
            time: newAppointmentData.time,
            clientId: newAppointmentData.clientId,
            clientName: newAppointmentData.clientName,
            serviceId: newAppointmentData.serviceId,
            serviceName: newAppointmentData.serviceName,
            serviceTime: newAppointmentData.serviceTime,
            discount: newAppointmentData.discount,
            commentForAdmin: newAppointmentData.commentForAdmin,
            commentForClient: newAppointmentData.commentForClient
        })
        res.status(200).json({ message: "Appointment data has been modified" });
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
}

/* DELETE APPOINTMENT */
export const deleteAppointment = async (req, res) => {
    try {
        const appointmentId = req.body.appointmentId;
        const currentWeek = req.body.currentWeek;
        const deletedAppointment = await Appointment.deleteOne({ _id: appointmentId });
        res.status(200).json({ deletedAppointment, message: "Appointment has been deleted" });
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
}
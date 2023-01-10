import Appointment from "../models/Appointment.js";
import Service from "../models/Service.js";
import Client from "../models/Client.js";

/* GET APPOINTMENT LIST */
export const getAppointmentList = async (req, res) => {
    try {
        const adminId = req._id;
        const foundAppointments = await Appointment.find({ adminId: adminId })
        res.status(200).json({ foundAppointments });
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
            date: appointmentData.date,
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
export const modifyAppointmentData = async (req, res) => {
    try {
        const newAppointmentData = req.body.newAppointmentData;
        const updatedAppointment = Appointment.updateOne({ _id: newAppointmentData._id }, {
            clientId: newAppointmentData.clientId,
            serviceId: newAppointmentData.serviceId,
            date: newAppointmentData.date,
            time: newAppointmentData.time,
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
        const deletedAppointment = await Appointment.deleteOne({ _id: appointmentId });
        res.status(200).json({ message: "Appointment has been deleted" });
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
}
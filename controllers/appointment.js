import Appointment from "../models/Appointment.js";

export const addNewAppointment = async (req, res) => {
    try {
        const adminId = req._id;
        const appointmentData = req.body.data;
        const appointment = new Appointment({
            clientId: appointmentData.clientId,
            serviceId: appointmentData.serviceId,
            date: appointmentData.date,
            hour: appointmentData.hour,
            minute: appointmentData.minute,
            adminId
        })
        const savedAppointment = await appointment.save();
        res.status(200).json({ message: "Appointment has been added" });
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
}
import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    clientId: {
        type: String,
        required: true,
        min: 2
    },
    serviceId: {
        type: String,
        required: true,
        min: 2
    },
    date: {
        type: Date,
        required: true,
        min: 2
    },
    hour: {
        type: Number,
        required: true,
        min: 1
    },
    minute: {
        type: Number,
        required: true,
        min: 1
    },
    adminId: {
        type: String,
        required: true,
        min: 1,
    },
})

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;
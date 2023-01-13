import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    clientId: {
        type: String,
        required: true,
        min: 2
    },
    clientName: {
        type: String,
        required: true,
        min: 1
    },
    serviceId: {
        type: String,
        required: true,
        min: 2
    },
    serviceName: {
        type: String,
        required: true,
        min: 1
    },
    serviceTime: {
        type: Number,
        required: true,
        min: 1
    },
    date: {
        type: Date,
        required: true,
        min: 2
    },
    status: {
        type: String,
        required: true,
        min: 2
    },
    time: {
        type: String,
        required: true,
        min: 1
    },
    adminId: {
        type: String,
        required: true,
        min: 1,
    },
    discount: {
        type: String,
        min: 1,
    },
    commentForClient: {
        type: String,
        min: 1,
    },
    commentForAdmin: {
        type: String,
        min: 1,
    },
})

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;
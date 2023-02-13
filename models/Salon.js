import mongoose from "mongoose";

const salonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    professions: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    city: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    address: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    adminId: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
});

const Salon = mongoose.model('Salon', salonSchema);
export default Salon;
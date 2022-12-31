import mongoose from "mongoose";

const servicesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 1,
    },
    category: {
        type: String,
        required: true,
        min: 1,
    },
    price: {
        type: Number,
        required: true,
        min: 1,
    },
    time: {
        type: Number,
        required: true,
        min: 1,
    },
    description: String,
    steps: String,
    adminId: {
        type: String,
        required: true,
        min: 1,
    },
  })
  
const Service = mongoose.model('Service', servicesSchema);
export default Service;
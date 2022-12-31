import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 2,
    },
    age: {
        type: String,
        required: true,
        min: 1,
    },
    mobileNumber: {
        type: String,
        required: true,
        min: 1,
    },
    allergies: String,
    skinType: String,
    usedCreams: String,
    baseInformation: String,
    adminId: {
        type: String,
        required: true,
        min: 1,
    },
  })
  
  const Client = mongoose.model('Client', clientSchema);
  export default Client;
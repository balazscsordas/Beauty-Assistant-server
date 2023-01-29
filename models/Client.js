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
    email: {
        type: String,
        min: 1,
    },
    mobileNumber: {
        type: String,
        required: true,
        min: 1,
    },
    option1Content: {
        type: String,
    },
    option2Content: {
        type: String,
    },
    option3Content: {
        type: String,
    },
    option4Content: {
        type: String,
    },
    option5Content: {
        type: String,
    },
    adminId: {
        type: String,
    },
  })
  
  const Client = mongoose.model('Client', clientSchema);
  export default Client;
import mongoose from "mongoose";

const giftcardSchema = new mongoose.Schema({
    adminId: {
        type: String,
        required: true,
        min: 2
    }, 
    status: {
        type: String,
        required: true,
    }, 
    identifier: {
        type: String,
        required: true,
        min: 2
    }, 
    amount: {
        type: String,
        required: true,
    }, 
    startDate: {
        type: Date,
        required: true,
    }, 
    endDate: {
        type: Date,
        required: true,
    },
});

const Giftcard = mongoose.model('Giftcard', giftcardSchema);
export default Giftcard;
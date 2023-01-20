import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 2,
    },
    clientOptionNames: {
        option1Name: {
            type: String,
            min: 1,
        },
        option2Name: {
            type: String,
            min: 1,
        },
        option3Name: {
            type: String,
            min: 1,
        },
        option4Name: {
            type: String,
            min: 1,
        },
        option5Name: {
            type: String,
            min: 1,
        },
    },
    refreshToken: String
});

const User = mongoose.model('User', usersSchema);
export default User;
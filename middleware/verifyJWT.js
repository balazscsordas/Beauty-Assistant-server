import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const verifyJWT = (req, res, next) => {
    const adminId = '63d04da8ef25fa036e034d96';
    next();
}

export default verifyJWT;
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const verifyJWT = (req, res, next) => {
    console.log('első' + req.cookies.jwt);
    const jwtToken = req.cookies.jwt;
    if(!jwtToken) {
        res.sendStatus(403);
    }
    jwt.verify(
        jwtToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            req._id = decoded._id;
        }
    );
    next();
}

export default verifyJWT;
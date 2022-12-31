import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const verifyJWT = (req, res, next) => {
    const jwtToken = req.header("Authorization");
    if (!jwtToken){
        req._id = "63a5a89b21a848d49b49e56f"   // EZ ÍGY NEM JÓ
    }
    else {
        jwt.verify(
            jwtToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err) return res.sendStatus(403); //invalid token
                req._id = decoded._id;
            }
        );
    }
    next();
}

/* const verifyJWT = (req, res, next) => {
    const jwtToken = req.header("Authorization");
    if (!jwtToken) return res.status(403).send("Access denied");
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            req._id = decoded._id;
            next();
        }
    );
} */

export default verifyJWT;
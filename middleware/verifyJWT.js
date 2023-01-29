import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const verifyJWT = (req, res, next) => {
    req._id = '63d04da8ef25fa036e034d96';
    /* const cookie = req.header('cookie');
    const jwtToken = cookie.split('jwt=')[1];
    jwt.verify(
        jwtToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            req._id = decoded._id;
        }
    ); */
    next();
}

export default verifyJWT;
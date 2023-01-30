import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const verifyJWT = (req, res, next) => {
    console.log('jwt token ' + req.cookies.jwt);
    const jwtToken = req.cookies.jwt;
    jwt.verify(
        jwtToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            req._id = decoded._id;
            console.log('id: ' + req._id)

        }
    );

    next();
}

export default verifyJWT;
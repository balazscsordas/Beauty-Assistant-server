const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const jwtToken = req.cookies.jwt;
    if (!jwtToken){
        return res.sendStatus(401);
    }
    jwt.verify(
        jwtToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            req.email = decoded.email;
            next();
        }
    );
}

module.exports = verifyJWT;
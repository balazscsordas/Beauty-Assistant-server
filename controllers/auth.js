import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */
export const register = async (req, res) => {
    try {
        const { firstName, email, password } = req.body.registrationData;
        const capitalizedFirstName = firstName.charAt(0).toUpperCase() + string.slice(1);
        const foundUser = await User.findOne({ email: email });
        if(foundUser) return res.status(409).json({ message: "An account is already registered with your email, please log in." });
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            firstName: capitalizedFirstName,
            email,
            password: hashedPassword,
            refreshToken: "",   
          });
        const savedUser = await newUser.save();
        res.status(201).json({ message: "User has been created" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

/* LOGGING IN */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const foundUser = await User.findOne({ email: email });
        if (!foundUser) return res.status(401).json({ message: "User does not exist" });
        const isMatch = await bcrypt.compare(password, foundUser.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });
        const accessToken = jwt.sign({ _id: foundUser._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' });
        const refreshToken = jwt.sign({ _id: foundUser._id }, process.env.REFRESH_TOKEN_SECRET)
        await User.updateOne({ _id: foundUser._id }, { refreshToken: refreshToken });
        const authData = {
            _id: foundUser._id,
            firstName: foundUser.firstName,
            accessToken: accessToken,
        }
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.status(200).json({ authData, message: "Success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

/* REFRESH TOKEN */
export const refresh = (req, res) => {
    const refreshToken = req.cookies.jwt
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshToken.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if(err) return res.status(403).json({ message: "Refresh token credentials are not valid" });
        const accessToken = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' });
        res.status(201).json({ accessToken });
    })
}

/* LOGGING OUT */

export const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.jwt;
        await User.updateOne({ refreshToken: refreshToken }, {refreshToken: "token" });
        res.setHeader('Set-Cookie', 'jwt=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT');
        res.status(200).json({ message: "Token has been deleted" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}
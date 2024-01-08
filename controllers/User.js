import { User } from "../models/User.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
    
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const encryptedPassword = CryptoJS.AES.encrypt(password, "aazzee").toString();

        const newUser = new User({ username, email, password: encryptedPassword });

        const savedUser = await newUser.save();

        const payload = {
            username: savedUser.username,
            email: savedUser.email,
        };

        const secretKey = 'patron';
        const expIn = "5d";

        jwt.sign(payload, secretKey, { expiresIn: expIn }, (error, token) => {
            if (error) {
                return res.status(500).json({ error: 'Failed to generate token' });
            }
            res.status(200).json({message : `${savedUser}+${token}`});
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

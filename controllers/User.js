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

        res.status(200).json(savedUser);

   
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const Login = async (req, res) => {
try{

    const email = req.body.email;

    const user = await User.findOne({ email: email });
    if(!user)
    res.status(404).json({ message:"Email not found"});

    const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        "aazzee"
      );

      const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

      OriginalPassword !== req.body.password && 
      res.status(401).json({message : "verify your password"});

const userConnect = {
    id : user._id,
    username : user.username,
    email : user.email
}
    const secretKey = 'patron';
    const expIn = "5d";

    jwt.sign(userConnect, secretKey, { expiresIn: expIn }, (error, token) => {
        if (error) {
            return res.status(500).json({ error: 'Failed to generate token' });
        }
        res.status(200).json({message : `${token}`});
        console.log(`${token}`);
    });

      

}catch (error) {
    res.status(500).json({ message: error.message });
}
}

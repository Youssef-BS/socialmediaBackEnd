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
    if(email !== "") {
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
        res.status(200).json({token :`${token}` , userConnect });
        console.log(`${token}`);
    });

      
    } else {
        res.status(400).json({invalidForm : 'Complete Form !'})
    }
}catch (error) {
    res.status(500).json({ message: error.message });
}

}

export const getUser = async (req , res)=>{
   
 try {

   const users =   await User.find();
   res.status(200).json({users});

    }catch (error){
        res.status(500).json({message : error.message});
    }
}

export const updateUser = async (req , res)=>{
    const userId = req.params.id;
    const {username , password} = req.body ; 
    
    try {

        const user = await User.findById(userId);
        if(!user)
          res.status(404).json({message : "User not found"});

    const newUser = await User.findByIdAndUpdate(userId , {
        username ,
        password
    },{
        new : true ,
    }
    ) ;

    res.status(200).json({newUser});
    }catch(error){
        res.status(500).json({message : error.message});
    }
}

export const deleteUser = async(req , res)=>{
    
    const userId = req.params.id ; 

    try{
     
        const user = await User.findOneById(userId);
        if(!user)
        res.status(404).json({message : "User not found"});
        await User.findByIdAndDelete(userId);
        res.status(200).json({message : "User deleted"}); 
    
    }catch(error){
        res.status(500).json({message : error.message});
    }
}

export const getOneUser = async (req , res)=>{
    
    const userId = req.params.id ;

    try{
       const user = await User.findOneById(userId);
       if(!user)
        res.status(404).json({message : "User not found"})

     res.status(200).json({user});
    }catch(error){
        res.status(500).json({message : error.message})
    }
}


export const sendInvite = async (req, res) => {
    const userToSendInvite = req.params.idUser;
    const userId = req.params.id;

    try {
        const user = await User.findById(userToSendInvite);
        const Me = await User.findById(userId);

        if (!user)
            return res.status(404).json({ message: "User not found" });

        if (!Me)
            return res.status(404).json({ message: "User not found" });

        if (user.listInvitations.includes(Me._id)) {
            return res.status(409).json({ message: "You are already invited" });
        }

        if (user.friends.includes(Me._id)) {
            return res.status(409).json({ message: "Your friend is already with you" });
        }

        user.listInvitations.push(Me._id);
        await user.save();

        return res.status(200).json({ message: "Invitation sent successfully" });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const fetchListUsersSentInvite = async (req , res)=>{
    const userId = req.params.id ; 
    try{
     
        const usersFound = [] ;
        const user = await User.findById(userId);
        if(!user)
          res.status(404).json({message:"User not found"});
        
        for(const users of user.listInvitations) {
            const oneUser = await User.findById(users);
            usersFound.push(oneUser);
        }

        console.log(user.listInvitations);
        res.status(200).json({usersFound});

    }catch(error){
        res.status(500).json({message:error.message});
    }
}


export const acceptInvite = async (req, res) => {
    const userId = req.params.id;
    const userInvite = req.params.idUser;

    try {
        const user = await User.findById(userId);
        const userInviteMe = await User.findById(userInvite);

        if (!user)
            return res.status(404).json({ message: "User not found" });

        if (!user.listInvitations.includes(userInvite)) {
            return res.status(404).json({ message: 'Invite not found' });
        }

        const i = user.listInvitations.indexOf(userInvite);
        user.listInvitations.splice(i, 1);
        user.friends.push(userInvite);
        userInviteMe.friends.push(userId);

        await user.save();
        await userInviteMe.save();

        return res.status(200).json({ message: "Invite accepted" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



export const mutalFreinds = async (req , res)=>{
  
   const userId = req.params.id;
   const userSelect = req.params.userSelect; 
   const informationForUsers = [];
   
   try {

    const user = await User.findById(userId);
    const userChoosed = await User.findById(userSelect);

    if(!user)
    return  res.status(404).json({message:"user not found"});

    if(!userChoosed)
    return res.status(404).json({message:"User selected not found"});

    
   const user1 = user.friends ;
   const user2 = userChoosed.friends;
    
    var mutal = user1.filter(user => user2.includes(user));
     
    const sum = mutal.length;

    for(const user of mutal){
        const userFind = await User.findById(user);
        informationForUsers.push(userFind);
    }

   return res.status(200).json({informationForUsers , sum});

    }catch(error){
        res.status(500).json({message : error.message});
    }
}


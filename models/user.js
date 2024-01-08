import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username :{
        type : String , 
        required:true
       },
       email : {
        type : String , 
        required : true , 
       },
       password : {
         type : String,
         required: true,
         minlength: [8 , "password must be 8 caracteres long"]
       },

    });


export const User = mongoose.model("User" , userSchema);
import mongoose from "mongoose";

export const connectToDataBase= async ()=>{
try{
const {connexion} = await mongoose.connect();
console.log(`MongDB connected : ${connection.host}`)
}catch(error){
    console.log(error.message);
}
}

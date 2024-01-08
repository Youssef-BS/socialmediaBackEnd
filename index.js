import express from 'express';
import { createServer } from 'http';
import mongoose from "mongoose";
import User from "./routes/User.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cors());

const server = createServer(app);

const PORT = 4000;


//connect to data base
const connectToDataBase = async () => {
    try{
    const {connection} = await mongoose.connect("mongodb://localhost:27017");
    console.log(`MongDB connected : ${connection.host}`)
    }catch(error){
        console.log(error.message);
    }
    }

connectToDataBase();

app.use("/api/users" , User);

server.listen(PORT , ()=>{
console.log(`Server connected on port ${PORT}`);
})



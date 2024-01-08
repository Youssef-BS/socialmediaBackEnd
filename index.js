import express from 'express';
import { createServer } from 'http';
import { connectToDataBase } from './config/dataBase';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));

const server = createServer(app);

const PORT = 4000;

connectToDataBase(); 

server.listen(PORT , ()=>{
console.log(`Server connected on port ${PORT}`);
})



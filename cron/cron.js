import cron from "node-cron";
import { User } from "../models/User.js";

export function createCron (){

async function deleteDuplicateUserInvitation  () {
  const listUsers = [] ;
  const listInformationsUsers = [];  
  const users = await User.find();
  
  for(const user of users){
    const userFind = await User.findById(user);
    listUsers.push(userFind);   
  }
  for(const user of listUsers){
     const users = await User.findById(user);
     listInformationsUsers.push(users);  
  }

  for(const i=0 ; i<listInformationsUsers.length ; i++){
    for(const j=0 ;j<listUsers.length ; j++){
  }
  }

cron.schedule('* * * * *', () => {
        deleteDuplicateUserInvitation();
        console.log('1min')
        });
}
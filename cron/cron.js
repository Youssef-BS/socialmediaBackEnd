import cron from "node-cron";
import { User } from "../models/User.js";

export function createCron() {
  async function deleteDuplicateUserInvitation() {
    const users = await User.find();
 

    for (const user of users) {
      for (let i = 0; i < user.listInvitations.length; i++) {
        const invitation = user.listInvitations[i];
        if (user.listInvitations.indexOf(invitation) !== i) {
          user.listInvitations.splice(i, 1);
          i--; 
          await user.save();
        }
      }
    }
  }

  cron.schedule('0 0 * * *', () => {
    deleteDuplicateUserInvitation();
    console.log('Every minute');
  });
}

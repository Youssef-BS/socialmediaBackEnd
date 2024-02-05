import express from "express";
import { Register , Login , acceptInvite , sendInvite , fetchListUsersSentInvite} from "../controllers/User.js";

const router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/acceptInvite/:id/:idUser").post(acceptInvite);
router.route("/sendInvite/:id/:idUser").post(sendInvite);
router.route("/peopleSenMeInvitation/:id").get(fetchListUsersSentInvite);


export default router ; 


import express from "express";
import { addPost , getPostUser , deletePost, editPost} from "../controllers/Post.js";

const router = express.Router();

router.route("/:id").get(getPostUser);
router.route("/addPost/:id").post(addPost);
router.route("/deletePost/:id/:postId").delete(deletePost);
router.route("/editPost/:id/:postId").put(editPost);

export default router ; 
import { Router } from "express";
import { NewPost } from "../utils/schema";
import { PostController } from "../controllers/postsControllers";
import multer from "../middlewares/multer";

const routePosts = Router();

routePosts.post("/post", multer.array("images"), new PostController().newPost);
routePosts.get("/post", new PostController().get);

export default routePosts;

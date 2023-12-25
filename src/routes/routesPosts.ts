import { Router } from "express";
import { PostController } from "../controllers/postsControllers";
import multer from "../middlewares/multer";

const routePosts = Router();

routePosts.post("/post", multer.array("images"), new PostController().newPost);
routePosts.get("/posts", new PostController().get);

export default routePosts;

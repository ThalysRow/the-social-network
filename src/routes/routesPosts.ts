import { Router } from "express";
import { PostController } from "../controllers/postsControllers";
import multer from "../middlewares/multer";
import { validateUpdatePost } from "../middlewares/validatePost";

const routePosts = Router();

routePosts.post("/post", multer.array("images"), new PostController().newPost);
routePosts.get("/posts", new PostController().get);
routePosts.get("/post/:id", new PostController().show);
routePosts.patch("/post/:id", validateUpdatePost, new PostController().update);

export default routePosts;

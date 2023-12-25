import { Router } from "express";
import { PostController } from "../controllers/postsControllers";
import multer from "../middlewares/multer";
import { validateUpdatePost } from "../middlewares/validatePost";

const routePosts = Router();

routePosts.post("/post", multer.array("images"), new PostController().newPost);
routePosts.get("/post", new PostController().get);
routePosts.get("/post/:id", new PostController().show);
routePosts.patch("/post/:id", validateUpdatePost, new PostController().update);
routePosts.delete("/post/:id", validateUpdatePost, new PostController().delete);
routePosts.patch("post/:id/like", new PostController().likePost);
routePosts.patch("/post/:id/coment", new PostController().comentPost);

export default routePosts;

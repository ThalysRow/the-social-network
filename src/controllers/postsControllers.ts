import { Request, Response } from "express";
import Post from "../models/post";
import { uploadFile } from "../services/upload";
import { listenPosters } from "../utils/postFunctions";

interface CustomRequest extends Request {
  userId?: number;
}

export class PostController {
  async newPost(req: CustomRequest, res: Response) {
    const { description } = req.body;
    const files = req.files as Express.Multer.File[];
    try {
      const images = await Promise.all(
        files.map(async (file) => {
          const img = await uploadFile(
            `posts/${file.originalname}`,
            file.buffer,
            file.mimetype
          );
          return img;
        })
      );

      const newPost = await Post.create({
        user_id: req.userId,
        description,
        images,
        likes: [],
        comments: [],
      });
      return res.status(201).json(newPost);
    } catch (error) {
      return res.status(500).json({ message: "Erro in new post" });
    }
  }

  async get(req: Request, res: Response) {
    try {
      const posts = await listenPosters(res);
      return res.json(posts);
    } catch (error) {
      return res.status(500).json({ message: "Erro in get posters" });
    }
  }
}

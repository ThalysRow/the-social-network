import { Request, Response } from "express";
import Post from "../models/post";
import { uploadFile } from "../services/upload";
import { comentPost, likePost, listenPosters } from "../utils/postFunctions";

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

  async show(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      return res.json(post);
    } catch (error) {
      return res.status(500).json({ message: "Erro in show post" });
    }
  }

  async update(req: Request, res: Response) {
    const { description } = req.body;
    const { id } = req.params;
    try {
      await Post.updateOne({ _id: id }, { description });
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ message: "Erro in update post" });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await Post.deleteOne({ _id: id });
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ message: "Erro in delete post" });
    }
  }

  async likePost(req: CustomRequest, res: Response) {
    try {
      await likePost(req, res);
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ message: "Erro in like post" });
    }
  }

  async comentPost(req: CustomRequest, res: Response) {
    try {
      await comentPost(req, res);
    } catch (error) {
      return res.status(500).json({ message: "Erro in coment post" });
    }
  }
}

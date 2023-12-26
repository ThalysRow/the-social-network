import { Request, Response, NextFunction } from "express";
import Post from "../models/post";
interface CustomRequest extends Request {
  userId?: number;
}

export const validateNewPost =
  (joischema: any) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await joischema.validateAsync(req.body);
      next();
    } catch (error) {
      if (
        error !== null &&
        typeof error === "object" &&
        "message" in error &&
        error.message === "string"
      ) {
        return res.status(400).json({ message: error.message });
      }
    }
  };

export const validateUpdatePost = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (String(post.user_id) !== String(req.userId)) {
      return res.status(403).json({ message: "Not authorized" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "Erro in validate update post" });
  }
};

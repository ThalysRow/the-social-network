import { Request, Response } from "express";
import Post from "../models/post";
import { Types } from "mongoose";

interface CustomRequest extends Request {
  userId?: number;
}

export const listenPosters = async (res: Response) => {
  try {
    const posts = await Post.aggregate([
      {
        $unwind: {
          path: "$comments",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "comments.user_id",
          foreignField: "_id",
          as: "comments.user",
        },
      },
      {
        $unwind: {
          path: "$comments.user",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$_id",
          comments: {
            $push: "$comments",
          },
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "_id",
          as: "postDetails",
        },
      },
      {
        $unwind: {
          path: "$postDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          "postDetails.comments": "$comments",
        },
      },
      {
        $replaceRoot: {
          newRoot: "$postDetails",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $addFields: {
          User: {
            $first: "$user",
          },
        },
      },
      {
        $addFields: {
          likes: {
            $cond: {
              if: { $isArray: "$likes" },
              then: { $size: "$likes" },
              else: 0,
            },
          },
        },
      },
    ]);

    const data = [];
    for (const post of posts) {
      data.push({
        post_id: post._id,
        user_id: post.user_id,
        description: post.description,
        images: post.images,
        likes: post.likes,
        createAt: post.createAt,
        comments: post.comments,
      });
    }

    return data;
  } catch (error) {
    return res.status(500).json({ message: "Erro in listen posters" });
  }
};

export const likePost = async (req: CustomRequest, res: Response) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.likes && Array.isArray(post.likes)) {
      const likeExist = post.likes.find((like) => Number(like) === req.userId);

      if (likeExist) {
        await Post.updateOne(
          { _id: id },
          {
            $pull: {
              likes: req.userId,
            },
          }
        );
        return res.status(204).json();
      }

      await Post.updateOne(
        { _id: id },
        {
          $push: {
            likes: req.userId,
          },
        }
      );
    }
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: "Erro in function like post" });
  }
};

export const comentPost = async (req: CustomRequest, res: Response) => {
  const { id } = req.params;
  const { description } = req.body;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    await Post.updateOne(
      { _id: id },
      {
        $push: {
          comments: {
            _id: new Types.ObjectId(),
            user_id: new Types.ObjectId(req.userId),
            description,
          },
        },
      }
    );
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: "Erro in function coment post" });
  }
};

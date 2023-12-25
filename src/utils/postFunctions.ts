import { Request, Response } from "express";
import Post from "../models/post";
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

    return posts;
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

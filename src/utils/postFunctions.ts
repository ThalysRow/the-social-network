import { Request, Response } from "express";
import Post from "../models/post";

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

import { Schema, Types, model } from "mongoose";

const Post = new Schema({
  user_id: Types.ObjectId,
  description: String,
  images: [String],
  likes: [Types.ObjectId],
  createAt: Date,
  comments: [
    {
      _id: Types.ObjectId,
      user_id: Types.ObjectId,
      description: String,
      createAt: Date,
    },
  ],
});

export default model("Post", Post);

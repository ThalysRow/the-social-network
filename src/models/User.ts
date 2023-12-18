import { Schema, model } from "mongoose";

const User = new Schema({
  name: String,
  email: String,
  user_name: String,
  password: String,
  photo: String,
  createdAt: Date,
});

export default model("User", User);

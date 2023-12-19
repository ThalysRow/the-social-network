import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";

interface CustomRequest extends Request {
  userId?: number;
}

export const validateUserCreate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, user_name } = req.body;
  try {
    const userExist = await User.findOne({
      $or: [{ email }, { user_name }],
    });

    if (userExist) {
      return res.status(400).json({ message: "Username or email in use" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Erro in validate create user" });
  }
};

export const validateBodyUser =
  (joinschema: any) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await joinschema.validateAsync(req.body);
      next();
    } catch (error) {
      if (
        error !== null &&
        typeof error === "object" &&
        "message" in error &&
        typeof error.message === "string"
      ) {
        return res.status(400).json({ message: error.message });
      }
    }
  };

export const validateLoginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const userFind = await User.findOne({ email });

    if (!userFind) {
      return res.status(400).json({ message: "email or password invalid" });
    }
    const pass = userFind.password;
    const passCompare = await bcrypt.compare(password, pass as string);

    if (!passCompare) {
      return res.status(400).json({ message: "email or password invalid" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Error in validate login user" });
  }
};

export const validateUpdateUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { name, email, user_name, password, photo } = req.body;

  if (!name && !email && !user_name && !password && !photo) {
    return res
      .status(400)
      .json({ message: "You must enter at least one piece of data" });
  }
  try {
    const userFind = User.findById(req.userId);

    if (!userFind) {
      return res.status(404).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Erro in validate update user" });
  }
};

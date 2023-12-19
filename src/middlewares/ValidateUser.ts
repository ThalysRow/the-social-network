import { Request, Response, NextFunction } from "express";
import User from "../models/User";

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

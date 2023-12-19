import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user";
interface CustomRequest extends Request {
  userId?: number;
}

export const authentication = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      return res.status(401).json({ message: "User not authentication" });
    }

    const token = authorization.split(" ")[1];
    const user = jwt.verify(
      token,
      process.env.JWT_PASS as string
    ) as JwtPayload;
    req.userId = user.id;

    const userFind = User.findById(req.userId);
    if (!userFind) {
      return res.status(404).json({ message: "User not found" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "Erro in authentication" });
  }
};

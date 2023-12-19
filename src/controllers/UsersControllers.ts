import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import { formateData } from "../utils/UserFunctions";

export class UserController {
  async create(req: Request, res: Response) {
    const { name, email, user_name, password, photo } = req.body;
    try {
      const passCrypt = await bcrypt.hash(password, 10);

      await User.create({
        name: formateData(name),
        email,
        user_name: formateData(user_name),
        password: passCrypt,
        photo,
        createdAt: new Date(),
      });

      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ message: "Erro in create user" });
    }
  }
}

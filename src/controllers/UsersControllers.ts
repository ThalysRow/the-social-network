import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import { findUser, formateData } from "../utils/userFunctions";
import jwt from "jsonwebtoken";

interface CustomRequest extends Request {
  userId?: number;
}

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

  async login(req: Request, res: Response) {
    const { email } = req.body;
    try {
      const user = await findUser(email);
      const userId = user!._id;
      const token = jwt.sign({ id: userId }, process.env.JWT_PASS as string, {
        expiresIn: 60 * 10,
      });

      const userInfo = {
        id: user!._id,
        photo: user!.photo,
        name: user!.name,
        user_name: user!.user_name,
        email: user!.email,
        createAt: user!.createdAt,
      };

      return res.status(201).json({ userInfo, token });
    } catch (error) {
      return res.status(500).json({ message: "Erro in login user" });
    }
  }

  async update(req: CustomRequest, res: Response) {
    const { name, email, user_name, password, photo } = req.body;

    try {
      const user = await User.findById(req.userId);

      const data = {
        name: name ? formateData(name) : user!.name,
        email: email ? email : user!.email,
        user_name: user_name ? formateData(user_name) : user!.user_name,
        password: password ? await bcrypt.hash(password, 10) : user!.password,
        photo: photo ? photo : user!.photo,
      };

      await User.updateOne({ _id: req.userId }, data);
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ message: "Erro in update user" });
    }
  }

  async delete(req: CustomRequest, res: Response) {
    try {
      await User.deleteOne({ _id: req.userId });
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ message: "Erro in delete user" });
    }
  }
}

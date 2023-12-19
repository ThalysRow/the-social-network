import { Router } from "express";
import { UserController } from "../controllers/UsersControllers";
import {
  validateBodyUser,
  validateUserCreate,
} from "../middlewares/ValidateUser";
import { newUser } from "../utils/schema";
const router = Router();

router.post(
  "/user",
  validateBodyUser(newUser),
  validateUserCreate,
  new UserController().create
);

export default router;

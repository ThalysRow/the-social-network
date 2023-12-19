import { Router } from "express";
import { UserController } from "../controllers/UsersControllers";
import {
  validateBodyUser,
  validateLoginUser,
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
router.post("/login", validateLoginUser, new UserController().login);

export default router;

import { Router } from "express";
import { UserController } from "../controllers/UsersControllers";
import {
  validateBodyUser,
  validateLoginUser,
  validateUpdateUser,
  validateUserCreate,
} from "../middlewares/ValidateUser";
import { newUser, updateUser } from "../utils/schema";
import { authentication } from "../middlewares/Authentication";
const router = Router();

router.post(
  "/user",
  validateBodyUser(newUser),
  validateUserCreate,
  new UserController().create
);
router.post("/login", validateLoginUser, new UserController().login);

router.use(authentication);

router.put(
  "/user",
  validateBodyUser(updateUser),
  validateUpdateUser,
  new UserController().update
);

export default router;

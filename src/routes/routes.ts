import { Router } from "express";
import { UserController } from "../controllers/usersControllers";
import {
  validateBodyUser,
  validateDeleteUser,
  validateLoginUser,
  validateUpdateUser,
  validateUserCreate,
} from "../middlewares/validateUser";
import { newUser, updateUser } from "../utils/schema";
import { authentication } from "../middlewares/authentication";
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
router.delete("/user", validateDeleteUser, new UserController().delete);

export default router;

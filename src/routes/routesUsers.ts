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
const routeUsers = Router();

routeUsers.post(
  "/user",
  validateBodyUser(newUser),
  validateUserCreate,
  new UserController().create
);
routeUsers.post("/login", validateLoginUser, new UserController().login);

routeUsers.use(authentication);

routeUsers.put(
  "/user",
  validateBodyUser(updateUser),
  validateUpdateUser,
  new UserController().update
);
routeUsers.delete("/user", validateDeleteUser, new UserController().delete);

export default routeUsers;

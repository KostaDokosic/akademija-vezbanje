import { Router } from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
} from "../controllers/users.controller";
import { checkSchema } from "express-validator";
import CreateUserValidation from "../validators/create.user.validator";
import UpdateUserValidation from "../validators/update.user.validator";

const usersRouter = Router();

usersRouter.get("/", getUsers);
usersRouter.get("/:id", getUser);
usersRouter.post("/", checkSchema(CreateUserValidation), createUser);
usersRouter.put("/:id", checkSchema(UpdateUserValidation), updateUser);

export default usersRouter;

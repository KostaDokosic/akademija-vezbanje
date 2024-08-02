import { Router } from "express";
import { getUsers, getUser } from "../controllers/users.controller";
import isAuth from "../middlewares/auth.middlware";

const usersRouter = Router();

usersRouter.get("/", isAuth, getUsers);
usersRouter.get("/:id", isAuth, getUser);

export default usersRouter;

import { Router } from "express";
import { checkSchema } from "express-validator";
import CreateUserValidation from "../validators/signup.validator";
import { signIn, signUp } from "../controllers/auth.controller";
import validationMiddleware from "../middlewares/validator.middlware";
import SignInValidation from "../validators/signin.validator";

const authRouter = Router();

authRouter.post(
  "/signup",
  checkSchema(CreateUserValidation),
  validationMiddleware,
  signUp
);
authRouter.post(
  "/signin",
  checkSchema(SignInValidation),
  validationMiddleware,
  signIn
);
// authRouter.post("/signin", checkSchema(CreateUserValidation), signIn);

export default authRouter;

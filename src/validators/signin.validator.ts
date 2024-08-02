import { Schema } from "express-validator";

const SignInValidation: Schema = {
  userName: {
    in: ["body"],
    isString: {
      errorMessage: "Username must be a text",
    },
    isLength: {
      options: { min: 3, max: 255 },
      errorMessage: "Username must be between 3 and 255 characters",
    },
  },
  password: {
    in: ["body"],
  },
};

export default SignInValidation;

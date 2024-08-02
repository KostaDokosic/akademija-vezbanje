import { Schema } from "express-validator";
import User from "../models/user.model";

const CreateUserValidation: Schema = {
  userName: {
    in: ["body"],
    isString: {
      errorMessage: "Username must be a text",
    },
    isLength: {
      options: { min: 3, max: 255 },
      errorMessage: "Username must be between 3 and 255 characters",
    },
    custom: {
      options: async (username) => {
        if (await User.doesUsernameExists(username))
          throw new Error("Username already exists");
        return true;
      },
    },
  },
  email: {
    in: ["body"],
    isEmail: {
      errorMessage: "Email must be a valid email",
    },
    isLength: {
      options: { min: 3, max: 255 },
      errorMessage: "Email must be between 3 and 255 characters",
    },
    custom: {
      options: async (email) => {
        if (await User.doesEmailExists(email))
          throw new Error("Email already exists");
        return true;
      },
    },
  },
  password: {
    in: ["body"],
    isStrongPassword: {
      options: {
        minLength: 8,
        minLowercase: 0,
        minUppercase: 0,
        minNumbers: 1,
        minSymbols: 0,
      },
      errorMessage:
        "Password must be at least 8 characters long and contain at least 1 number",
    },
  },
};

export default CreateUserValidation;

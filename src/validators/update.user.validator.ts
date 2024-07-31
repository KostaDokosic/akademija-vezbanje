import { Schema } from "express-validator";
import User from "../models/user.model";

const UpdateUserValidation: Schema = {
  userName: {
    in: ["body"],
    optional: true,
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
    optional: true,
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
};

export default UpdateUserValidation;

import { Request, Response } from "express";
import User from "../models/user.model";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { getSecretToken } from "../middlewares/auth.middlware";

export async function signUp(req: Request, res: Response) {
  try {
    const { userName, email, password } = req.body;

    const encryptedPassword = await hash(password, 10);
    const user = await User.create({
      userName,
      email,
      password: encryptedPassword,
    });
    if (!user)
      return res
        .status(400)
        .json({ message: "Error while creating user. Please try again." });

    const token = sign(user.sanitize, getSecretToken(), { expiresIn: "1min" });
    res.status(201).json({ ...user.sanitize, token });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
export async function signIn(req: Request, res: Response) {
  try {
    const { userName, password } = req.body;

    const user = await User.findOne({ where: { userName } });
    if (!user) return res.status(404).json({ message: "Invalid credentials" });

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch)
      return res.status(404).json({ message: "Invalid credentials" });

    const token = sign(user.sanitize, getSecretToken(), { expiresIn: "1min" });
    res.status(201).json({ ...user.sanitize, token });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

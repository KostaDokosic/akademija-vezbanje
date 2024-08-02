import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { IUser } from "../types/user.types";
import { AuthRequest } from "../types/express.types";

export default function isAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const payload = verify(token.replace("Bearer ", ""), getSecretToken());
    if (!payload) return res.status(401).json({ message: "Unauthorized" });
    req.user = payload as IUser;
    next();
  } catch (e) {
    console.error(e);
    return res.status(401).json({ message: "Unauthorized" });
  }
}

export function getSecretToken() {
  return process.env.JWT_SECRET || "token";
}

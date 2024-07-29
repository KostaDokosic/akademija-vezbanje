import { Request, Response } from "express";
import User from "../models/user.model";

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await User.findAll({});
    res.json(users);
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
}

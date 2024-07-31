import { Request, Response } from "express";
import User from "../models/user.model";
import { validationResult } from "express-validator";
import { hash } from "bcrypt";

const USERS_PER_PAGE = 10;

export async function getUsers(req: Request, res: Response) {
  try {
    const { page } = req.query;
    let sanitizedPage = 1;
    if (!isNaN(Number(page))) {
      sanitizedPage = Number(page);
    }
    const users = await User.findAll({
      attributes: ["id", "userName", "email"],
      limit: USERS_PER_PAGE,
      offset: USERS_PER_PAGE * (sanitizedPage - 1),
    });
    const metadata = {
      page: sanitizedPage,
      perPage: USERS_PER_PAGE,
      total: await User.count(),
    };
    const sanitizedUsers = users?.map((user) => user.sanitize);
    res.json({
      data: sanitizedUsers,
      metadata,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
export async function getUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: ["id", "userName", "email"],
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user.sanitize);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function createUser(req: Request, res: Response) {
  try {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
      return res
        .status(400)
        .json({ errors: validationErrors.array({ onlyFirstError: true }) });

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

    res.status(201).json(user.sanitize);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
      return res
        .status(400)
        .json({ errors: validationErrors.array({ onlyFirstError: true }) });

    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { userName, email } = req.body;
    if (!userName && !email)
      return res
        .status(400)
        .json({ message: "Please provide at least one field to update" });

    if (userName) user.userName = userName;
    if (email) user.email = email;
    await user.save();

    res.status(200).json(user.sanitize);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

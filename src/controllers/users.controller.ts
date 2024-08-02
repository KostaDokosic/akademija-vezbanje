import { Request, Response } from "express";
import User from "../models/user.model";
import { Op } from "sequelize";
import { AuthRequest } from "../types/express.types";

const USERS_PER_PAGE = 10;

export async function getUsers(req: Request, res: Response) {
  try {
    const { page, search, order } = req.query;
    let sanitizedPage = 1;
    if (!isNaN(Number(page))) {
      sanitizedPage = Number(page);
    }
    let where = {};
    if (search) {
      where = {
        [Op.or]: {
          userName: {
            [Op.like]: `%${search}%`,
          },
          email: {
            [Op.like]: `%${search}%`,
          },
        },
      };
    }

    let orderBy = "ASC";
    if ((order && order === "DESC") || order === "ASC") {
      orderBy = order;
    }

    const users = await User.findAll({
      attributes: ["id", "userName", "email"],
      limit: USERS_PER_PAGE,
      offset: USERS_PER_PAGE * (sanitizedPage - 1),
      where,
      order: [["id", orderBy]],
    });
    const metadata = {
      page: sanitizedPage,
      perPage: USERS_PER_PAGE,
      total: await User.count(),
    };
    res.json({
      data: users,
      metadata,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
export async function getUser(req: AuthRequest, res: Response) {
  try {
    console.log(req.user);
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

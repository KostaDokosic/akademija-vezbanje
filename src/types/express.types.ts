import { Request } from "express";
import { IUser } from "./user.types";

export type AuthRequest = Request & { user?: IUser };

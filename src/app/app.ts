import express from "express";
import usersRouter from "../routers/users.router";
import authRouter from "../routers/auth.router";

export default function createApp() {
  const app = express();

  app.use(express.json());
  app.use("/api/users", usersRouter);
  app.use("/api/auth", authRouter);

  return app;
}

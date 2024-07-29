import express from "express";
import usersRouter from "../routers/users.router";

export default function createApp() {
  const app = express();

  app.use(express.json());
  app.use("/api/users", usersRouter);

  return app;
}

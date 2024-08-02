import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export default function validationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty())
    return res
      .status(400)
      .json({ errors: validationErrors.array({ onlyFirstError: true }) });

  next();
}

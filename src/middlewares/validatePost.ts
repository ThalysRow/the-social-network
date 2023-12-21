import { Request, Response, NextFunction } from "express";

export const validateNewPost =
  (joischema: any) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await joischema.validateAsync(req.body);
      next();
    } catch (error) {
      if (
        error !== null &&
        typeof error === "object" &&
        "message" in error &&
        error.message === "string"
      ) {
        return res.status(400).json({ message: error.message });
      }
    }
  };

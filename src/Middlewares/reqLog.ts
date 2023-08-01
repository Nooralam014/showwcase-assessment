import { Request, Response, NextFunction } from "express";

export const reqLog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("REQ Method: ", req.method);
    console.log("REQ Url: ", req.baseUrl);
    console.log("REQ Timestamp: ", Date.now());
    next();
  } catch (error) {
    next(error);
  }
};

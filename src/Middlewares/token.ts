import express, { Response, NextFunction } from "express";
import {
  IReqUser,
  IReqJwtToken,
  IReqHeaders,
} from "../Interfaces/definitionFile";
import { Users } from "../Models/UserModel";
import jwt from "jsonwebtoken";
const secretKey: string = "thisisthesecretkey12345";

export const tokenSign = async (
  req: IReqJwtToken,
  res: Response,
  next: NextFunction
) => {
  const [user] = await Users.find({ email: req.body.email });
  if (user) {
    const payload: Object = {
      _id: user._id,
    };
    const token: string = jwt.sign(payload, secretKey);
    req.jwttoken = token;
    next();
  } else {
    return res.status(404).send({ message: "Not Found" });
  }
};

export const authenticate = async (
  req: IReqHeaders,
  res: Response,
  next: NextFunction
) => {
  if (req.headers.authorization) {
    const token: string = req.headers.authorization.split(" ")[1];

    jwt.verify(token, secretKey, (err: any, user: any) => {
      if (err) {
        return res.status(401).send("Not Authorized By JWT");
      }
      req.user = user._id;
      next();
    });
  } else {
    return res.status(401).send("UnAuthorized to Access");
  }
};

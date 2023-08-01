import { Request, Response, NextFunction } from "express";
import { IReqUser } from "../Interfaces/definitionFile";
import bcrypt from "bcrypt";
import { Users } from "../Models/UserModel";
import { IReqJwtToken } from "../Interfaces/definitionFile";
import axios from "axios";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const password: string = await bcrypt.hash(req.body.password, 10);
    const confirmpassword: string = await bcrypt.hash(
      req.body.confirmpassword,
      10
    );
    if (req.body.password === req.body.confirmpassword) {
      await Users.create({
        name: req.body.name,
        email: req.body.email,
        password: password,
        confirmpassword: confirmpassword,
      });
      res.status(201).send({ message: "User Created Successfully" });
    } else {
      res.status(401).send({ message: "Passwords DidNot Match" });
    }
  } catch (error) {
    next(error);
  }
};

export const signIn = async (
  req: IReqJwtToken,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: any = await Users.findOne({ email: req.body.email });
    const isPasswordValid: boolean = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (isPasswordValid) {
      res.status(200).send({
        message: "Login SuccessFul",
        jwt: req.jwttoken,
      });
    } else {
      res.status(401).send({ message: "Wrong Password" });
    }
  } catch (error) {
    next(error);
  }
};

export const profile = async (
  req: IReqUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: any = await Users.findOne({ _id: req.user });
    res.status(200).send({ message: "Successfully Fetched", user: user });
  } catch (error) {
    next(error);
  }
};

export const randomUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response: any = await axios.get("https://randomuser.me/api/");
    res.status(200).json(response.data);
  } catch (error) {
    next(error);
  }
};

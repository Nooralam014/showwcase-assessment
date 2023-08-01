import { Request } from "express";

export interface IUser {
  name: string;
  email: string;
  password: string;
  confirmpassword: string;
}
export interface IReqUser extends Request {
  user: string;
}
export interface IReqJwtToken extends Request {
  jwttoken: string;
}
export interface IReqHeaders extends Request {
  user: string;
  headers: {
    authorization: string;
  };
}

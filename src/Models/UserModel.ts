// const mongoose = require("mongoose");
import mongoose from "mongoose";
import { IUser } from "../Interfaces/definitionFile";

const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmpassword: { type: String, required: true },
  },
  {
    collection: "Users",
  }
);

export const Users = mongoose.model<IUser>("Users", userSchema);

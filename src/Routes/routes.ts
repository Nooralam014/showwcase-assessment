import express from "express";
import { errorHandler } from "../Middlewares/errorHandling";
import { reqLog } from "../Middlewares/reqLog";
const router = express.Router();
const users = require("./users");

export default router.use("/", reqLog, users, errorHandler);

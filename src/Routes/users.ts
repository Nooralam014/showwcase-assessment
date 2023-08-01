import express from "express";
import {
  signUp,
  signIn,
  profile,
  randomUser,
} from "../Controllers/user-controller";
import { tokenSign, authenticate } from "../Middlewares/token";
const router = express.Router();

//Register
router.post("/auth/register", signUp);

//Login
//@ts-ignore
router.post("/auth/login", tokenSign, signIn);

//Profile
//@ts-ignore
router.get("/auth/profile", authenticate, profile);

//Profile
//@ts-ignore
router.get("/users/random", authenticate, randomUser);

module.exports = router;

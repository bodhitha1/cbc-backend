import express from "express";
import { createUser, getUser, loginUser } from "../controller/userController.js";

const userRouter = express.Router();


userRouter.get("/",getUser);

userRouter.post("/register",createUser);
userRouter.post("/login",loginUser)

export default userRouter
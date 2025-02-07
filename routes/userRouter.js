import express from 'express';
import { registerUser,viewUser,loginUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post("/",registerUser);

userRouter.post("/login",loginUser)

userRouter.get("/viewuser",viewUser);

export default userRouter;
import { Router } from "express";
import { deleteUser } from "../controllers/usersController.js";

const userRouter = Router();

userRouter.delete("/:num", deleteUser); //* app

export default userRouter;

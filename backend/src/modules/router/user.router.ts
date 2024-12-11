import { Router } from "express";
import authService from "../service/auth.service";

const userRouter = Router();

userRouter.post("/password", authService.isAuthenticated, (req, res) => {
    res.status(200).json({ message: "Sample Password!" }); //todo: implement password change
});

userRouter.post("/address", authService.isAuthenticated, (req, res) => {
    res.status(200).json({ message: "Sample Address!" }); //todo: implement address change
});

export default userRouter;
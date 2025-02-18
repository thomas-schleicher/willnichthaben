import { Router } from "express";
import authService from "../service/auth.service";
import sessionService from "../service/session.service";
import accountService from "../service/account.service";
import userRepository from "../db/user.repository";

const userRouter = Router();

userRouter.put("/password", authService.isAuthenticated, async (req, res) => {
    const userID = sessionService.getSessionUserID(req);
    if (!userID) {
        res.status(500).json({});
        return;
    }

    const { password } = req.body;
    if (!password) {
        res.status(500).json({message: "missing new password"});
        return;
    }

    const result: boolean = await accountService.changePassword(userID, password);

    if (result) {
       res.status(200).json({});   
    } else {
        res.status(500).json({ message: "Failed to change password" });
    }

    return;
});

userRouter.put("/address", authService.isAuthenticated, async (req, res) => {
    const userID = sessionService.getSessionUserID(req);
    if (!userID) {
        res.status(500).json(null);
        return;
    }

    const { city, postal_code, street_address } = req.body;
    if (!city || !postal_code || !street_address) {
        res.status(500).json({message: "missing address attributes"});
        return;
    } 

    const result: boolean = await userRepository.changeAddress(userID, city, postal_code, street_address); 
    if (result) {
       res.status(200).json({});   
    } else {
        res.status(500).json({ message: "Failed to change Address" });
    }
    return;
});

export default userRouter;
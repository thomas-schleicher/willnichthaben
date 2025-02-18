import { Router } from "express";
import authService from "../service/auth.service"
import sessionService from "../service/session.service";
import userRepository from "../db/user.repository";
import accountService from "../service/account.service";
import { userShema } from "../../interfaces/user.interface";
import { addressShema } from "../../interfaces/address.interface";

const authRouter = Router();

authRouter.get("/", (req, res) => {
    if (req.session.userID) {
        res.status(200).json({ status: true });
        return;
    }
    res.status(200).json({ status: false });
});

authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (req.session.userID) {
        res.status(400).json({ message: "User already logged in." });
        return;
    }
    
    try {
        const userID = await authService.authenticate(email, password);
        if (!userID) {
            res.status(401).json({ message: "Invalid username or password!"});
            return;
        }
        sessionService.setSessionUserID(req, userID);
        res.status(200).json({ message: "User logged in." });

    } catch (error) {
        console.error("Error during login: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

authRouter.post("/logout", (req, res) => {
    if (!req.session.userID) {
        res.status(400).json({ message: "User not logged in." });
    } else {
        req.session.destroy(err => {
            if (err) return res.status(500).json({ message: "Could not logout. Please try again."});
            res.status(200).json({ message: "Logged out successfully."});
        }); 
    }
});

authRouter.post("/signup", async (req, res) => {
    if (req.session.userID) {
        res.status(400).json({ message: "User is already logged in to an account."});
        return;
    }

    const { email, password, postal_code, city, street_address } = req.body;
    const isValidUserInput = userShema.validate({
        email: email,
        password: password
    });
    const isValidAddressInput = addressShema.validate({
        postal_code: postal_code,
        city: city,
        street_address: street_address,
    });

    if (isValidUserInput.error || isValidAddressInput.error) {
        res.status(400).json({ message: "The provided user input is not valid!" });
        return;
    }

    const existingUser = await userRepository.findUserByEmail(email);
    if (existingUser) {
        res.status(400).json({ message: "This email already has an associated with another account." });
        return;
    }

    const newUserID = await accountService.createNewAccount(email, password, postal_code, city, street_address);
    if (!newUserID) {
        res.status(500).json({ message: "Internal server error" });
        return;
    }

    sessionService.setSessionUserID(req, newUserID);

    res.status(201).json({ message: "Account created and logged in." });
});

export default authRouter;
import bcrypt from "bcrypt";
import UserRepository from "../db/user.repository";
import { Request, Response, NextFunction } from "express"

class AuthenticationService {
    async authenticate(email: string, password: string): Promise<string | null> {
        const user = await UserRepository.findUserByEmail(email);
        if (!user) return null;

        const userID = user.id!; // Assert user object has an id, since it comes from DB

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return null;

        return userID;
    }

    isAuthenticated(req: Request, res: Response, next: NextFunction) {
        if (req.session && req.session.userID) {
            next();
        } else {
            res.status(401).json({ message: "You must log in first!" });
        }
    }
}

export default new AuthenticationService();

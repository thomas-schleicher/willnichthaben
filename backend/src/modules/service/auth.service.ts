import bcrypt from "bcrypt";
import UserRepository from "../db/user.repository";
import { Request, Response } from "express"

class AuthenticationService {
    async authenticate(email: string, password: string): Promise<string | null> {
        const user = await UserRepository.findUserByEmail(email);
        if (!user) return null;

        const userID = user.id!; //assert that the user object has a id, because it is fetched from the database

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return null;
        
        return userID;
    }

    isAuthenticated(req: Request, res: Response, next: Function) {
        if (req.session.userID) {
            next();
        } else {
            res.status(401).json({ message: "You must login first!"});
        }
    }
}

export default new AuthenticationService();
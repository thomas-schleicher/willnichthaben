import bcrypt from "bcrypt";
import UserRepository from "../db/user.repository";
import { Request, Response } from "express"

class AuthenticationService {
    async authenticate(email: string, password: string): Promise<boolean> {
        const user = await UserRepository.findUserByEmail(email);
        if (!user) return false;

        console.log(user);
        console.log(user.password);

        const isPasswordValid = await bcrypt.compare(password, user.password);
        return isPasswordValid;
    }

    isAuthenticated(req: Request, res: Response, next: Function) {
        if (req.session.userId) {
            next();
        } else {
            res.status(401).json({ message: "You must login first!"});
        }
    }
}

export default new AuthenticationService();
import { Request } from "express";
import userRepository from "../db/user.repository";

class SessionService {
    async setSessionUser(req: Request, email: string): Promise<boolean> {
        const user = await userRepository.findUserByEmail(email);
        if (!user) {
            return false;
        }
        req.session.userId = user.id;
        return true;
    }

    setSessionUserID(req: Request, userId: string) {
        req.session.userId = userId;
    }

    async removeSessionUser(req: Request): Promise<boolean> {
        req.session.userId = undefined;        
        return true;
    }
}

export default new SessionService();
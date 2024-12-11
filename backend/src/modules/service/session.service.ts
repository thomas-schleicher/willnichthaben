import { Request } from "express";
import userRepository from "../db/user.repository";

class SessionService {
    setSessionUserID(req: Request, userId: string) {
        req.session.userID = userId;
    }

    async removeSessionUser(req: Request): Promise<boolean> {
        req.session.userID = undefined;        
        return true;
    }
}

export default new SessionService();
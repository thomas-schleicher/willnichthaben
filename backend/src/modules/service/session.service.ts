import { Request } from "express";

class SessionService {
    setSessionUserID(req: Request, userId: string) {
        req.session.userID = userId;
    }

    getSessionUserID(req: Request): string | undefined {
        return req.session.userID;
    }

    async removeSessionUser(req: Request): Promise<boolean> {
        req.session.userID = undefined;        
        return true;
    }
}

export default new SessionService();
import { User } from "../../interfaces/user.interface";
import userRepository from "../db/user.repository";
import bcrypt from "bcrypt";

class AccountService {
    async createNewAccount(email: string, password: string): Promise<string | null> {
        const passwordHash = await bcrypt.hash(password, 10);
        const user: User = {
            email: email,
            password: passwordHash,
        }
        const userCreated = await userRepository.createUser(user);
        return userCreated;
    }
}

export default new AccountService();
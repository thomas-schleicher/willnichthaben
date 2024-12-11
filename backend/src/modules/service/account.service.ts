import { Address } from "../../interfaces/address.interface";
import { User } from "../../interfaces/user.interface";
import userRepository from "../db/user.repository";
import bcrypt from "bcrypt";

class AccountService {
    async createNewAccount(email: string, password: string, postal_code: string, city: string, street_address: string): Promise<string | null> {
        const passwordHash = await bcrypt.hash(password, 10);
        const user: User = {
            email: email,
            password: passwordHash,
        }
        const address: Address = {
            postal_code: postal_code,
            city: city,
            street_address: street_address,
        }
        const userCreated = await userRepository.createUser(user, address);
        return userCreated;
    }
}

export default new AccountService();
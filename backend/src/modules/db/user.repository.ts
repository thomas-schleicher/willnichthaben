import { User, userShema } from "../../interfaces/user.interface";
import pool from "../config/postgres.config";

class UserRepository {
    async findUserByEmail(email: string): Promise<User | null> {
        const query = "SELECT * FROM users WHERE email = $1";
        const { rows } = await pool.query(query, [email]);
        return rows[0] || null;
    }

    async findUserByID(id: string): Promise<User | null> {
        const query = "SELECT * FROM users WHERE id = $1";
        const { rows } = await pool.query(query, [id]);
        return rows[0] || null;
    }

    async createUser(user: User): Promise<string | null> {
        const query = "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id";

        const validation = userShema.validate(user);
        if (validation.error) {
            console.error('Validation error:', validation.error.message);
            return null;
        }

        try {
            const { rows } = await pool.query(query, [user.email, user.password]);
            return rows[0]?.id || null;
        } catch (error: any) {
            if (error.code === '23505') {
                console.error('Duplicate email:', user.email);
                return null;
            }
            console.error('Error creating user:', error.message);
            return null;
        }
    }
}

export default new UserRepository();
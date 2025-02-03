import { Address, addressShema } from "../../interfaces/address.interface";
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

    async createUser(user: User, address: Address): Promise<string | null> {
        const userValidation = userShema.validate(user);
        const addressValidation = addressShema.validate(address);
        if (userValidation.error) {
            console.error("Validation error:", userValidation.error.message);
            return null;
        }
        if (addressValidation.error) {
            console.error("Validation error:", addressValidation.error.message);
            return null;
        }

        try {
            await pool.query("BEGIN");

            const addressQuery = "INSERT INTO addresses (postal_code, city, street_address) VALUES ($1, $2, $3) RETURNING id;";
            const addressResult = await pool.query(addressQuery, [address.postal_code, address.city, address.street_address]);
            const addressId = addressResult.rows[0]?.id;

            const userQuery = "INSERT INTO users (email, password, address_id) VALUES ($1, $2, $3) RETURNING id;";
            const userResult = await pool.query(userQuery, [user.email, user.password, addressId]);

            await pool.query("COMMIT");

            return userResult.rows[0]?.id || null;
        } catch (error: any) {
            await pool.query("ROLLBACK");
            if (error.code === "23505") {
                console.error("Duplicate email:", user.email);
                return null;
            }
            console.error("Error creating user:", error.message);
            return null;
        }
    }
}

export default new UserRepository();
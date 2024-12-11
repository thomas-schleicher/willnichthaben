import { Pool } from "pg";

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "willnichthaben",
    password: "default",
    port: 5432,
});

export default pool;
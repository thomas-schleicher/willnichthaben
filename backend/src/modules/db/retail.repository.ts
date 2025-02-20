import { listingSchema } from "../../interfaces/listing.interface";
import { retailSchema } from "../../interfaces/retail/retail_item.interface"

import pool from "../config/postgres.config";

class RetailRepository {
    /**
     * Fetches retail listings from the database based on the provided filters.
     * 
     * @param filters - The filters to apply to the query.
     * @returns - Returns an array of matching retail listings.
     */
    async getRetailListing(filters: any): Promise<number[]> {
        let {
            category_id,
            price_min,
            price_max,
            delivery_options,
            conditions
        } = filters;

        // ensure that conditions is always an array
        if (conditions && !Array.isArray(conditions)) {
            conditions = [conditions];
        }

        // SQL query to fetch listing
        let query = `
        SELECT 
            l.id AS listing_id,
            l.type,
            l.title,
            l.price,
            r.name,
            r.category_id,
            r.delivery_options,
            r.condition
        FROM retail_items r
        JOIN listings l ON l.id = r.listing_id
        JOIN retail_categories rc ON r.category_id = rc.id
        WHERE r.category_id = $1 AND l.is_sold = FALSE
        `;

        const queryParams: any[] = [category_id];

        // apply other filters if provided
        if (price_min !== undefined) {
            query += ` AND l.price >= $${queryParams.length + 1}`;
            queryParams.push(price_min);
        }

        if (price_max !== undefined) {
            query += ` AND l.price <= $${queryParams.length + 1}`;
            queryParams.push(price_max);
        }

        if (delivery_options && delivery_options.length > 0) {
            query += ` AND r.delivery_options = $${queryParams.length + 1}`;
            queryParams.push(delivery_options);
        }

        if (conditions && conditions.length > 0) {
            query += ` AND r.condition = ANY($${queryParams.length + 1})`;
            queryParams.push(conditions);
        }

        const result = await pool.query(query, queryParams);
        return result.rows;
    }

    /**
     * Creates a new retail listing in the database.
     * 
     * This function validates the input data against predefined schemas and inserts the listing
     * and its associated retail item into the database within a transaction.
     * If an error occurs during insertion, the transaction is rolled back.
     * 
     * @param {Object} body - The request body containing listing and retail item data.
     * @param {string} user_id - The ID of the user creating the listing.
     * @throws {Error} If validation fails or a database error occurs.
     */
    async createRetailListing(body: any, user_id: string): Promise<void> {
        const {
            // listing data
            type,
            title,
            description,
            price,
            // retail item data
            name,
            category_id,
            delivery_options,
            condition
        } = body

        // validate listing data
        const listingValidation = listingSchema.validate({
            seller_id: user_id,
            type,
            title,
            description,
            price
        });

        // validate retail item data
        const retailItemValidation = retailSchema.validate({
            name,
            category_id,
            delivery_options,
            condition
        });

        // throw an error if validation fails
        if (listingValidation.error) {
            throw new Error("Validation error:" + listingValidation.error.message);
        }
        if (retailItemValidation.error) {
            throw new Error("Validation error: " + retailItemValidation.error.message);
        }

        try {
            // begin transaction
            await pool.query("BEGIN");

            // SQL query to insert listing
            const listingQuery = `
                INSERT INTO listings 
                    (seller_id, type, title, description, price)
                VALUES 
                    ($1, $2, $3, $4, $5)
                RETURNING id;
            `;

            // SQL query to insert retail item
            const retailItemQuery = `
                INSERT INTO retail_items
                    (listing_id, name, category_id, delivery_options, condition)
                VALUES
                    ($1, $2, $3, $4, $5)
            `;

            // execute listing insertion and get the newly created listing ID
            const listingQueryResult = await pool.query(listingQuery, [
                user_id,
                type,
                title,
                description,
                price
            ]);

            // execute retail item insertion with the retrieved listing ID
            await pool.query(retailItemQuery, [
                listingQueryResult.rows[0].id,
                name,
                category_id,
                delivery_options,
                condition
            ]);

            // commit transaction if both queries succeed
            await pool.query("COMMIT");
        } catch (error) {
            // rollback transaction in case of an error
            await pool.query("ROLLBACK");
            console.error("Error during retail item creation: ", error);
        }
    }

    /**
     * Updates an existing retail listing in the database.
     * 
     * This function validates the provided data and updates both the `listings`
     * and `retail_items` tables using a database transaction.
     * If an error occurs, the transaction is rolled back.
     * 
     * @param {Object} body - The request body containing updated listing and retail item data.
     * @param {string} user_id - The ID of the user making the update request.
     * @param {string} listing_id - The ID of the listing to be updated.
     * @throws {Error} If validation fails or a database error occurs.
     */
    async updateRetailListing(body: any, user_id: string, listing_id: string): Promise<void> {
        const {
            // listing data
            type,
            title,
            description,
            price,
            // retail item data
            name,
            category_id,
            delivery_options,
            condition
        } = body

        // validate listing data
        const listingValidation = listingSchema.validate({
            id: listing_id,
            seller_id: user_id,
            type,
            title,
            description,
            price
        });

        // validate retail item data
        const retailItemValidation = retailSchema.validate({
            name,
            category_id,
            delivery_options,
            condition
        });

        // throw an error if validation fails
        if (listingValidation.error) {
            throw new Error("Validation error:" + listingValidation.error.message);
        }
        if (retailItemValidation.error) {
            throw new Error("Validation error: " + retailItemValidation.error.message);
        }

        try {
            await pool.query("BEGIN");

            // SQL query to update the listing
            const listingQuery = `
                UPDATE listings
                SET
                    type = $1,
                    title = $2,
                    description = $3,
                    price = $4
                WHERE
                    id = $5;
            `;

            // SQL query to update the retail item
            const retailItemQuery = `
                UPDATE retail_items
                SET
                    name = $1,
                    category_id = $2,
                    delivery_options = $3,
                    condition = $4
                WHERE
                    listing_id = $5;
            `;

            // execute the listing update
            await pool.query(listingQuery, [
                type,
                title,
                description,
                price,
                listing_id
            ]);

            // execute the retail item update
            await pool.query(retailItemQuery, [
                name,
                category_id,
                delivery_options,
                condition,
                listing_id
            ]);

            // commit transaction if both queries succeed
            await pool.query("COMMIT");
        } catch (error) {
            // rollback transaction in case of an error
            await pool.query("ROLLBACK");
            console.error("Error during retail item update: ", error);
        }
    }

    /**
     * Deletes a retail listing and its associated retail item from the database.
     * 
     * @param {number} listing_id - The ID of the listing to delete.
     */
    async deleteRetailListing(listing_id: string): Promise<void> {
        try {
            await pool.query("BEGIN");

            // SQL query to delete the retail item
            const retailItemQuery = `
                DELETE FROM retail_items
                WHERE
                    listing_id = $1; 
            `;

            // SQL query to delete the retail item
            const listingQuery = `
                DELETE FROM listings
                WHERE
                    id = $1; 
            `;

            // execute the retail and listing delete
            await pool.query(retailItemQuery, [listing_id]);
            await pool.query(listingQuery, [listing_id]);

            // commit transaction if both queries succeed
            await pool.query("COMMIT");
        } catch (error) {
            // rollback transaction in case of an error
            await pool.query("ROLLBACK");
            console.error("Error during retail item delete: ", error);
        }
    }
}

export default new RetailRepository();
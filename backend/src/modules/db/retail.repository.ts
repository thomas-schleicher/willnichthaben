import { listingSchema } from "../../interfaces/listing.interface";
import { retailSchema } from "../../interfaces/retail/retail_item.interface"

import pool from "../config/postgres.config";

class RetailRepository {
    /**
     * Creates a new retail listing in the database.
     * 
     * This function validates the input data against predefined schemas and inserts the listing
     * and its associated retail item into the database within a transaction.
     * If an error occurs during insertion, the transaction is rolled back.
     * 
     * @param {Object} body - The request body containing listing and retail item data.
     * @param {string} userID - The ID of the user creating the listing.
     * @throws {Error} If validation fails or a database error occurs.
     */
    async createRetailListing(body: any, userID: string): Promise<void> {
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
            seller_id: userID,
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
                userID,
                type,
                title,
                description,
                price
            ]);

            // execute retail item insertion with the retrieved listing ID
            const retailItemQueryResult = await pool.query(retailItemQuery, [
                listingQueryResult.rows[0].id,
                name,
                category_id,
                delivery_options,
                condition
            ]);

            // commit transaction if both queries succeed
            await pool.query("COMMIT");
        } catch(error) {
            // rollback transaction in case of an error
            await pool.query("ROLLBACK");
            console.error("Error during retail item creation: ", error);
        }
    }
}

export default new RetailRepository();
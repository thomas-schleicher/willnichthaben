import { listingImageShema } from "../../interfaces/listing.interface";
import pool from "../config/postgres.config";

class ListingRepository {
  async deleteListing(listingID: number, userID: string): Promise<boolean> {
    const query = "DELETE FROM listings WHERE id = $1 AND seller_id = $2";
    try {
      await pool.query(query, [listingID, userID]);
    } catch (err) {
      console.error("Error:", err);
      return false;
    }
    return true;
  }

  async getListingByID(listingID: number): Promise<any | null> {
    //todo: machts da eure sachen so wie ihr sie brauchts auch rein
    const query = `
        SELECT
            l.id,
            l.type,
            l.title,
            l.description,
            l.price,
            l.is_sold,
            v.name AS vehicle_name,
            v.model_id AS vehicle_model_id,
            vmodel.name AS vehicle_model_name,
            v.type_id AS vehicle_type_id,
            vtype.name AS vehicle_type,
            vmark.name AS vehicle_mark_name,
            v.date_first_registration AS vehicle_date_first_registration,
            v.mileage AS vehicle_mileage,
            v.fuel_type AS vehicle_fule_type,
            v.color AS vehicle_color,
            v.condition AS vehicle_condition,
            ri.name AS retail_name,
            ri.category_id AS retail_category_id,
            ri.delivery_options AS retail_delivery_options,
            ri.condition AS retail_condition,
            vmark.category_id AS vehicle_category_id,
            vmark.id AS vehicle_brand_id,
            u.email AS user_email,
            a.postal_code AS postal_code,
            a.city,
            a.street_address
        FROM
            listings l
        LEFT JOIN
            users u ON u.id = l.seller_id
        LEFT JOIN
            addresses a ON a.id = u.address_id
        LEFT JOIN 
            vehicles v ON l.type = 'vehicle' AND l.id = v.listing_id
        LEFT JOIN
            vehicle_models vmodel ON l.type = 'vehicle' AND v.model_id = vmodel.id
        LEFT JOIN
            vehicle_marks vmark ON l.type = 'vehicle' AND vmodel.mark_id = vmark.id
        LEFT JOIN
            vehicle_types vtype ON l.type = 'vehicle' AND v.type_id = vtype.id
        LEFT JOIN 
            retail_items ri ON l.type = 'retail' AND l.id = ri.listing_id
        LEFT JOIN
            retail_categories rc ON l.type = 'retail' AND ri.category_id = rc.id
        LEFT JOIN
            retail_categories_properties rcp ON l.type = 'retail' AND rc.id = rcp.id
        LEFT JOIN
            retail_item_properties rip ON l.type = 'retail' AND ri.id = rip.retail_item_id AND rcp.id = rip.additional_property_id
        LEFT JOIN 
            real_estate_objects r ON l.type = 'property' AND l.id = r.id
        WHERE 
            l.type IN ('vehicle', 'retail', 'realestate') AND l.id = $1;
    `;
    const { rows } = await pool.query(query, [listingID]);
    return rows[0] || null;
  }

  async getUserIDByListingID(listingID: number): Promise<string> {
    const query = `
        SELECT 
            seller_id
        FROM
            listings
        WHERE
            id = $1;
    `;
    const { rows } = await pool.query(query, [listingID]);
    return rows[0].seller_id;
  }

  async getUserListings(userID: string): Promise<any> {
    const query = `
        SELECT 
            l.id,
            l.type,
            l.title,
            l.description,
            l.price,
            l.is_sold,
            v.name AS vehicle_name,
            v.model_id AS vehicle_model_id,
            v.type_id AS vehicle_type_id,
            v.date_first_registration AS vehicle_date_first_registration,
            v.mileage AS vehicle_mileage,
            v.fuel_type AS vehicle_fule_type,
            v.color AS vehicle_color,
            v.condition AS vehicle_condition,
            vb.category_id AS vehicle_category_id,
            vb.id AS vehicle_brand_id,
            i.type_id AS real_estate_type_id,
            i.description AS real_estate_description,
            i.city_id AS real_estate_city_id,
            i.address AS real_estate_address,
            i.price_per_month AS real_estate_price_per_month,
            i.renting_period AS real_estate_renting_period,
            i.advance_payment AS real_estate_advanced_payment,
            i.immediate_availability AS real_estate_immediate_availability,
            i.status AS real_estate_status,
            r.name AS retail_name,
            r.category_id AS retail_category_id,
            r.delivery_options AS retail_delivery_options,
            r.condition AS retail_condition
        FROM listings AS l
        LEFT JOIN 
          (vehicles AS v
            JOIN vehicle_models vm ON v.model_id = vm.id
            JOIN vehicle_marks vb ON vm.mark_id = vb.id) 
          ON l.id = v.listing_id
        LEFT JOIN real_estate_objects AS i ON l.id = i.listing_id
        LEFT JOIN 
          (retail_items AS r
            LEFT JOIN retail_categories rc ON r.category_id = rc.id
            LEFT JOIN retail_categories_properties rcp ON rc.id = rcp.id
            LEFT JOIN retail_item_properties rip ON r.id = rip.retail_item_id AND rcp.id = rip.additional_property_id)
          ON l.id = r.listing_id
        WHERE l.seller_id = $1
    `;

    const { rows } = await pool.query(query, [userID]);
    return rows;
  }

  /**
   * Creates a new image for a listing in the database.
   *
   * This function validates the input data against predefined schemas and inserts the image
   * to its associated listing into the database within a transaction.
   * If an error occurs during insertion, the transaction is rolled back.
   *
   * @param {number} listing_id - The ID of the listing to associate the image with.
   * @param {string} image_url - The URL of the image to be stored.
   * @throws {Error} If validation fails or a database error occurs.
   */
  async createImageForListing(
    listing_id: number,
    image_url: string
  ): Promise<void> {
    // validate image data
    const imageValidation = listingImageShema.validate({
      listing_id: listing_id,
      image_url: image_url,
    });

    try {
      // begin transaction
      await pool.query("BEGIN");

      // SQL query to insert listing image
      const query = `
        INSERT INTO listing_images
            (listing_id, image_url)
        VALUES
            ($1, $2);
        `;

      // execute listing image insertion
      await pool.query(query, [listing_id, image_url]);

      // commit transaction if query succeeds
      await pool.query("COMMIT");
    } catch (error) {
      // rollback transaction in case of an error
      await pool.query("ROLLBACK");
      console.error("Error during listing image creation: ", error);
    }
  }

  /**
   * Fetches an image from a listing in the database.
   *
   * @param {number} listing_id - The ID of the listing to associate the image with.
   * @returns {any[]} The corresponding images to a listing
   */
  async getImageForListing(listing_id: number): Promise<any[]> {
    // SQL query to fetch listing images
    const query = `
    SELECT * FROM listing_images
    WHERE
        listing_id = $1;
    `;

    // execute listing image fetching
    const images = await pool.query(query, [listing_id]);

    // return the resulting datasets
    return images.rows;
  }

  /**
   * Deletes an image from the listing_images table based on its ID.
   *
   * @param {number} image_id - The ID of the image to be deleted
   * @returns {any} - The deleted image record containing the image URL
   */
  async deleteImageOfListing(image_id: number): Promise<any> {
    try {
      // begin transaction
      await pool.query("BEGIN");

      // SQL query to delete listing image
      const query = `
        DELETE FROM listing_images
        WHERE
            id = $1
        RETURNING
            image_url; 
        `;

      // execute listing image fetching
      const imageToDelete = await pool.query(query, [image_id]);

      // commit transaction if query succeeds
      await pool.query("COMMIT");

      return imageToDelete;
    } catch (error) {
      // rollback transaction in case of an error
      await pool.query("ROLLBACK");
      console.error("Error during listing image creation: ", error);
    }
  }

  /**
   * Retrieves the listing ID associated with a given image ID.
   *
   * This function executes a SQL query to fetch the corresponding listing ID
   * from the listing_images table based on the provided image ID.
   *
   * @async
   * @param {number} image_id - The ID of the image for which the listing ID is to be retrieved
   * @returns {any} - The ID of the listing associated with the image
   */
  async getListingIDbyImageID(image_id: number): Promise<any> {
    // SQL query to fetch listing id by image id
    const query = `
    SELECT listing_id FROM listing_images
    WHERE
        id = $1;
    `;

    // execute listing id by image id fetching
    const result = await pool.query(query, [image_id]);

    // return the resulting datasets
    return result.rows[0].listing_id;
  }
}

export default new ListingRepository();

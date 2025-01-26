import pool from "../config/postgres.config";

class ListingRepository {
  async getListingByID(listingID: number): Promise<any[] | null> {
    //todo: machts da eure sachen so wie ihr sie brauchts auch rein
    const query = `
        SELECT 
            l.title,
            l.description,
            l.price,
            l.type,
            u.email AS user_email,
            a.postal_code AS postal_code,
            a.city,
            a.street_address,
            v.name AS vehicle_name,
            v.date_first_registration AS vehicle_date_first_registered,
            v.mileage AS vehicle_mileage,
            v.fuel_type AS vehicle_fule_type,
            v.color AS vehicle_color,
            v.condition AS vehicle_condition,
            vmodel.name AS vehicle_model_name,
            vmark.name AS  vehicle_mark_name,
            vtype.name AS vehicle_type
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
            marketplace_items m ON l.type = 'retail' AND l.id = m.id
        LEFT JOIN 
            real_estate_objects r ON l.type = 'property' AND l.id = r.id
        WHERE 
            l.type IN ('vehicle', 'retail', 'realestate') AND l.id = $1;
    `;
    const { rows } = await pool.query(query, [listingID]);
    return rows[0] || null;
  }
}

export default new ListingRepository();
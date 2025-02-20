import pool from "../config/postgres.config";

class RealEstateRepository {
    async getRealEstateObjects(filters: any): Promise<number[]> {
        let query = `
            SELECT reo.listing_id,
                   reo.id,
                   reo.name,
                   reo.description,
                   reo.price_per_month,
                   reo.living_area,
                   reo.room_count,
                   reo.availability,
                   reo.immediate_availability,
                   reo.kitchen,
                   reo.cellar,
                   reo.address,
                   c.name   as city_name,
                   c.plz    as postal_code,
                   rt.name  as property_type,
                   rtc.name as category_name,
                   reo.renting_period,
                   reo.balcony,
                   reo.balcony_size,
                   reo.garden,
                   reo.parking,
                   reo.storage_room,
                   reo.land_plot_size,
                   reo.num_floors
            FROM real_estate_objects reo
                     JOIN cities c ON c.id = reo.city_id
                     JOIN real_estate_types rt ON rt.id = reo.type_id
                     JOIN real_estate_top_level_categories rtc ON rtc.id = rt.top_level_category_id
            WHERE reo.status = 'open'
        `;
        const queryParams: any[] = [];
        let paramCount = 0;

        if (filters.topLevelCategory) {
            paramCount++;
            query += ` AND rtc.name = $${paramCount}`;
            queryParams.push(filters.topLevelCategory);
        }

        if (filters.type_ids && filters.type_ids.length > 0) {
            paramCount++;
            query += ` AND rt.id = ANY($${paramCount})`;
            queryParams.push(filters.type_ids);
        }

        if (filters.province_id) {
            paramCount++;
            query += ` AND c.province_id = $${paramCount}`;
            queryParams.push(filters.province_id);
        }

        if (filters.city_ids && filters.city_ids.length > 0) {
            paramCount++;
            query += ` AND c.id = ANY($${paramCount})`;
            queryParams.push(filters.city_ids);
        }

        if (filters.price_min !== undefined) {
            paramCount++;
            query += ` AND reo.price_per_month >= $${paramCount}`;
            queryParams.push(filters.price_min);
        }
        if (filters.price_max !== undefined) {
            paramCount++;
            query += ` AND reo.price_per_month <= $${paramCount}`;
            queryParams.push(filters.price_max);
        }

        if (filters.renting_period) {
            paramCount++;
            query += ` AND reo.renting_period = $${paramCount}`;
            queryParams.push(filters.renting_period);
        }

        if (filters.immediate_availability !== undefined) {
            paramCount++;
            query += ` AND reo.immediate_availability = $${paramCount}`;
            queryParams.push(filters.immediate_availability);
        }

        if (filters.living_area_min !== undefined) {
            paramCount++;
            query += ` AND reo.living_area >= $${paramCount}`;
            queryParams.push(filters.living_area_min);
        }
        if (filters.living_area_max !== undefined) {
            paramCount++;
            query += ` AND reo.living_area <= $${paramCount}`;
            queryParams.push(filters.living_area_max);
        }

        if (filters.room_count_min !== undefined) {
            paramCount++;
            query += ` AND reo.room_count >= $${paramCount}`;
            queryParams.push(filters.room_count_min);
        }
        if (filters.room_count_max !== undefined) {
            paramCount++;
            query += ` AND reo.room_count <= $${paramCount}`;
            queryParams.push(filters.room_count_max);
        }

        if (filters.property_type) {
            paramCount++;
            query += ` AND rt.name = $${paramCount}`;
            queryParams.push(filters.property_type);
        }

        if (filters.category_name) {
            paramCount++;
            query += ` AND rtc.name = $${paramCount}`;
            queryParams.push(filters.category_name);
        }

        if (filters.kitchen !== undefined) {
            paramCount++;
            query += ` AND reo.kitchen = $${paramCount}`;
            queryParams.push(filters.kitchen);
        }

        if (filters.cellar !== undefined) {
            paramCount++;
            query += ` AND reo.cellar = $${paramCount}`;
            queryParams.push(filters.cellar);
        }

        if (filters.postal_code) {
            paramCount++;
            query += ` AND c.plz = $${paramCount}`;
            queryParams.push(filters.postal_code);
        }

        // Filters for merged additional properties.
        if (filters.balcony !== undefined) {
            paramCount++;
            query += ` AND reo.balcony = $${paramCount}`;
            queryParams.push(filters.balcony);
        }
        if (filters.balcony_size_min !== undefined) {
            paramCount++;
            query += ` AND reo.balcony_size >= $${paramCount}`;
            queryParams.push(filters.balcony_size_min);
        }
        if (filters.balcony_size_max !== undefined) {
            paramCount++;
            query += ` AND reo.balcony_size <= $${paramCount}`;
            queryParams.push(filters.balcony_size_max);
        }
        if (filters.garden !== undefined) {
            paramCount++;
            query += ` AND reo.garden = $${paramCount}`;
            queryParams.push(filters.garden);
        }
        if (filters.parking !== undefined) {
            paramCount++;
            query += ` AND reo.parking = $${paramCount}`;
            queryParams.push(filters.parking);
        }
        if (filters.storage_room !== undefined) {
            paramCount++;
            query += ` AND reo.storage_room = $${paramCount}`;
            queryParams.push(filters.storage_room);
        }
        if (filters.land_plot_size_min !== undefined) {
            paramCount++;
            query += ` AND reo.land_plot_size >= $${paramCount}`;
            queryParams.push(filters.land_plot_size_min);
        }
        if (filters.land_plot_size_max !== undefined) {
            paramCount++;
            query += ` AND reo.land_plot_size <= $${paramCount}`;
            queryParams.push(filters.land_plot_size_max);
        }
        if (filters.num_floors !== undefined) {
            paramCount++;
            query += ` AND reo.num_floors = $${paramCount}`;
            queryParams.push(filters.num_floors);
        }

        query += ` ORDER BY reo.price_per_month ASC`;

        const result = await pool.query(query, queryParams);
        return result.rows;
    }

    async getTypes(topLevelCategoryId?: number): Promise<any[]> {
        let query = `
            SELECT
                rt.id,
                rt.name,
                rtc.id as category_id,
                rtc.name as category_name
            FROM real_estate_types rt
                     JOIN real_estate_top_level_categories rtc ON rtc.id = rt.top_level_category_id
        `;
        const queryParams: any[] = [];
        if (topLevelCategoryId) {
            query += ` WHERE rt.top_level_category_id = $1`;
            queryParams.push(topLevelCategoryId);
        }
        query += ` ORDER BY rtc.name, rt.name`;
        const result = await pool.query(query, queryParams);
        return result.rows;
    }

    async createRealEstateObject(data: any, userId: string): Promise<void> {
        try {
            await pool.query('BEGIN');

            const listingQuery = `
                INSERT INTO listings (seller_id, type, title, description, price)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING id;
            `;
            const listingResult = await pool.query(listingQuery, [
                userId,
                'property',
                data.name,
                data.description,
                data.price_per_month
            ]);
            const listingId = listingResult.rows[0].id;

            const realEstateQuery = `
                INSERT INTO real_estate_objects (
                    listing_id, name, type_id, description, city_id, address,
                    price_per_month, renting_period, advance_payment, immediate_availability,
                    owner_id, living_area, room_count, availability, term_type, kitchen, cellar,
                    balcony, balcony_size, garden, parking, storage_room, land_plot_size, num_floors
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17,
                        $18, $19, $20, $21, $22, $23, $24)
                RETURNING id;
            `;
            await pool.query(realEstateQuery, [
                listingId,
                data.name,
                data.type_id,
                data.description,
                data.city_id,
                data.address,
                data.price_per_month,
                data.renting_period,
                data.advance_payment,
                data.immediate_availability,
                userId,
                data.living_area,
                data.room_count,
                data.availability,
                data.term_type,
                data.kitchen,
                data.cellar,
                data.balcony,
                data.balcony_size,
                data.garden,
                data.parking,
                data.storage_room,
                data.land_plot_size,
                data.num_floors
            ]);
            await pool.query('COMMIT');
        } catch (error) {
            await pool.query('ROLLBACK');
            console.error('Error during real estate object creation:', error);
            throw error;
        }
    }

    async updateRealEstateObject(data: any, listingId: number, userId: string): Promise<void> {
        try {
            await pool.query('BEGIN');

            const listingQuery = `
                UPDATE listings
                SET title = $1, description = $2, price = $3
                WHERE id = $4 AND seller_id = $5;
            `;
            await pool.query(listingQuery, [
                data.name,
                data.description,
                data.price_per_month,
                listingId,
                userId
            ]);

            const realEstateQuery = `
                UPDATE real_estate_objects
                SET
                    name = $1,
                    type_id = $2,
                    description = $3,
                    city_id = $4,
                    address = $5,
                    price_per_month = $6,
                    renting_period = $7,
                    advance_payment = $8,
                    immediate_availability = $9,
                    living_area = $10,
                    room_count = $11,
                    availability = $12,
                    term_type = $13,
                    kitchen = $14,
                    cellar = $15,
                    balcony = $16,
                    balcony_size = $17,
                    garden = $18,
                    parking = $19,
                    storage_room = $20,
                    land_plot_size = $21,
                    num_floors = $22
                WHERE listing_id = $23;
            `;
            await pool.query(realEstateQuery, [
                data.name,
                data.type_id,
                data.description,
                data.city_id,
                data.address,
                data.price_per_month,
                data.renting_period,
                data.advance_payment,
                data.immediate_availability,
                data.living_area,
                data.room_count,
                data.availability,
                data.term_type,
                data.kitchen,
                data.cellar,
                data.balcony,
                data.balcony_size,
                data.garden,
                data.parking,
                data.storage_room,
                data.land_plot_size,
                data.num_floors,
                listingId
            ]);

            await pool.query('COMMIT');
        } catch (error) {
            await pool.query('ROLLBACK');
            console.error('Error during real estate object update:', error);
            throw error;
        }
    }

    async getCities(provinceId?: number): Promise<any[]> {
        let query = `
            SELECT
                c.id,
                c.name,
                c.plz as postal_code,
                rp.id as province_id,
                rp.name as province_name
            FROM cities c
                     JOIN real_estate_provinces rp ON rp.id = c.province_id
        `;
        const queryParams: any[] = [];
        if (provinceId) {
            query += ` WHERE c.province_id = $1`;
            queryParams.push(provinceId);
        }
        query += ` ORDER BY rp.name, c.name`;
        const result = await pool.query(query, queryParams);
        return result.rows;
    }

    async getProvinces(): Promise<any[]> {
        const query = `
            SELECT
                id,
                name,
                plz_range
            FROM real_estate_provinces
            ORDER BY name
        `;
        const result = await pool.query(query);
        return result.rows;
    }
}

export default new RealEstateRepository();
import pool from "../config/postgres.config";

class RealEstateRepository {
    async getRealEstateObjects(filters: any): Promise<number[]> {
        let query = `
            SELECT DISTINCT
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
                c.name as city_name,
                c.plz as postal_code,
                rt.name as property_type,
                rtc.name as category_name
            FROM real_estate_objects reo
                     JOIN cities c ON c.id = reo.city_id
                     JOIN real_estate_types rt ON rt.id = reo.type_id
                     JOIN real_estate_top_level_categories rtc ON rtc.id = rt.top_level_category_id
                     LEFT JOIN real_estate_object_properties reop ON reop.real_estate_object_id = reo.id
            WHERE reo.status = 'open'
        `;

        const queryParams: any[] = [];
        let paramCount = 0;

        if (filters.top_level_category_id) {
            paramCount++;
            query += ` AND rtc.id = $${paramCount}`;
            queryParams.push(filters.top_level_category_id);
        }

        if (filters.type_ids && filters.type_ids.length > 0) {
            paramCount++;
            query += ` AND rt.id = ANY($${paramCount})`;
            queryParams.push(filters.type_ids);
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

        if (filters.immediate_availability !== undefined) {
            paramCount++;
            query += ` AND reo.immediate_availability = $${paramCount}`;
            queryParams.push(filters.immediate_availability);
        }

        if (filters.availability_start) {
            paramCount++;
            query += ` AND reo.availability >= $${paramCount}`;
            queryParams.push(filters.availability_start);
        }

        if (filters.has_kitchen !== undefined) {
            paramCount++;
            query += ` AND reo.kitchen = $${paramCount}`;
            queryParams.push(filters.has_kitchen);
        }

        if (filters.has_cellar !== undefined) {
            paramCount++;
            query += ` AND reo.cellar = $${paramCount}`;
            queryParams.push(filters.has_cellar);
        }

        // Handle additional properties
        if (filters.additional_properties && filters.additional_properties.length > 0) {
            filters.additional_properties.forEach((prop: { id: any; value: any; }, index: any) => {
                paramCount += 2;
                query += ` AND EXISTS (
          SELECT 1 FROM real_estate_object_properties
          WHERE real_estate_object_id = reo.id
          AND additional_property_id = $${paramCount - 1}
          AND value = $${paramCount}
        )`;
                queryParams.push(prop.id, prop.value);
            });
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
                    owner_id, living_area, room_count, availability, term_type, kitchen, cellar
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
                RETURNING id;
            `;

            const realEstateResult = await pool.query(realEstateQuery, [
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
                data.cellar
            ]);

            // Insert additional properties if any
            if (data.additional_properties && data.additional_properties.length > 0) {
                const propertyQuery = `
                    INSERT INTO real_estate_object_properties (
                        real_estate_object_id, additional_property_id, value
                    )
                    VALUES ($1, $2, $3);
                `;

                for (const prop of data.additional_properties) {
                    await pool.query(propertyQuery, [
                        realEstateResult.rows[0].id,
                        prop.property_id,
                        prop.value
                    ]);
                }
            }

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
                    cellar = $15
                WHERE listing_id = $16;
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
                listingId
            ]);

            // Update additional properties
            if (data.additional_properties && data.additional_properties.length > 0) {
                // First, remove existing properties
                await pool.query(
                    'DELETE FROM real_estate_object_properties WHERE real_estate_object_id = $1',
                    [listingId]
                );

                // Then insert new ones
                const propertyQuery = `
                    INSERT INTO real_estate_object_properties (
                        real_estate_object_id, additional_property_id, value
                    )
                    VALUES ($1, $2, $3);
                `;

                for (const prop of data.additional_properties) {
                    await pool.query(propertyQuery, [
                        listingId,
                        prop.property_id,
                        prop.value
                    ]);
                }
            }

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
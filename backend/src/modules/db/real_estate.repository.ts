import pool from "../config/postgres.config";
import {RealEstateListing} from "../../interfaces/real-estate/real-estate-object.interface";


class RealEstateRepository {
    async getRealEstateObjects(filters: any): Promise<RealEstateListing[]> {
        // Define filter types
        type FilterFunction = (value: any) => { condition: string; value: any };
        type FilterMapping = {
            [key: string]: FilterFunction;
        };

        // Build base query with all joins
        const baseQuery = `
            SELECT
                reo.id,
                reo.listing_id,
                reo.name,
                reo.description,
                rtc.name as top_level_category,
                rt.name as type,
                reo.price_per_month,
                reo.renting_period,
                reo.advance_payment,
                reo.immediate_availability,
                reo.owner_id,
                reo.status,
                reo.living_area,
                reo.room_count,
                reo.availability,
                reo.term_type,
                reo.kitchen,
                reo.cellar,
                reo.balcony,
                reo.balcony_size,
                reo.garden,
                reo.parking,
                reo.storage_room,
                reo.land_plot_size,
                reo.num_floors,
                reo.address as street_address,
                c.name as city,
                c.plz as postal_code,
                p.name as province
            FROM real_estate_objects reo
                     JOIN listings ON reo.listing_id = listings.id
                     JOIN cities c ON c.id = reo.city_id
                     JOIN real_estate_provinces p ON p.id = c.province_id
                     JOIN real_estate_types rt ON rt.id = reo.type_id
                     JOIN real_estate_top_level_categories rtc ON rtc.id = rt.top_level_category_id
            WHERE reo.status = 'open'
        `;

        // Define filter mappings with explicit typing
        const filterConditions: FilterMapping = {
            topLevelCategory: (value: string) => ({ condition: 'rtc.name = $', value }),
            type_ids: (value: number[]) => ({ condition: 'rt.id = ANY($)', value }),
            province_id: (value: number) => ({ condition: 'c.province_id = $', value }),
            city_ids: (value: number[]) => ({ condition: 'c.id = ANY($)', value }),
            price_min: (value: string) => ({ condition: 'reo.price_per_month >= $', value: parseFloat(value) }),
            price_max: (value: string) => ({ condition: 'reo.price_per_month <= $', value: parseFloat(value) }),
            renting_period: (value: string) => ({ condition: 'reo.renting_period = $', value }),
            immediate_availability: (value: boolean) => ({ condition: 'reo.immediate_availability = $', value }),
            living_area_min: (value: number) => ({ condition: 'reo.living_area >= $', value }),
            living_area_max: (value: number) => ({ condition: 'reo.living_area <= $', value }),
            room_count_min: (value: number) => ({ condition: 'reo.room_count >= $', value }),
            room_count_max: (value: number) => ({ condition: 'reo.room_count <= $', value }),
            property_type: (value: string) => ({ condition: 'rt.name = $', value }),
            category_name: (value: string) => ({ condition: 'rtc.name = $', value }),
            kitchen: (value: boolean) => ({ condition: 'reo.kitchen = $', value }),
            cellar: (value: boolean) => ({ condition: 'reo.cellar = $', value }),
            postal_code: (value: string) => ({ condition: 'c.plz = $', value }),
            balcony: (value: boolean) => ({ condition: 'reo.balcony = $', value }),
            balcony_size_min: (value: number) => ({ condition: 'reo.balcony_size >= $', value }),
            balcony_size_max: (value: number) => ({ condition: 'reo.balcony_size <= $', value }),
            garden: (value: boolean) => ({ condition: 'reo.garden = $', value }),
            parking: (value: boolean) => ({ condition: 'reo.parking = $', value }),
            storage_room: (value: boolean) => ({ condition: 'reo.storage_room = $', value }),
            land_plot_size_min: (value: number) => ({ condition: 'reo.land_plot_size >= $', value }),
            land_plot_size_max: (value: number) => ({ condition: 'reo.land_plot_size <= $', value }),
            num_floors: (value: number) => ({ condition: 'reo.num_floors = $', value })
        };

        // Build WHERE clause and params
        const conditions: string[] = [];
        const queryParams: any[] = [];

        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && key in filterConditions) {
                const filterFn = filterConditions[key];
                const { condition, value: processedValue } = filterFn(value);
                conditions.push(condition + (queryParams.length + 1));
                queryParams.push(processedValue);
            }
        });

        // Construct final query
        const query = `
        ${baseQuery}
        ${conditions.length ? 'AND ' + conditions.join(' AND ') : ''}
        ORDER BY reo.price_per_month ASC
    `;

        const result = await pool.query(query, queryParams);

        // Transform results
        return result.rows.map(row => ({
            id: row.id,
            listing_id: row.listing_id,
            name: row.name,
            description: row.description,
            topLevelCategory: row.top_level_category,
            type: row.type,
            address: {
                province: row.province,
                city: row.city,
                postalCode: row.postal_code,
                streetAddress: row.street_address
            },
            price_per_month: row.price_per_month,
            renting_period: row.renting_period,
            advance_payment: row.advance_payment,
            immediate_availability: row.immediate_availability,
            owner_id: row.owner_id,
            status: row.status,
            living_area: row.living_area,
            room_count: row.room_count,
            availability: row.availability,
            term_type: row.term_type,
            kitchen: row.kitchen,
            cellar: row.cellar,
            balcony: row.balcony,
            balcony_size: row.balcony_size,
            garden: row.garden,
            parking: row.parking,
            storage_room: row.storage_room,
            land_plot_size: row.land_plot_size,
            num_floors: row.num_floors
        }));
    }

    async getTypes(topLevelCategoryId?: number): Promise<any[]> {
        let query = `
            SELECT rt.id,
                   rt.name,
                   rtc.id   as category_id,
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

    async createRealEstateObject(data: RealEstateListing, userId: string): Promise<void> {
        try {
            await pool.query('BEGIN');

            // First, get city_id based on the city name
            const cityId = await this.getCityId(data.address.city);


            let type_id = 0
            const normalizedType = data.topLevelCategory.toLowerCase();
            if (normalizedType === "house") {
                type_id = 1;
            } else if (normalizedType === "apartment") {
                type_id = 2;
            }

            const listingQuery = `
                INSERT INTO listings (seller_id, type, title, description, price)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING id;
            `;
            const listingResult = await pool.query(listingQuery, [
                userId,
                'property',
                data.name,
                data.description || '',
                data.price_per_month
            ]);
            const listingId = listingResult.rows[0].id;

            // Construct full address string from the Address interface
            const fullAddress = `${data.address.streetAddress}, ${data.address.postalCode}`;

            const realEstateQuery = `
                INSERT INTO real_estate_objects (listing_id, name, type_id, description, city_id, address,
                                                 price_per_month, renting_period, advance_payment,
                                                 immediate_availability,
                                                 owner_id, status, living_area, room_count, availability, term_type,
                                                 kitchen, cellar, balcony, balcony_size, garden, parking,
                                                 storage_room, land_plot_size, num_floors)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14,
                        $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25)
                RETURNING id;
            `;

            await pool.query(realEstateQuery, [
                listingId,
                data.name,
                type_id,
                data.description || '',
                cityId,
                fullAddress,
                data.price_per_month,
                data.renting_period,
                data.advance_payment || null,
                data.immediate_availability,
                userId,
                data.status || 'open',
                data.living_area || null,
                data.room_count || null,
                null,
                'standard',
                data.kitchen || false,
                data.cellar || false,
                data.balcony || false,
                data.balcony_size || null,
                data.garden || false,
                data.parking || false,
                data.storage_room || false,
                data.land_plot_size || null,
                data.num_floors || null
            ]);

            await pool.query('COMMIT');
        } catch (error) {
            await pool.query('ROLLBACK');
            console.error('Error during real estate object creation:', error);
            throw error;
        }
    }


// Helper function to get city ID
    private async getCityId(cityName: string): Promise<number> {
        const query = `
            SELECT id
            FROM cities
            WHERE name = $1`;
        const result = await pool.query(query, [cityName]);

        if (result.rows.length === 0) {
            throw new Error(`City not found: ${cityName}`);
        }

        return result.rows[0].id;
    }

    async updateRealEstateObject(data: any, listingId: number, userId: string): Promise<void> {
        try {
            await pool.query('BEGIN');

            const listingQuery = `
                UPDATE listings
                SET title       = $1,
                    description = $2,
                    price       = $3
                WHERE id = $4
                  AND seller_id = $5;
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
                SET name                   = $1,
                    type_id                = $2,
                    description            = $3,
                    city_id                = $4,
                    address                = $5,
                    price_per_month        = $6,
                    renting_period         = $7,
                    advance_payment        = $8,
                    immediate_availability = $9,
                    living_area            = $10,
                    room_count             = $11,
                    availability           = $12,
                    term_type              = $13,
                    kitchen                = $14,
                    cellar                 = $15,
                    balcony                = $16,
                    balcony_size           = $17,
                    garden                 = $18,
                    parking                = $19,
                    storage_room           = $20,
                    land_plot_size         = $21,
                    num_floors             = $22
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
            SELECT c.id,
                   c.name,
                   c.plz   as postal_code,
                   rp.id   as province_id,
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
            SELECT id,
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